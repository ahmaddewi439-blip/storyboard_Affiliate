import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function cleanBaseUrl(url: string) {
  return url.replace(/\/$/, '');
}

async function fileToDataUrl(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = file.type || 'image/png';
  return `data:${mimeType};base64,${base64}`;
}

function extractJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('AI tidak mengembalikan JSON yang valid.');
    return JSON.parse(match[0]);
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL;
    const textModel = process.env.AI_TEXT_MODEL || 'gemini-2.5-flash';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI_API_KEY belum diisi di Vercel Environment Variables.' },
        { status: 500 }
      );
    }

    if (!baseUrl) {
      return NextResponse.json(
        { error: 'AI_BASE_URL belum diisi di Vercel Environment Variables.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const productImage = formData.get('productImage') as File | null;
    const modelImage = formData.get('modelImage') as File | null;
    const productName = String(formData.get('productName') || 'Produk affiliate');
    const duration = String(formData.get('duration') || '30 detik');
    const language = String(formData.get('language') || 'Indonesia');
    const styleId = String(formData.get('styleId') || 'product-demo-proof');

    if (!productImage) {
      return NextResponse.json(
        { error: 'Upload gambar produk wajib.' },
        { status: 400 }
      );
    }

    const productImageDataUrl = await fileToDataUrl(productImage);
    const modelImageDataUrl = modelImage ? await fileToDataUrl(modelImage) : '';

    const systemPrompt = `
You are a senior TikTok Shop affiliate creative strategist.
Your job is to create a high-conversion affiliate storyboard and prompt package.

IMPORTANT RULES:
- Output MUST be valid JSON only.
- Do not use markdown.
- Do not explain outside JSON.
- Product details must be locked from the reference image.
- Never change the product color, texture, shape, logo, label, zipper, strap, button, port, packaging, material, or important product identity.
- Create prompts that can be used in Gemini and Grok.ai.
- Use the requested language: ${language}.
`;

    const userPrompt = `
Create a complete TikTok affiliate storyboard and prompt package.

PRODUCT NAME:
${productName}

VIDEO DURATION:
${duration}

SELECTED AFFILIATE STYLE ID:
${styleId}

TASK:
Analyze the uploaded product image carefully.
If a model/reference image exists, use it only for pose, scene, lifestyle, outfit, hand position, or usage context.
The product must always follow the product image, not the model/reference image.

Create JSON with this exact structure:

{
  "product_summary": "short product summary",
  "detected_category": "category name",
  "selected_tier": {
    "stars": 5,
    "name": "tier name",
    "reason": "why this tier/style is suitable"
  },
  "selected_style": {
    "id": "${styleId}",
    "name": "style name",
    "subtitle": "premium subtitle",
    "note": "why this style helps conversion",
    "minus": "possible weakness of this style"
  },
  "product_lock": {
    "must_keep": [
      "exact color",
      "exact material or texture",
      "exact product shape",
      "important visible parts",
      "logo/label/packaging if visible",
      "size/proportion if visible"
    ],
    "forbidden": [
      "do not change product color",
      "do not change material/texture",
      "do not change product shape",
      "do not remove logo/label/important parts",
      "do not invent new design"
    ],
    "visual_identity": [
      "main visible product identity details"
    ],
    "reference_usage_rule": "Use product image as the main identity lock. Use model/reference image only for pose, environment, or usage style."
  },
  "storyboard": [
    {
      "panel": 1,
      "time": "0-3 sec",
      "goal": "hook goal",
      "visual": "visual direction",
      "overlay_text": "short overlay text",
      "voice_over": "voice over line",
      "camera_motion": "camera motion",
      "production_note": "editing note"
    }
  ],
  "prompt_package": {
    "gemini_flow": {
      "image_prompt": "strict prompt for Gemini image generation/storyboard",
      "video_prompt": "strict prompt for Gemini video generation",
      "negative_prompt": "strict negative prompt"
    },
    "grok_flow": {
      "image_prompt": "strict prompt for Grok image generation/storyboard",
      "video_prompt": "strict prompt for Grok video generation",
      "negative_prompt": "strict negative prompt"
    },
    "copywriting": {
      "description": "product description",
      "caption": "TikTok caption",
      "hashtags": ["#hashtag1", "#hashtag2"],
      "overlay_texts": ["overlay 1", "overlay 2"],
      "voice_over_script": "full voice over script",
      "cta": "CTA text"
    },
    "editor_notes": {
      "shot_list": ["shot 1", "shot 2"],
      "motion_notes": ["motion 1", "motion 2"],
      "do_not_change": ["locked detail 1", "locked detail 2"]
    }
  },
  "estimated_cost_idr": "Rp estimate"
}

Make the output strong for affiliate selling.
Make the prompt strict enough so product identity stays 100% consistent with the product image.
`;

    const content: any[] = [
      { type: 'text', text: userPrompt },
      {
        type: 'image_url',
        image_url: {
          url: productImageDataUrl
        }
      }
    ];

    if (modelImageDataUrl) {
      content.push({
        type: 'image_url',
        image_url: {
          url: modelImageDataUrl
        }
      });
    }

    const response = await fetch(`${cleanBaseUrl(baseUrl)}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: textModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content
          }
        ],
        temperature: 0.7,
        response_format: {
          type: 'json_object'
        }
      })
    });

    const json = await response.json();

    if (!response.ok) {
      const message =
        json?.error?.message ||
        json?.message ||
        JSON.stringify(json);

      return NextResponse.json(
        { error: `LiteLLM error: ${message}` },
        { status: response.status }
      );
    }

    const text =
      json?.choices?.[0]?.message?.content ||
      json?.choices?.[0]?.text ||
      '';

    if (!text) {
      return NextResponse.json(
        { error: 'LiteLLM tidak mengembalikan response text.' },
        { status: 500 }
      );
    }

    const storyboard = extractJson(text);

    return NextResponse.json({
      storyboard,
      storyboardImage: '',
      note: 'Mode LiteLLM text aktif. Storyboard visual image belum dibuat karena model image LiteLLM belum dikonfirmasi.'
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Terjadi error saat generate storyboard.'
      },
      { status: 500 }
    );
  }
}
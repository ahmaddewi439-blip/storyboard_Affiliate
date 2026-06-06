import { NextResponse } from 'next/server';
import {
  callGemini,
  extractFirstImageDataUri,
  extractText,
  fileToBase64,
  getImageModel,
  getTextModel,
  safeJsonParse
} from '@/lib/gemini';
import { buildStoryboardImagePrompt, buildStoryboardTextPrompt } from '@/lib/prompts';
import { getStyleById } from '@/lib/styles';

export const runtime = 'nodejs';
export const maxDuration = 60;

type StoryboardResult = {
  product_summary?: string;
  detected_category?: string;
  selected_tier?: {
    stars?: number;
    name?: string;
    reason?: string;
  };
  selected_style?: {
    id?: string;
    name?: string;
    subtitle?: string;
    note?: string;
    minus?: string;
  };
  product_lock?: {
    must_keep?: string[];
    forbidden?: string[];
    visual_identity?: string[];
    reference_usage_rule?: string;
  };
  storyboard?: unknown[];
  prompt_package?: unknown;
  storyboard_sheet_prompt?: string;
  estimated_cost_idr?: string;
  raw?: string;
};

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const productImage = form.get('productImage');
    const modelImage = form.get('modelImage');
    const productName = String(form.get('productName') || '').trim();
    const duration = String(form.get('duration') || '10 detik').trim();
    const language = String(form.get('language') || 'Indonesia').trim();
    const styleId = String(form.get('styleId') || 'product-demo-proof').trim();
    const style = getStyleById(styleId);

    if (!(productImage instanceof File)) {
      return NextResponse.json({ error: 'Upload gambar produk wajib diisi.' }, { status: 400 });
    }

    const productBase64 = await fileToBase64(productImage);
    const textParts = [
      { text: buildStoryboardTextPrompt(productName, duration, language, style) },
      {
        inline_data: {
          mime_type: productImage.type || 'image/png',
          data: productBase64
        }
      }
    ];

    if (modelImage instanceof File && modelImage.size > 0) {
      textParts.push({
        inline_data: {
          mime_type: modelImage.type || 'image/png',
          data: await fileToBase64(modelImage)
        }
      });
    }

    const textResponse = await callGemini(getTextModel(), textParts);
    const text = extractText(textResponse);

    const storyboardJson = safeJsonParse<StoryboardResult>(text, {
      product_summary: productName || 'Produk affiliate',
      detected_category: 'Belum terdeteksi',
      selected_tier: {
        stars: 5,
        name: 'Tier 5 — Most Recommended',
        reason: 'Dipilih untuk meningkatkan potensi conversion.'
      },
      selected_style: {
        id: style.id,
        name: style.name,
        subtitle: style.subtitle,
        note: style.note,
        minus: style.minus
      },
      product_lock: {
        must_keep: ['Pertahankan semua detail produk seperti gambar referensi.'],
        forbidden: ['Jangan ubah warna, bentuk, tekstur, ukuran, tali, zipper, logo, label, motif, atau proporsi produk.'],
        visual_identity: ['Produk harus sama seperti gambar referensi.'],
        reference_usage_rule: 'Gunakan gambar produk sebagai identitas visual utama, bukan menggambar ulang produk.'
      },
      storyboard: [],
      prompt_package: {},
      storyboard_sheet_prompt: '',
      estimated_cost_idr: 'Rp800-Rp1000 per generate',
      raw: text
    });

    const imagePrompt = buildStoryboardImagePrompt(storyboardJson, productName, style);
    const imageParts = [
      { text: imagePrompt },
      {
        inline_data: {
          mime_type: productImage.type || 'image/png',
          data: productBase64
        }
      }
    ];

    if (modelImage instanceof File && modelImage.size > 0) {
      imageParts.push({
        inline_data: {
          mime_type: modelImage.type || 'image/png',
          data: await fileToBase64(modelImage)
        }
      });
    }

    const imageResponse = await callGemini(getImageModel(), imageParts);
    const storyboardImage = extractFirstImageDataUri(imageResponse);

    return NextResponse.json({
      ok: true,
      storyboard: storyboardJson,
      storyboardImage,
      imagePrompt,
      selectedStyle: style,
      models: {
        text: getTextModel(),
        image: getImageModel()
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi error saat generate storyboard.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

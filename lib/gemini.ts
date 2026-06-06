export type GeminiPart =
  | { text: string }
  | { inline_data: { mime_type: string; data: string } };

type GeminiGenerateResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
        inlineData?: { mimeType?: string; data?: string };
        inline_data?: { mime_type?: string; data?: string };
      }>;
    };
  }>;
  error?: { message?: string };
};

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

export function getGeminiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY belum diisi di environment variable.');
  }
  return key;
}

export function getTextModel() {
  return process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash';
}

export function getImageModel() {
  return process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
}

export async function fileToBase64(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
}

export async function callGemini(model: string, parts: GeminiPart[]) {
  const key = getGeminiKey();
  const url = `${API_BASE}/${model}:generateContent?key=${key}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts
        }
      ]
    })
  });

  const json = (await response.json()) as GeminiGenerateResponse;

  if (!response.ok || json.error) {
    throw new Error(json.error?.message || `Gemini API error: ${response.status}`);
  }

  return json;
}

export function extractText(response: GeminiGenerateResponse) {
  const parts = response.candidates?.[0]?.content?.parts || [];
  return parts.map((part) => part.text || '').join('\n').trim();
}

export function extractFirstImageDataUri(response: GeminiGenerateResponse) {
  const parts = response.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    const camelInline = part.inlineData;
    const snakeInline = part.inline_data;

    const data = camelInline?.data || snakeInline?.data;
    const mimeType = camelInline?.mimeType || snakeInline?.mime_type || 'image/png';

    if (data) return `data:${mimeType};base64,${data}`;
  }

  return null;
}

export function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1)) as T;
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}

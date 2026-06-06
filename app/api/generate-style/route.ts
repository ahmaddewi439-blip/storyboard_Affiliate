import { NextResponse } from 'next/server';
import { callGemini, extractText, getTextModel, safeJsonParse } from '@/lib/gemini';
import { buildStylePrompt } from '@/lib/prompts';
import { getStyleById } from '@/lib/styles';

export const runtime = 'nodejs';
export const maxDuration = 45;

type StyleResult = {
  style_name?: string;
  prompt_gambar?: string;
  prompt_video?: string;
  negative_prompt?: string;
  deskripsi_produk?: string;
  caption_tiktok?: string;
  hashtag?: string[];
  overlay_text?: string[];
  voice_over?: string;
  cta?: string;
  raw?: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const styleId = String(body.styleId || 'clean-studio');
    const productName = String(body.productName || '').trim();
    const language = String(body.language || 'Indonesia').trim();
    const productLock = body.productLock || {
      must_keep: ['Pertahankan semua detail produk seperti referensi.'],
      forbidden: ['Jangan ubah tekstur, warna, bentuk, bahan, logo, zipper, tali, ukuran, motif.']
    };

    const style = getStyleById(styleId);
    const prompt = buildStylePrompt(style, productLock, productName, language);
    const response = await callGemini(getTextModel(), [{ text: prompt }]);
    const text = extractText(response);

    const result = safeJsonParse<StyleResult>(text, {
      style_name: style.name,
      prompt_gambar: '',
      prompt_video: '',
      negative_prompt: '',
      deskripsi_produk: '',
      caption_tiktok: '',
      hashtag: [],
      overlay_text: [],
      voice_over: '',
      cta: '',
      raw: text
    });

    return NextResponse.json({ ok: true, result, model: getTextModel() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi error saat generate prompt style.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

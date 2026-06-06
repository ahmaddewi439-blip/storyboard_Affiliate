import { AffiliateStyle, getTierById, renderStars } from './styles';

export function buildStoryboardTextPrompt(productName: string, duration: string, language: string, style: AffiliateStyle) {
  const tier = getTierById(style.tier);

  return `
Kamu adalah senior creative strategist TikTok Shop Affiliate, prompt engineer Gemini, dan prompt engineer Grok.ai.
Tugasmu: analisis gambar produk + gambar model/referensi jika ada, lalu buat storyboard dan paket prompt lengkap untuk AI image/video.

INPUT:
- Nama produk: ${productName || 'produk affiliate'}
- Durasi video: ${duration || '10 detik'}
- Bahasa output: ${language || 'Indonesia'}
- Visual style dipilih: ${style.name}
- Tier: ${renderStars(tier.stars)} ${tier.title}
- Style subtitle: ${style.subtitle}
- Style description: ${style.description}
- Cocok untuk: ${style.suitableFor}
- Fokus konten: ${style.contentFocus}
- Note: ${style.note}
- Why it sells: ${style.whySells}
- Minus: ${style.minus}

ATURAN PRODUCT LOCK PALING PENTING:
1. Produk pada prompt gambar/video HARUS menggunakan gambar referensi produk sebagai identitas visual utama.
2. Produk TIDAK BOLEH berubah warna, bentuk, bahan, tekstur, ukuran, proporsi, motif, logo, label, zipper, tali, tombol, port, tutup, kemasan, karakter, atau detail visual lain yang terlihat.
3. Jika ada model/referensi, gunakan hanya sebagai referensi pose, framing, lifestyle, tangan, outfit, atau scene. Jangan mengganti detail produk.
4. Prompt harus universal untuk semua kategori produk, bukan hanya fashion.
5. AI harus mengidentifikasi kategori produk dari gambar dan menyesuaikan adegan dengan kategori itu.
6. Output harus JSON valid saja. Jangan pakai markdown. Jangan tulis penjelasan di luar JSON.

Buat JSON dengan struktur persis seperti ini:
{
  "product_summary": "ringkasan produk singkat berdasarkan visual referensi",
  "detected_category": "kategori produk yang paling mungkin",
  "selected_tier": {
    "stars": ${tier.stars},
    "name": "${tier.title}",
    "reason": "kenapa tier ini dipilih untuk conversion"
  },
  "selected_style": {
    "id": "${style.id}",
    "name": "${style.name}",
    "subtitle": "${style.subtitle}",
    "note": "${style.note}",
    "minus": "${style.minus}"
  },
  "product_lock": {
    "must_keep": ["detail wajib dipertahankan dari produk"],
    "forbidden": ["hal yang dilarang diubah"],
    "visual_identity": ["ciri visual utama produk"],
    "reference_usage_rule": "aturan memakai gambar referensi agar produk 100% sama"
  },
  "storyboard": [
    {
      "panel": 1,
      "time": "0-2 detik",
      "goal": "tujuan scene",
      "visual": "deskripsi visual panel sesuai style yang dipilih",
      "overlay_text": "teks overlay pendek",
      "voice_over": "voice over pendek",
      "camera_motion": "gerakan kamera",
      "production_note": "catatan produksi"
    }
  ],
  "prompt_package": {
    "gemini_flow": {
      "image_prompt": "prompt gambar untuk Gemini image generation/editing, sangat detail, product locked, 9:16",
      "video_prompt": "prompt video untuk Gemini/Veo flow, product locked, detail scene, camera movement, timing, 9:16",
      "negative_prompt": "larangan detail agar produk tidak berubah"
    },
    "grok_flow": {
      "image_prompt": "prompt gambar untuk Grok.ai image flow, bahasa prompt yang tegas, product locked, 9:16",
      "video_prompt": "prompt video untuk Grok.ai video/scene flow, detail camera movement, timing, product locked, 9:16",
      "negative_prompt": "larangan detail agar produk tidak berubah"
    },
    "copywriting": {
      "description": "deskripsi produk affiliate yang natural dan menjual",
      "caption": "caption TikTok siap pakai",
      "hashtags": ["#hashtag"],
      "overlay_texts": ["teks overlay per scene"],
      "voice_over_script": "script VO lengkap sesuai durasi",
      "cta": "CTA keranjang kuning yang natural"
    },
    "editor_notes": {
      "shot_list": ["daftar shot yang harus diedit"],
      "motion_notes": ["zoom/pan/cut/transisi"],
      "do_not_change": ["detail yang tidak boleh berubah"]
    }
  },
  "storyboard_sheet_prompt": "prompt untuk menghasilkan 1 gambar storyboard sheet premium berisi 6 panel, tier style, product lock, prompt note, dan visual yang konsisten dengan referensi produk",
  "estimated_cost_idr": "Rp800-Rp1000 per generate, tergantung panjang prompt dan ukuran referensi"
}

Catatan kualitas:
- Jika produk adalah alat dapur, tekankan demo fungsi dan hasil makanan/minuman.
- Jika produk cleaning, tekankan before-after dan debu/noda/kotoran.
- Jika produk beauty/skincare, tekankan tekstur, cara pakai, packaging, dan hasil natural tanpa klaim medis berlebihan.
- Jika produk gadget/elektronik, tekankan fitur, port/tombol/lampu/layar, demo fungsi, dan keamanan penggunaan.
- Jika produk home decor/organizer, tekankan transformasi area, rapi, dan before-after setup.
- Jika produk baby/kids/pet, tekankan penggunaan aman secara umum tanpa klaim berlebihan.
`;
}

export function buildStoryboardImagePrompt(storyboardJson: unknown, productName: string, style: AffiliateStyle) {
  return `
Create one premium vertical storyboard sheet for a TikTok Affiliate video.

Use the uploaded product image as the strict product reference. The product must remain visually identical to the reference. Do not change product color, shape, material, texture, size, proportion, label, logo, zipper, strap, button, port, packaging, pattern, print, or any visible product detail. If a model/reference image is uploaded, use it only for pose, lifestyle direction, framing, or scene inspiration while keeping the product exactly the same.

Product name: ${productName || 'Affiliate Product'}
Selected affiliate style: ${style.name}
Style subtitle: ${style.subtitle}
Video ratio: 9:16 TikTok
Storyboard sheet format: portrait infographic, clean premium UI, 6 panels.

Required page layout:
- Top title: "Storyboard TikTok Affiliate"
- Subtitle: product name + selected style + duration
- Small tier badge and star rating
- 6 numbered storyboard panels
- Each panel contains timing, visual direction, overlay text, VO note, and camera motion
- Bottom section: "Product Lock" and "Catatan Produksi"
- Warm white/cream background, clean commercial layout, premium affiliate look
- Make the scene universal based on product category, not fashion-only

Storyboard data to follow:
${JSON.stringify(storyboardJson, null, 2)}

Do not create a new product design. The product must look like the uploaded reference.
`;
}

export function buildStylePrompt(style: AffiliateStyle, productLock: unknown, productName: string, language: string) {
  return `
Kamu adalah prompt engineer TikTok Affiliate.
Buat paket prompt text-only untuk gaya: ${style.name}.
Nama produk: ${productName || 'produk affiliate'}.
Bahasa: ${language || 'Indonesia'}.
Product lock: ${JSON.stringify(productLock, null, 2)}

Output JSON valid saja dengan struktur:
{
  "style_name": "${style.name}",
  "prompt_gambar": "prompt gambar product locked 9:16",
  "prompt_video": "prompt video product locked 9:16",
  "negative_prompt": "larangan perubahan produk",
  "deskripsi_produk": "deskripsi affiliate",
  "caption_tiktok": "caption",
  "hashtag": ["#hashtag"],
  "overlay_text": ["overlay"],
  "voice_over": "script VO",
  "cta": "CTA"
}
`;
}

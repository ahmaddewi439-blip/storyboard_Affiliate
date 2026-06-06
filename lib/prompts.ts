import { AffiliateStyle } from './styles';

export function buildStoryboardTextPrompt(productName: string, duration: string, language: string) {
  return `
Kamu adalah AI creative director untuk TikTok Affiliate.
Tugas: analisis gambar produk dan gambar model/referensi yang diupload, lalu buat storyboard 10 detik dan product lock yang sangat ketat.

Bahasa output: ${language || 'Indonesia'}.
Nama produk dari user: ${productName || 'produk affiliate'}.
Durasi video: ${duration || '10 detik'}.
Rasio: 9:16 TikTok.

ATURAN WAJIB:
1. Jangan mengarang detail produk yang tidak terlihat.
2. Identifikasi warna, bentuk, bahan/tekstur, zipper/kancing/tali/logo/ukuran jika terlihat.
3. Buat product_lock agar produk tidak berubah saat generate gambar/video.
4. Storyboard harus 6 panel seperti contoh: hook, full product, detail fitur, kapasitas/pemakaian, ukuran/bukti, final CTA.
5. Jangan menyuruh AI mengubah produk. Produk harus sama dengan referensi.
6. Output harus JSON valid saja tanpa markdown.

Buat JSON dengan struktur ini:
{
  "product_summary": "ringkasan produk singkat",
  "product_lock": {
    "must_keep": ["detail wajib dipertahankan"],
    "forbidden": ["hal yang dilarang diubah"],
    "visual_identity": ["ciri visual utama produk"]
  },
  "storyboard": [
    {
      "panel": 1,
      "time": "0-1 detik",
      "visual": "deskripsi visual panel",
      "overlay_text": "teks overlay pendek",
      "voice_over": "voice over pendek",
      "camera_motion": "zoom/pan/cut",
      "production_note": "catatan produksi"
    }
  ],
  "storyboard_sheet_prompt": "prompt gambar lengkap untuk menghasilkan 1 lembar storyboard visual 6 panel, lengkap dengan layout, teks overlay, VO, catatan produksi, dan product lock. Prompt ini harus menegaskan produk 100% sama seperti referensi.",
  "estimated_cost_idr": "Rp800-Rp1000 per generate, tergantung panjang prompt dan ukuran referensi"
}
`;
}

export function buildStoryboardImagePrompt(storyboardJson: unknown, productName: string) {
  return `
Create one complete vertical storyboard sheet for a TikTok Affiliate video.

Use the uploaded product image and model/reference image as the main visual references. Preserve the product faithfully: do not change product color, shape, material texture, strap, zipper, logo, print, proportion, or any visible detail. The product must look like the uploaded reference.

Product name: ${productName || 'Affiliate Product'}
Aspect ratio for the storyboard sheet: portrait.
Storyboard video ratio shown inside the sheet: 9:16 TikTok.

Make a polished infographic/storyboard page with:
- Title at top
- Subtitle: "Durasi 10 detik | Rasio video 9:16"
- 6 numbered panels arranged neatly
- Each panel contains: timing, small scene visual, Indonesian overlay text, and VO note
- Bottom section: "Catatan Produksi"
- Clean warm cream/white background
- Product must remain visually identical to uploaded product reference
- Product texture and all product details must stay consistent

Storyboard data to follow:
${JSON.stringify(storyboardJson, null, 2)}

Do not create a new product design. Use the product reference as the locked visual identity. If showing lifestyle/model usage, keep the product exactly the same as the reference.
`;
}

export function buildStylePrompt(style: AffiliateStyle, productLock: unknown, productName: string, language: string) {
  return `
Kamu adalah AI prompt engineer TikTok Affiliate.
Tugas: buat output prompt yang kuat dan ketat untuk gaya video affiliate yang dipilih.

Nama produk: ${productName || 'produk affiliate'}.
Gaya yang dipilih: ${style.name}.
Deskripsi gaya: ${style.description}.
Bahasa output: ${language || 'Indonesia'}.

PRODUCT LOCK dari hasil analisis sebelumnya:
${JSON.stringify(productLock, null, 2)}

ATURAN WAJIB:
1. Prompt gambar dan prompt video harus mempertahankan produk 100% sama dengan gambar referensi.
2. Jangan mengubah tekstur, bahan, warna, ukuran, bentuk, zipper, tali, logo, motif, atau detail produk.
3. Prompt harus jelas untuk AI image/video generation dengan referensi produk + model.
4. Buat output yang langsung bisa disalin ke AI gambar/video.
5. Jangan pakai markdown. Output JSON valid saja.

Buat JSON dengan struktur ini:
{
  "style_name": "nama gaya",
  "prompt_gambar": "prompt gambar yang sangat detail, ketat, product locked, rasio 9:16",
  "prompt_video": "prompt video 10 detik, kamera, gerakan, adegan, product locked, rasio 9:16",
  "negative_prompt": "larangan detail agar produk tidak berubah",
  "deskripsi_produk": "deskripsi affiliate singkat",
  "caption_tiktok": "caption siap pakai",
  "hashtag": ["#hashtag"],
  "overlay_text": ["teks overlay per scene"],
  "voice_over": "voice over 10 detik",
  "cta": "CTA keranjang kuning yang natural"
}
`;
}

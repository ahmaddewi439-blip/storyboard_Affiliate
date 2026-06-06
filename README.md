# Affiliate Storyboard Gemini V2

Web tool untuk membuat storyboard TikTok Affiliate berbasis Gemini API.

## Fitur V2

- Upload gambar produk wajib
- Upload gambar model/referensi opsional
- Button `PILIH VISUAL GAYA`
- Halaman pilihan 5 tier visual gaya berbintang
- 20 format affiliate universal lintas kategori produk
- Generate storyboard visual
- Generate prompt lengkap untuk Gemini Flow dan Grok.ai Flow
- Generate deskripsi, caption, hashtag, overlay text, VO script, CTA, editor notes
- Product Lock agar produk tidak berubah warna, bentuk, tekstur, logo/label, zipper/tali/tombol/port/kemasan

## Environment Variables di Vercel

```env
GEMINI_API_KEY=isi_api_key_gemini
GEMINI_TEXT_MODEL=gemini-2.5-flash
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
```

## Deploy

Upload isi folder project ke GitHub root, lalu import ke Vercel.
Pastikan root GitHub berisi folder `app`, `lib`, `package.json`, `next.config.mjs`, dan `tsconfig.json`.

# Affiliate Storyboard Gemini

Web tool V1 untuk membuat:

1. Upload gambar produk dan model/referensi.
2. Generate storyboard visual TikTok Affiliate dari Gemini Image.
3. Generate product lock dari Gemini Text.
4. Pilih 20 gaya affiliate.
5. Generate prompt gambar, prompt video, negative prompt, deskripsi, caption, hashtag, overlay text, VO, dan CTA.

## API yang digunakan

Satu pintu memakai Gemini API:

- Text model default: `gemini-2.5-flash`
- Image model default: `gemini-2.5-flash-image`

## Cara install lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `.env.local`:

```env
GEMINI_API_KEY=isi_api_key_gemini_di_sini
GEMINI_TEXT_MODEL=gemini-2.5-flash
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
```

Buka:

```bash
http://localhost:3000
```

## Deploy ke Vercel

1. Upload folder project ke GitHub.
2. Import ke Vercel.
3. Tambahkan Environment Variables:
   - `GEMINI_API_KEY`
   - `GEMINI_TEXT_MODEL`
   - `GEMINI_IMAGE_MODEL`
4. Deploy.

## Catatan penting

- API key hanya dipakai di server route `/api/*`, bukan di browser.
- Product lock dibuat otomatis dari gambar produk.
- Prompt gaya selalu memakai product lock agar produk tidak berubah.
- Untuk hasil produk 100% sama, tetap gunakan gambar referensi produk saat generate gambar/video.

## Estimasi biaya

Untuk 1x generate storyboard visual + teks prompt lengkap: kira-kira Rp800-Rp1.000, tergantung panjang input/output dan kurs.

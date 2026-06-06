'use client';

import { useMemo, useState } from 'react';
import { affiliateStyles } from '@/lib/styles';
import { Copy, ImagePlus, Sparkles, Wand2 } from 'lucide-react';

type StoryboardData = {
  product_summary?: string;
  product_lock?: {
    must_keep?: string[];
    forbidden?: string[];
    visual_identity?: string[];
  };
  storyboard?: Array<{
    panel?: number;
    time?: string;
    visual?: string;
    overlay_text?: string;
    voice_over?: string;
    camera_motion?: string;
    production_note?: string;
  }>;
  estimated_cost_idr?: string;
};

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
};

function copyText(value: string) {
  navigator.clipboard.writeText(value || '');
}

function OutputBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="output-box">
      <div className="output-head">
        <div className="output-title">{title}</div>
        <button className="secondary" onClick={() => copyText(value)} type="button">
          <Copy size={14} /> Copy
        </button>
      </div>
      <pre>{value || '-'}</pre>
    </div>
  );
}

export default function HomePage() {
  const [productName, setProductName] = useState('');
  const [language, setLanguage] = useState('Indonesia');
  const [duration, setDuration] = useState('10 detik');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [productPreview, setProductPreview] = useState('');
  const [modelPreview, setModelPreview] = useState('');
  const [loadingStoryboard, setLoadingStoryboard] = useState(false);
  const [loadingStyle, setLoadingStyle] = useState(false);
  const [storyboardImage, setStoryboardImage] = useState('');
  const [storyboard, setStoryboard] = useState<StoryboardData | null>(null);
  const [styleResult, setStyleResult] = useState<StyleResult | null>(null);
  const [activeStyle, setActiveStyle] = useState('clean-studio');
  const [error, setError] = useState('');

  const productLockText = useMemo(() => {
    if (!storyboard?.product_lock) return '';
    return JSON.stringify(storyboard.product_lock, null, 2);
  }, [storyboard]);

  function onPickProduct(file?: File) {
    if (!file) return;
    setProductImage(file);
    setProductPreview(URL.createObjectURL(file));
  }

  function onPickModel(file?: File) {
    if (!file) return;
    setModelImage(file);
    setModelPreview(URL.createObjectURL(file));
  }

  async function generateStoryboard() {
    if (!productImage) {
      setError('Upload gambar produk dulu.');
      return;
    }

    setLoadingStoryboard(true);
    setError('');
    setStoryboardImage('');
    setStyleResult(null);

    try {
      const form = new FormData();
      form.append('productImage', productImage);
      if (modelImage) form.append('modelImage', modelImage);
      form.append('productName', productName);
      form.append('duration', duration);
      form.append('language', language);

      const response = await fetch('/api/generate-storyboard', {
        method: 'POST',
        body: form
      });
      const json = await response.json();

      if (!response.ok) throw new Error(json.error || 'Gagal generate storyboard.');

      setStoryboard(json.storyboard);
      setStoryboardImage(json.storyboardImage || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal generate storyboard.');
    } finally {
      setLoadingStoryboard(false);
    }
  }

  async function generateStyle(styleId: string) {
    setActiveStyle(styleId);
    setLoadingStyle(true);
    setError('');
    setStyleResult(null);

    try {
      const response = await fetch('/api/generate-style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          styleId,
          productName,
          language,
          productLock: storyboard?.product_lock
        })
      });
      const json = await response.json();

      if (!response.ok) throw new Error(json.error || 'Gagal generate style.');
      setStyleResult(json.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal generate style.');
    } finally {
      setLoadingStyle(false);
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <div>
            <div className="badge"><Sparkles size={16} /> Gemini Affiliate Tool V1</div>
            <h1>Storyboard & Prompt Generator TikTok Affiliate</h1>
            <p className="subtitle">
              Upload produk dan model, klik generate, lalu sistem membuat storyboard visual dari Gemini dan menu 20 gaya affiliate untuk prompt gambar, prompt video, caption, deskripsi, hashtag, VO, dan CTA.
            </p>
          </div>
          <div className="cost-pill">
            <strong>± Rp800–Rp1.000</strong>
            <span>Estimasi 1 generate storyboard + teks prompt</span>
          </div>
        </header>

        <section className="grid">
          <aside className="card">
            <h2>1. Upload & Generate</h2>
            <div className="field">
              <label>Nama produk</label>
              <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Contoh: Tas Corduroy Cokelat" type="text" />
            </div>
            <div className="field">
              <label>Bahasa output</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>Indonesia</option>
                <option>English</option>
                <option>Malaysia</option>
              </select>
            </div>
            <div className="field">
              <label>Durasi video</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option>10 detik</option>
                <option>15 detik</option>
                <option>30 detik</option>
                <option>60 detik</option>
              </select>
            </div>
            <div className="field">
              <label>Upload gambar produk wajib</label>
              <input accept="image/*" type="file" onChange={(e) => onPickProduct(e.target.files?.[0])} />
              <div className="helper">Produk akan dikunci agar warna, tekstur, bentuk, zipper/tali/logo tidak berubah.</div>
            </div>
            <div className="field">
              <label>Upload gambar model/referensi opsional</label>
              <input accept="image/*" type="file" onChange={(e) => onPickModel(e.target.files?.[0])} />
              <div className="helper">Bisa dipakai untuk pose, outfit, atau style pemakaian.</div>
            </div>
            <div className="preview">
              <div className="preview-box">{productPreview ? <img src={productPreview} alt="Preview produk" /> : <span>Preview produk</span>}</div>
              <div className="preview-box">{modelPreview ? <img src={modelPreview} alt="Preview model" /> : <span>Preview model</span>}</div>
            </div>
            <button className="primary" disabled={loadingStoryboard} onClick={generateStoryboard} type="button">
              <ImagePlus size={16} /> {loadingStoryboard ? 'Generating storyboard...' : 'Generate Storyboard'}
            </button>
            {error && <div className="error">{error}</div>}
            <p className="footer-note">
              Catatan: API key Gemini disimpan di server environment variable, tidak muncul di browser.
            </p>
          </aside>

          <section className="result-grid">
            <div className="card">
              <div className="section-title">
                <h2>2. Hasil Storyboard Visual</h2>
                {storyboardImage && (
                  <a className="secondary" href={storyboardImage} download="storyboard-affiliate.png">Download PNG</a>
                )}
              </div>
              <div className={`story-image ${storyboardImage ? '' : 'empty'}`}>
                {storyboardImage ? (
                  <img src={storyboardImage} alt="Generated storyboard" />
                ) : (
                  <div>
                    <Wand2 size={42} style={{ margin: '0 auto 10px' }} />
                    Storyboard visual akan muncul di sini setelah generate.
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h2>3. Product Lock</h2>
              {storyboard?.product_lock ? (
                <div className="lock-list">
                  <div><strong>Ringkasan:</strong> {storyboard.product_summary || '-'}</div>
                  <div><strong>Must Keep:</strong> {(storyboard.product_lock.must_keep || []).join(', ')}</div>
                  <div><strong>Forbidden:</strong> {(storyboard.product_lock.forbidden || []).join(', ')}</div>
                  <div><strong>Visual Identity:</strong> {(storyboard.product_lock.visual_identity || []).join(', ')}</div>
                </div>
              ) : (
                <div className="helper">Product lock muncul setelah storyboard dibuat.</div>
              )}
            </div>

            <div className="card">
              <div className="section-title">
                <h2>4. Pilih 20 Gaya Affiliate</h2>
                <span className="helper">Klik salah satu gaya untuk generate prompt.</span>
              </div>
              <div className="style-grid">
                {affiliateStyles.map((style) => (
                  <button
                    key={style.id}
                    className={`style-btn ${activeStyle === style.id ? 'active' : ''}`}
                    onClick={() => generateStyle(style.id)}
                    disabled={loadingStyle}
                    type="button"
                  >
                    <strong>{style.shortName}</strong>
                    <span>{style.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <h2>5. Hasil Prompt & Copywriting</h2>
                <span className="helper">{loadingStyle ? 'Generating prompt...' : 'Siap dicopy'}</span>
              </div>
              {styleResult ? (
                <div className="outputs">
                  <OutputBox title="Prompt Gambar" value={styleResult.prompt_gambar || ''} />
                  <OutputBox title="Prompt Video" value={styleResult.prompt_video || ''} />
                  <OutputBox title="Negative Prompt" value={styleResult.negative_prompt || ''} />
                  <OutputBox title="Deskripsi Produk" value={styleResult.deskripsi_produk || ''} />
                  <OutputBox title="Caption TikTok" value={styleResult.caption_tiktok || ''} />
                  <OutputBox title="Hashtag" value={(styleResult.hashtag || []).join(' ')} />
                  <OutputBox title="Overlay Text" value={(styleResult.overlay_text || []).join('\n')} />
                  <OutputBox title="Voice Over + CTA" value={`${styleResult.voice_over || ''}\n\nCTA: ${styleResult.cta || ''}`} />
                </div>
              ) : (
                <div className="helper">Pilih salah satu gaya affiliate untuk menghasilkan prompt gambar, prompt video, deskripsi, caption, hashtag, overlay, VO, dan CTA.</div>
              )}
            </div>

            {productLockText && (
              <div className="card">
                <div className="section-title">
                  <h2>Product Lock JSON</h2>
                  <button className="secondary" onClick={() => copyText(productLockText)} type="button">Copy JSON</button>
                </div>
                <pre>{productLockText}</pre>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

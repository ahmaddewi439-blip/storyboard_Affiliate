'use client';

import { useMemo, useState } from 'react';
import { affiliateStyles, getStyleById, getStylesByTier, renderStars, styleTiers, type TierId } from '@/lib/styles';
import { ChevronDown, Copy, ImagePlus, Layers3, Sparkles, Wand2 } from 'lucide-react';

type PromptPackage = {
  gemini_flow?: {
    image_prompt?: string;
    video_prompt?: string;
    negative_prompt?: string;
  };
  grok_flow?: {
    image_prompt?: string;
    video_prompt?: string;
    negative_prompt?: string;
  };
  copywriting?: {
    description?: string;
    caption?: string;
    hashtags?: string[];
    overlay_texts?: string[];
    voice_over_script?: string;
    cta?: string;
  };
  editor_notes?: {
    shot_list?: string[];
    motion_notes?: string[];
    do_not_change?: string[];
  };
};

type StoryboardData = {
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
  storyboard?: Array<{
    panel?: number;
    time?: string;
    goal?: string;
    visual?: string;
    overlay_text?: string;
    voice_over?: string;
    camera_motion?: string;
    production_note?: string;
  }>;
  prompt_package?: PromptPackage;
  estimated_cost_idr?: string;
  raw?: string;
};

type Stage = 'upload' | 'styles' | 'output';

function copyText(value: string) {
  navigator.clipboard.writeText(value || '');
}

function stringifyValue(value: unknown) {
  if (Array.isArray(value)) return value.join('\n');
  if (typeof value === 'string') return value;
  if (!value) return '';
  return JSON.stringify(value, null, 2);
}

function OutputBox({ title, value }: { title: string; value: unknown }) {
  const text = stringifyValue(value);
  return (
    <div className="output-box">
      <div className="output-head">
        <div className="output-title">{title}</div>
        <button className="secondary tiny" onClick={() => copyText(text)} type="button">
          <Copy size={14} /> Copy
        </button>
      </div>
      <pre>{text || '-'}</pre>
    </div>
  );
}

export default function HomePage() {
  const [stage, setStage] = useState<Stage>('upload');
  const [productName, setProductName] = useState('');
  const [language, setLanguage] = useState('Indonesia');
  const [duration, setDuration] = useState('10 detik');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [productPreview, setProductPreview] = useState('');
  const [modelPreview, setModelPreview] = useState('');
  const [openTier, setOpenTier] = useState<TierId | ''>('');
  const [selectedStyleId, setSelectedStyleId] = useState('');
  const [loadingStoryboard, setLoadingStoryboard] = useState(false);
  const [storyboardImage, setStoryboardImage] = useState('');
  const [storyboard, setStoryboard] = useState<StoryboardData | null>(null);
  const [error, setError] = useState('');

  const selectedStyle = useMemo(() => (selectedStyleId ? getStyleById(selectedStyleId) : null), [selectedStyleId]);
  const promptPackage = storyboard?.prompt_package || {};
  const copyAllText = useMemo(() => {
    if (!storyboard) return '';
    return JSON.stringify(
      {
        product_summary: storyboard.product_summary,
        detected_category: storyboard.detected_category,
        selected_tier: storyboard.selected_tier,
        selected_style: storyboard.selected_style,
        product_lock: storyboard.product_lock,
        storyboard: storyboard.storyboard,
        prompt_package: storyboard.prompt_package
      },
      null,
      2
    );
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

  function goToVisualStyles() {
    if (!productImage) {
      setError('Upload gambar produk dulu sebelum memilih visual gaya.');
      return;
    }
    setError('');
    setStage('styles');
    setTimeout(() => document.getElementById('visual-style-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  async function generateStoryboardByStyle() {
    if (!productImage) {
      setError('Upload gambar produk dulu.');
      setStage('upload');
      return;
    }
    if (!selectedStyleId) {
      setError('Pilih salah satu gaya affiliate dulu.');
      return;
    }

    setLoadingStoryboard(true);
    setError('');
    setStoryboardImage('');
    setStoryboard(null);

    try {
      const form = new FormData();
      form.append('productImage', productImage);
      if (modelImage) form.append('modelImage', modelImage);
      form.append('productName', productName);
      form.append('duration', duration);
      form.append('language', language);
      form.append('styleId', selectedStyleId);

      const response = await fetch('/api/generate-storyboard', {
        method: 'POST',
        body: form
      });
      const json = await response.json();

      if (!response.ok) throw new Error(json.error || 'Gagal generate storyboard.');

      setStoryboard(json.storyboard);
      setStoryboardImage(json.storyboardImage || '');
      setStage('output');
      setTimeout(() => document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal generate storyboard.');
    } finally {
      setLoadingStoryboard(false);
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <div>
            <div className="badge"><Sparkles size={16} /> Affiliate Storyboard Tool V2</div>
            <h1>Storyboard & Prompt Generator TikTok Affiliate</h1>
            <p className="subtitle">
              Upload produk dan model, pilih visual gaya berbasis tier bintang, lalu hasilkan storyboard visual serta paket prompt lengkap untuk Gemini dan Grok.ai.
            </p>
          </div>
          <div className="cost-pill">
            <strong>± Rp800–Rp1.000</strong>
            <span>Estimasi 1 generate storyboard + paket prompt</span>
          </div>
        </header>

        <section className="grid upload-grid">
          <aside className="card upload-card">
            <h2>1. Upload Produk & Model</h2>
            <div className="field">
              <label>Nama produk</label>
              <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Contoh: Vacuum Mini Portable" type="text" />
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
              <div className="helper">Produk dikunci agar warna, tekstur, bentuk, label/logo, zipper/tali/tombol/port/kemasan tidak berubah.</div>
            </div>
            <div className="field">
              <label>Upload gambar model/referensi opsional</label>
              <input accept="image/*" type="file" onChange={(e) => onPickModel(e.target.files?.[0])} />
              <div className="helper">Dipakai untuk pose, tangan, ruangan, lifestyle, atau cara pemakaian. Produk tetap mengikuti gambar produk.</div>
            </div>
            <div className="preview">
              <div className="preview-box">{productPreview ? <img src={productPreview} alt="Preview produk" /> : <span>Preview produk</span>}</div>
              <div className="preview-box">{modelPreview ? <img src={modelPreview} alt="Preview model" /> : <span>Preview model</span>}</div>
            </div>
            <button className="primary" onClick={goToVisualStyles} type="button">
              <Layers3 size={16} /> PILIH VISUAL GAYA
            </button>
            {error && <div className="error">{error}</div>}
            <p className="footer-note">API key Gemini tetap aman di Vercel Environment Variables dan tidak muncul di browser.</p>
          </aside>

          <section className="card flow-card">
            <h2>Alur Baru</h2>
            <div className="flow-steps">
              <div className="flow-step active"><strong>1</strong><span>Upload produk + model/referensi</span></div>
              <div className={stage !== 'upload' ? 'flow-step active' : 'flow-step'}><strong>2</strong><span>Pilih visual gaya berbasis tier</span></div>
              <div className={stage === 'output' ? 'flow-step active' : 'flow-step'}><strong>3</strong><span>Hasilkan storyboard + semua prompt</span></div>
            </div>
            <div className="premium-note">
              <strong>Output yang dibuat:</strong>
              <p>Storyboard visual, Product Lock, Gemini image prompt, Gemini video prompt, Grok image prompt, Grok video prompt, deskripsi, caption, hashtag, overlay, VO, CTA, dan editor notes.</p>
            </div>
          </section>
        </section>

        {stage !== 'upload' && (
          <section id="visual-style-section" className="card tier-section">
            <div className="section-title">
              <div>
                <h2>2. Pilih Visual Gaya</h2>
                <p className="helper">Klik salah satu tier untuk membuka pilihan gaya. Tier 5 paling direkomendasikan untuk conversion.</p>
              </div>
              <button className="secondary" onClick={() => setStage('upload')} type="button">Kembali Upload</button>
            </div>

            <div className="tier-list">
              {styleTiers.map((tier) => {
                const isOpen = openTier === tier.id;
                const styles = getStylesByTier(tier.id);
                return (
                  <div className={`tier-card ${isOpen ? 'open' : ''}`} key={tier.id}>
                    <button className="tier-head" onClick={() => setOpenTier(isOpen ? '' : tier.id)} type="button">
                      <div>
                        <div className="stars">{renderStars(tier.stars)}</div>
                        <h3>{tier.title}</h3>
                        <p>{tier.subtitle}</p>
                      </div>
                      <div className="tier-meta">
                        <span>{tier.badge}</span>
                        <ChevronDown className={isOpen ? 'rotate' : ''} size={20} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="tier-body">
                        <p className="tier-desc">{tier.description}</p>
                        <div className="style-card-grid">
                          {styles.map((style) => {
                            const selected = selectedStyleId === style.id;
                            return (
                              <button className={`premium-style-card ${selected ? 'selected' : ''}`} key={style.id} onClick={() => setSelectedStyleId(style.id)} type="button">
                                <div className="style-topline"><span>{style.shortName}</span>{selected && <strong>Dipilih</strong>}</div>
                                <h4>{style.name}</h4>
                                <h5>{style.subtitle}</h5>
                                <p>{style.description}</p>
                                <div className="mini-info"><b>Cocok:</b> {style.suitableFor}</div>
                                <div className="mini-info"><b>Fokus:</b> {style.contentFocus}</div>
                                <div className="style-note">✦ Note: {style.note}</div>
                                <div className="style-minus">Minus: {style.minus}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="generate-bar">
              <div>
                <strong>Gaya dipilih: {selectedStyle?.name || 'Belum memilih gaya'}</strong>
                <span>{selectedStyle?.subtitle || 'Buka salah satu tier, lalu pilih gaya yang paling cocok.'}</span>
              </div>
              <button className="primary generate-main" disabled={loadingStoryboard || !selectedStyleId} onClick={generateStoryboardByStyle} type="button">
                <ImagePlus size={16} /> {loadingStoryboard ? 'MEMBUAT STORYBOARD...' : 'HASILKAN STORYBOARD'}
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </section>
        )}

        {stage === 'output' && storyboard && (
          <section id="output-section" className="result-grid output-section">
            <div className="card">
              <div className="section-title">
                <div>
                  <h2>3. Hasil Storyboard Visual</h2>
                  <p className="helper">Visual dibuat sesuai gaya: {storyboard.selected_style?.name || selectedStyle?.name || '-'}</p>
                </div>
                <div className="action-row">
                  {storyboardImage && <a className="secondary" href={storyboardImage} download="storyboard-affiliate.png">Download PNG</a>}
                  <button className="secondary" onClick={() => copyText(copyAllText)} type="button"><Copy size={14} /> Copy Semua</button>
                </div>
              </div>
              <div className={`story-image ${storyboardImage ? '' : 'empty'}`}>
                {storyboardImage ? (
                  <img src={storyboardImage} alt="Generated storyboard" />
                ) : (
                  <div><Wand2 size={42} style={{ margin: '0 auto 10px' }} />Storyboard visual belum tersedia.</div>
                )}
              </div>
            </div>

            <div className="card summary-card">
              <h2>Product Lock & Style Summary</h2>
              <div className="lock-list">
                <div><strong>Kategori:</strong> {storyboard.detected_category || '-'}</div>
                <div><strong>Ringkasan:</strong> {storyboard.product_summary || '-'}</div>
                <div><strong>Tier:</strong> {storyboard.selected_tier?.stars ? renderStars(storyboard.selected_tier.stars) : '-'} {storyboard.selected_tier?.name || ''}</div>
                <div><strong>Style:</strong> {storyboard.selected_style?.name || selectedStyle?.name || '-'}</div>
                <div><strong>Must Keep:</strong> {(storyboard.product_lock?.must_keep || []).join(', ')}</div>
                <div><strong>Forbidden:</strong> {(storyboard.product_lock?.forbidden || []).join(', ')}</div>
              </div>
            </div>

            <div className="card">
              <h2>Prompt Gemini Flow</h2>
              <div className="outputs">
                <OutputBox title="Gemini Image Prompt" value={promptPackage.gemini_flow?.image_prompt} />
                <OutputBox title="Gemini Video Prompt" value={promptPackage.gemini_flow?.video_prompt} />
                <OutputBox title="Gemini Negative Prompt" value={promptPackage.gemini_flow?.negative_prompt} />
              </div>
            </div>

            <div className="card">
              <h2>Prompt Grok.ai Flow</h2>
              <div className="outputs">
                <OutputBox title="Grok Image Prompt" value={promptPackage.grok_flow?.image_prompt} />
                <OutputBox title="Grok Video Prompt" value={promptPackage.grok_flow?.video_prompt} />
                <OutputBox title="Grok Negative Prompt" value={promptPackage.grok_flow?.negative_prompt} />
              </div>
            </div>

            <div className="card">
              <h2>Copywriting TikTok Affiliate</h2>
              <div className="outputs">
                <OutputBox title="Deskripsi Produk" value={promptPackage.copywriting?.description} />
                <OutputBox title="Caption TikTok" value={promptPackage.copywriting?.caption} />
                <OutputBox title="Hashtag" value={promptPackage.copywriting?.hashtags} />
                <OutputBox title="Overlay Text" value={promptPackage.copywriting?.overlay_texts} />
                <OutputBox title="Voice Over Script" value={promptPackage.copywriting?.voice_over_script} />
                <OutputBox title="CTA" value={promptPackage.copywriting?.cta} />
              </div>
            </div>

            <div className="card">
              <h2>Editor Notes</h2>
              <div className="outputs">
                <OutputBox title="Shot List" value={promptPackage.editor_notes?.shot_list} />
                <OutputBox title="Motion Notes" value={promptPackage.editor_notes?.motion_notes} />
                <OutputBox title="Do Not Change" value={promptPackage.editor_notes?.do_not_change} />
                <OutputBox title="Storyboard Panels" value={storyboard.storyboard} />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

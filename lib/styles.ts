export type AffiliateStyle = {
  id: string;
  name: string;
  shortName: string;
  description: string;
};

export const affiliateStyles: AffiliateStyle[] = [
  { id: 'clean-studio', name: 'Clean Studio Showcase', shortName: 'Clean Studio', description: 'Visual bersih, background putih/cream, fokus detail produk dan ukuran.' },
  { id: 'korean-daily', name: 'Korean Daily Outfit', shortName: 'Korean Daily', description: 'Nuansa soft Korea, outfit casual, cocok untuk daily fashion.' },
  { id: 'campus-look', name: 'Campus Look', shortName: 'Campus', description: 'Gaya anak kuliah, simple, muat barang harian.' },
  { id: 'office-casual', name: 'Office Casual', shortName: 'Office', description: 'Look rapi untuk kerja, meeting ringan, dan aktivitas kantor.' },
  { id: 'cafe-aesthetic', name: 'Cafe Aesthetic', shortName: 'Cafe', description: 'Scene cafe aesthetic, hangout, dan OOTD santai.' },
  { id: 'grwm', name: 'GRWM Affiliate', shortName: 'GRWM', description: 'Alur get ready with me, tas jadi final touch outfit.' },
  { id: 'whats-in-my-bag', name: "What's In My Bag", shortName: 'Isi Tas', description: 'Menonjolkan kapasitas tas dan barang yang muat.' },
  { id: 'unboxing', name: 'Unboxing Soft Sell', shortName: 'Unboxing', description: 'Buka paket, detail tekstur, review singkat.' },
  { id: 'asmr-texture', name: 'ASMR Texture Close Up', shortName: 'ASMR', description: 'Close-up tekstur, zipper, dan detail bahan.' },
  { id: 'minimal-luxury', name: 'Minimal Luxury', shortName: 'Luxury', description: 'Clean premium, lighting lembut, visual elegan.' },
  { id: 'streetwear', name: 'Streetwear Match', shortName: 'Streetwear', description: 'Gaya jalan santai, outfit modern, dynamic movement.' },
  { id: 'travel-bag', name: 'Travel Mini Bag', shortName: 'Travel', description: 'Tas untuk jalan, liburan pendek, dan barang penting.' },
  { id: 'size-proof', name: 'Size Proof Demo', shortName: 'Size Proof', description: 'Fokus bukti ukuran, isi tas, dan perbandingan barang.' },
  { id: 'problem-solution', name: 'Problem Solution Hook', shortName: 'Problem', description: 'Hook masalah tas ribet, solusi tas simple dan muat.' },
  { id: 'outfit-match', name: 'Outfit Match Ideas', shortName: 'Outfit', description: 'Cocokkan tas dengan beberapa outfit harian.' },
  { id: 'flash-sale', name: 'Flash Sale Urgency', shortName: 'Flash Sale', description: 'CTA lebih kuat, cocok promo dan live sale.' },
  { id: 'soft-feminine', name: 'Soft Feminine Aesthetic', shortName: 'Feminine', description: 'Warna soft, vibe girly, clean, manis.' },
  { id: 'product-closeup', name: 'Product Close-up Detail', shortName: 'Close-up', description: 'Detail bahan, zipper, tali, jahitan, dan bentuk.' },
  { id: 'everyday-use', name: 'Everyday Use Demo', shortName: 'Daily Use', description: 'Menampilkan tas dipakai untuk aktivitas sehari-hari.' },
  { id: 'testimonial', name: 'Testimonial Style', shortName: 'Testimoni', description: 'Seolah review jujur pengguna dengan social proof.' }
];

export function getStyleById(id: string) {
  return affiliateStyles.find((style) => style.id === id) || affiliateStyles[0];
}

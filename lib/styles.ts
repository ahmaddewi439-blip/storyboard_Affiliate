export type TierId = 'tier-5' | 'tier-4' | 'tier-3' | 'tier-2' | 'tier-1';

export type StyleTier = {
  id: TierId;
  stars: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
};

export type AffiliateStyle = {
  id: string;
  tier: TierId;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  suitableFor: string;
  contentFocus: string;
  note: string;
  whySells: string;
  minus: string;
};

export const styleTiers: StyleTier[] = [
  {
    id: 'tier-5',
    stars: 5,
    title: 'Tier 5 — Most Recommended',
    subtitle: 'Highest Conversion Potential',
    description: 'Format paling direkomendasikan untuk produk affiliate yang targetnya cepat menghasilkan penjualan. Fokus pada proof, masalah, trust, dan keraguan pembeli.',
    badge: 'Recommended for Sales'
  },
  {
    id: 'tier-4',
    stars: 4,
    title: 'Tier 4 — Strong Sales Format',
    subtitle: 'Very Good for Conversion',
    description: 'Format kuat untuk variasi konten utama. Tetap bagus untuk jualan, terutama jika dikombinasikan dengan demo, UGC, atau product proof.',
    badge: 'High Conversion'
  },
  {
    id: 'tier-3',
    stars: 3,
    title: 'Tier 3 — Creative Testing',
    subtitle: 'Good for Engagement',
    description: 'Format bagus untuk testing angle, meningkatkan watch time, dan membuat produk terlihat lebih menarik. Tidak selalu langsung closing jika tanpa proof.',
    badge: 'Creative Testing'
  },
  {
    id: 'tier-2',
    stars: 2,
    title: 'Tier 2 — Situational',
    subtitle: 'Good but Context Dependent',
    description: 'Dipakai saat konteksnya cocok. Bisa bagus, tetapi performanya sangat bergantung pada jenis produk, momen, dan kekuatan hook.',
    badge: 'Situational'
  },
  {
    id: 'tier-1',
    stars: 1,
    title: 'Tier 1 — Use Carefully',
    subtitle: 'Lowest Priority as Main Angle',
    description: 'Bukan berarti buruk, tetapi jangan dijadikan format utama. Biasanya terlalu hard selling jika tidak didahului demo, proof, atau trust building.',
    badge: 'Use Carefully'
  }
];

export const affiliateStyles: AffiliateStyle[] = [
  {
    id: 'product-demo-proof',
    tier: 'tier-5',
    name: 'Product Demo Proof',
    shortName: 'Demo Proof',
    subtitle: 'Show the Product in Action',
    description: 'Menampilkan produk bekerja secara nyata, bukan hanya dijelaskan.',
    suitableFor: 'Gadget, alat dapur, cleaning tools, beauty tools, toys, home tools, dan produk yang punya fungsi jelas.',
    contentFocus: 'Demo fungsi, hasil nyata, cara kerja produk, bukti manfaat utama.',
    note: 'Format paling kuat untuk menunjukkan produk benar-benar bekerja.',
    whySells: 'Pembeli melihat langsung bukti fungsi produk sebelum checkout.',
    minus: 'Kurang cocok untuk produk yang hanya mengandalkan tampilan visual tanpa fungsi jelas.'
  },
  {
    id: 'problem-solution',
    tier: 'tier-5',
    name: 'Problem → Solution',
    shortName: 'Problem Solution',
    subtitle: 'Turn Pain Point Into Buying Desire',
    description: 'Mulai dari masalah harian, lalu produk muncul sebagai solusi cepat dan masuk akal.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Masalah harian, solusi cepat, manfaat utama produk, hasil setelah menggunakan produk.',
    note: 'Cocok untuk produk yang punya pain point jelas dan mudah dipahami.',
    whySells: 'Audiens merasa masalahnya sama, sehingga alasan membeli jadi lebih kuat.',
    minus: 'Kalau masalahnya tidak jelas, konten bisa terasa dipaksakan.'
  },
  {
    id: 'ugc-honest-review',
    tier: 'tier-5',
    name: 'UGC Honest Review',
    shortName: 'UGC Review',
    subtitle: 'Natural Review That Builds Trust',
    description: 'Creator memberi review seperti pembeli asli dengan bahasa santai dan pengalaman personal.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Review natural, first impression, alasan suka, pengalaman pakai, trust signal.',
    note: 'Terasa real, personal, dan tidak terlalu seperti iklan.',
    whySells: 'Membangun trust lebih cepat karena terasa seperti rekomendasi orang biasa.',
    minus: 'Butuh gaya bicara natural agar tidak terdengar scripted.'
  },
  {
    id: 'before-after',
    tier: 'tier-5',
    name: 'Before → After',
    shortName: 'Before After',
    subtitle: 'Instant Visual Transformation',
    description: 'Menampilkan perubahan sebelum dan sesudah produk digunakan.',
    suitableFor: 'Cleaning, beauty, home decor, organizer, otomotif, repair tools.',
    contentFocus: 'Kondisi awal, proses pemakaian, hasil akhir, perubahan visual.',
    note: 'Paling efektif untuk produk yang punya hasil visual jelas.',
    whySells: 'Hasil terlihat cepat sehingga manfaat produk mudah dipercaya.',
    minus: 'Tidak semua produk punya transformasi visual yang kuat.'
  },
  {
    id: 'objection-handling',
    tier: 'tier-5',
    name: 'Objection Handling',
    shortName: 'Objection',
    subtitle: 'Answer Buyer Doubts Before Checkout',
    description: 'Menjawab keraguan umum calon pembeli sebelum mereka batal membeli.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Ukuran, kualitas, bahan, hasil, keamanan, daya tahan, cara pakai, value produk.',
    note: 'Sangat efektif untuk meningkatkan keyakinan sebelum checkout.',
    whySells: 'Mengurangi rasa ragu dan membuat pembeli merasa lebih aman.',
    minus: 'Perlu tahu keraguan pembeli yang paling sering muncul.'
  },
  {
    id: 'size-capacity-fit-test',
    tier: 'tier-5',
    name: 'Size / Capacity / Fit Test',
    shortName: 'Size Proof',
    subtitle: 'Proof of Size, Space, and Fit',
    description: 'Membuktikan ukuran, kapasitas, atau kecocokan produk secara nyata.',
    suitableFor: 'Tas, storage, box, rak, organizer, gadget, alat dapur, produk bayi, otomotif.',
    contentFocus: 'Ukuran, kapasitas, perbandingan objek, muat apa saja, pas untuk apa.',
    note: 'Bagus untuk menjawab pertanyaan “muat apa aja?” atau “sebesar apa?”.',
    whySells: 'Menjawab keraguan praktis yang sering menghambat pembelian.',
    minus: 'Kurang cocok untuk produk yang tidak bergantung pada ukuran atau kapasitas.'
  },
  {
    id: 'three-reasons-why',
    tier: 'tier-4',
    name: '3 Reasons Why',
    shortName: '3 Reasons',
    subtitle: 'Fast Reasons, Fast Decision',
    description: 'Menampilkan tiga alasan utama kenapa produk layak dibeli.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Tiga keunggulan utama, benefit, value, alasan praktis membeli.',
    note: 'Cepat, jelas, dan mudah dipahami oleh audiens yang scroll cepat.',
    whySells: 'Membantu pembeli mengambil keputusan dengan poin yang singkat.',
    minus: 'Kalau alasannya terlalu umum, konten bisa terasa biasa saja.'
  },
  {
    id: 'comparison-old-vs-new',
    tier: 'tier-4',
    name: 'Comparison Old vs New',
    shortName: 'Comparison',
    subtitle: 'Make the Upgrade Obvious',
    description: 'Membandingkan produk lama/biasa dengan produk affiliate.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Perbandingan fungsi, tampilan, hasil, kenyamanan, efisiensi.',
    note: 'Membantu audiens cepat melihat keunggulan produk.',
    whySells: 'Produk terasa seperti upgrade yang masuk akal.',
    minus: 'Harus hati-hati agar tidak terlihat menjatuhkan brand lain.'
  },
  {
    id: 'tutorial-how-to-use',
    tier: 'tier-4',
    name: 'Tutorial / How To Use',
    shortName: 'Tutorial',
    subtitle: 'Simple Steps, Clear Value',
    description: 'Menjelaskan cara memakai produk secara singkat dan mudah dipahami.',
    suitableFor: 'Gadget, beauty, kitchen tools, home tools, otomotif, produk bayi, tools.',
    contentFocus: 'Langkah penggunaan, fungsi utama, cara setting, hasil akhir.',
    note: 'Membantu audiens merasa produk mudah digunakan.',
    whySells: 'Mengurangi kebingungan dan membuat manfaat produk lebih jelas.',
    minus: 'Kurang menarik jika produknya terlalu sederhana.'
  },
  {
    id: 'daily-routine-use',
    tier: 'tier-4',
    name: 'Daily Routine Use',
    shortName: 'Daily Routine',
    subtitle: 'Make It Part of Everyday Life',
    description: 'Menampilkan produk digunakan dalam aktivitas harian yang natural.',
    suitableFor: 'Beauty, home, kitchen, gadget, baby products, office tools, pet products.',
    contentFocus: 'Rutinitas harian, pemakaian natural, manfaat praktis, scene relatable.',
    note: 'Membuat produk terasa relevan dan dekat dengan kehidupan audiens.',
    whySells: 'Pembeli lebih mudah membayangkan produk dipakai sendiri.',
    minus: 'Butuh scene relatable agar tidak terasa lambat.'
  },
  {
    id: 'cheap-but-worth-it',
    tier: 'tier-4',
    name: 'Cheap but Worth It',
    shortName: 'Worth It',
    subtitle: 'Affordable but Valuable',
    description: 'Menonjolkan value produk yang tinggi dengan harga terjangkau.',
    suitableFor: 'Semua produk dengan harga terjangkau atau promo.',
    contentFocus: 'Harga worth it, value tinggi, fitur, benefit, alasan tidak rugi.',
    note: 'Bagus untuk impulse buying di TikTok Shop.',
    whySells: 'Membuat audiens merasa produk ini terlalu sayang untuk dilewatkan.',
    minus: 'Jangan terlalu fokus harga murah sampai produk terlihat murahan.'
  },
  {
    id: 'pov-relatable-scenario',
    tier: 'tier-3',
    name: 'POV Relatable Scenario',
    shortName: 'POV',
    subtitle: 'Scroll-Stopping Relatable Moment',
    description: 'Menggunakan sudut pandang POV yang dekat dengan situasi audiens.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Situasi relatable, masalah ringan, solusi cepat, momen harian.',
    note: 'Bagus untuk hook awal karena terasa seperti konten TikTok asli.',
    whySells: 'Meningkatkan kemungkinan orang berhenti scroll.',
    minus: 'Bisa lemah kalau produk tidak cepat muncul atau manfaatnya tidak jelas.'
  },
  {
    id: 'viral-product-style',
    tier: 'tier-3',
    name: 'Viral Product Style',
    shortName: 'Viral Style',
    subtitle: 'Fast, Trendy, and Native to TikTok',
    description: 'Gaya cepat seperti produk viral dengan hook kuat dan potongan visual dinamis.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Hook cepat, visual dinamis, highlight benefit, CTA singkat.',
    note: 'Cocok untuk testing banyak creative dan mencari angle yang berpotensi viral.',
    whySells: 'Bagus untuk reach dan eksperimen creative.',
    minus: 'Viral style belum tentu menghasilkan checkout jika produk tidak dijelaskan.'
  },
  {
    id: 'unboxing-experience',
    tier: 'tier-3',
    name: 'Unboxing Experience',
    shortName: 'Unboxing',
    subtitle: 'First Impression That Feels Exciting',
    description: 'Membuat momen buka paket terasa fresh dan memancing rasa penasaran.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Packaging, first look, detail produk, reaksi pertama, quality check.',
    note: 'Bagus untuk membuat produk terlihat menarik sejak awal.',
    whySells: 'Membuat audiens penasaran terhadap isi dan kualitas produk.',
    minus: 'Kalau hanya unboxing tanpa manfaat, penonton bisa cepat skip.'
  },
  {
    id: 'asmr-detail-shot',
    tier: 'tier-3',
    name: 'ASMR Detail Shot',
    shortName: 'ASMR Detail',
    subtitle: 'Satisfying Close-Up Product Experience',
    description: 'Fokus pada suara dan detail visual produk.',
    suitableFor: 'Beauty, gadget, kitchen, accessories, stationery, home, fashion accessories.',
    contentFocus: 'Close-up detail, suara klik/zipper/tekstur/cairan/material, satisfying shot.',
    note: 'Membuat produk terasa premium, clean, dan satisfying.',
    whySells: 'Meningkatkan perceived value dan engagement visual.',
    minus: 'Biasanya lebih kuat untuk engagement daripada konversi langsung.'
  },
  {
    id: 'aesthetic-setup-transformation',
    tier: 'tier-3',
    name: 'Aesthetic Setup / Transformation',
    shortName: 'Aesthetic Setup',
    subtitle: 'Make the Product Look Premium',
    description: 'Menempatkan produk dalam setup yang rapi, estetik, dan menarik.',
    suitableFor: 'Home decor, desk setup, kitchen, beauty, room setup, office, stationery.',
    contentFocus: 'Perubahan visual, penataan, mood, before/after setup, hasil akhir.',
    note: 'Ideal untuk produk yang meningkatkan tampilan ruangan atau area tertentu.',
    whySells: 'Menaikkan perceived value produk.',
    minus: 'Jangan sampai terlalu fokus aesthetic sampai fungsi produk tidak terlihat.'
  },
  {
    id: 'durability-stress-test',
    tier: 'tier-3',
    name: 'Durability / Stress Test',
    shortName: 'Durability',
    subtitle: 'Make the Product Look Reliable',
    description: 'Menampilkan ketahanan atau kekuatan produk melalui tes ringan.',
    suitableFor: 'Tools, gadget, home tools, outdoor products, otomotif, toys.',
    contentFocus: 'Tes tahan pakai, kekuatan, material, keamanan, kualitas produk.',
    note: 'Cocok untuk produk yang perlu terlihat kuat dan tidak mudah rusak.',
    whySells: 'Memberi rasa aman terhadap kualitas produk.',
    minus: 'Tidak cocok untuk semua kategori dan jangan membuat tes berlebihan.'
  },
  {
    id: 'gift-recommendation',
    tier: 'tier-2',
    name: 'Gift Recommendation',
    shortName: 'Gift Idea',
    subtitle: 'Make the Product Feel Giftable',
    description: 'Memposisikan produk sebagai ide hadiah yang simple, berguna, dan menarik.',
    suitableFor: 'Beauty, gadget, toys, baby products, home, accessories, stationery.',
    contentFocus: 'Ide hadiah, penerima hadiah, alasan cocok, momen spesial.',
    note: 'Bagus untuk angle emosional dan momen seasonal.',
    whySells: 'Membantu audiens membayangkan produk sebagai hadiah.',
    minus: 'Kurang kuat di luar momen hadiah kecuali produknya memang giftable.'
  },
  {
    id: 'mistake-dont-buy-before-watching',
    tier: 'tier-2',
    name: 'Mistake / Don’t Buy Before Watching',
    shortName: 'Mistake Hook',
    subtitle: 'Educational Hook With Curiosity',
    description: 'Menggunakan gaya peringatan atau edukasi sebelum membeli.',
    suitableFor: 'Semua produk.',
    contentFocus: 'Kesalahan umum, tips memilih, warning, insight sebelum beli.',
    note: 'Cocok untuk hook kuat yang membuat orang berhenti scroll.',
    whySells: 'Membangun rasa penasaran dan membuat konten terasa informatif.',
    minus: 'Bisa terasa clickbait jika isi konten tidak benar-benar memberi insight.'
  },
  {
    id: 'hard-selling-tiktok-shop-cta',
    tier: 'tier-1',
    name: 'Hard Selling TikTok Shop CTA',
    shortName: 'Hard CTA',
    subtitle: 'Direct Conversion Push',
    description: 'Fokus pada promo, stok, diskon, urgency, dan ajakan klik keranjang kuning.',
    suitableFor: 'Semua produk, terutama saat promo atau flash sale.',
    contentFocus: 'Promo, urgency, stok terbatas, diskon, CTA kuat, keranjang kuning.',
    note: 'Dipakai saat tujuan utama adalah klik dan konversi cepat.',
    whySells: 'Bisa mendorong klik cepat jika audiens sudah tertarik.',
    minus: 'Jika dipakai terlalu awal tanpa proof, bisa terasa terlalu jualan dan mudah di-skip.'
  }
];

export function getStyleById(id: string) {
  return affiliateStyles.find((style) => style.id === id) || affiliateStyles[0];
}

export function getTierById(id: TierId) {
  return styleTiers.find((tier) => tier.id === id) || styleTiers[0];
}

export function getStylesByTier(tierId: TierId) {
  return affiliateStyles.filter((style) => style.tier === tierId);
}

export function renderStars(stars: number) {
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

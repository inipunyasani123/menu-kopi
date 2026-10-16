// Semua isi menu Sepertiga Kopi. Kedai ini fiktif: nama, alamat, harga, dan biji kopinya rekaan untuk demo.

export const site = {
  nama: 'Sepertiga Kopi',
  slug: 'kopi',
  url: 'https://menu-kopi.pintuweb.id',
  judul: 'Menu Sepertiga Kopi: Espresso, Manual Brew, Kudapan',
  deskripsi:
    'Menu digital kedai kopi Sepertiga Kopi: espresso, manual brew single origin, kopi susu, non-kopi, dan kudapan. Pindai QR di meja, pilih, lalu pesan lewat WhatsApp.',
  tagline: 'Seduh perlahan di sepertiga hari.',
  alamat: 'Jl. Kenanga No. 3, Lowokwaru, Malang',
  kota: 'Malang',
  // Jam buka dalam WIB. 0 = Minggu.
  jam: [
    { hari: [1, 2, 3, 4, 5], buka: '07.00', tutup: '21.00' },
    { hari: [6, 0], buka: '07.00', tutup: '22.00' },
  ],
  pajak: 'Harga sudah termasuk pajak. Tidak ada biaya layanan.',
  edisi: 'Oktober 2026',
  bijiMingguIni: { nama: 'Gayo Wine Process', rasa: 'stroberi, anggur hitam, cokelat' },
  rasio: { air: '1:15', suhu: '93 °C', waktu: '2:30' },
};

export const KUNCI = {
  nampan: 'sepertiga.nampan.v1',
  meja: 'sepertiga.meja.v1',
  cara: 'sepertiga.cara.v1',
};

// Pilihan yang dipakai ulang di banyak item. `diam: true` = pilihan bawaan yang tidak perlu ditulis di ringkasan.
const SUHU = { id: 'suhu', label: 'Suhu', pilihan: [{ id: 'panas', label: 'Panas', diam: true }, { id: 'dingin', label: 'Dingin' }] };
const SUHU_DINGIN_DULU = { id: 'suhu', label: 'Suhu', pilihan: [{ id: 'dingin', label: 'Dingin', diam: true }, { id: 'panas', label: 'Panas' }] };
const UKURAN = { id: 'ukuran', label: 'Ukuran', pilihan: [{ id: 'reguler', label: 'Reguler 240 ml', diam: true }, { id: 'besar', label: 'Besar 350 ml', tambah: 5000 }] };
const SUSU = { id: 'susu', label: 'Susu', pilihan: [{ id: 'sapi', label: 'Susu sapi segar', diam: true }, { id: 'oat', label: 'Susu oat', tambah: 8000 }] };
const GULA = { id: 'gula', label: 'Gula', pilihan: [{ id: 'normal', label: 'Gula normal', diam: true }, { id: 'sedikit', label: 'Gula sedikit' }, { id: 'tanpa', label: 'Tanpa gula' }] };
const METODE = { id: 'metode', label: 'Metode seduh', pilihan: [{ id: 'v60', label: 'V60', diam: true }, { id: 'kalita', label: 'Kalita Wave' }, { id: 'aeropress', label: 'Aeropress' }] };
const SAJIAN = { id: 'sajian', label: 'Sajian', pilihan: [{ id: 'panas', label: 'Panas', diam: true }, { id: 'flash', label: 'Flash brew (dingin)', tambah: 3000 }] };

export const kategori = [
  { id: 'espresso', nama: 'Espresso Based', ringkas: 'Espresso', catatan: 'House blend Pandan Wangi: 70% Arabika Dampit, 30% Robusta Temanggung. Double shot 18 g, 28 detik.' },
  { id: 'manual', nama: 'Manual Brew', ringkas: 'Manual', catatan: 'Single origin diseduh satu per satu. Rasio 1:15, air 93 °C, sekitar dua setengah menit.' },
  { id: 'susu', nama: 'Kopi Susu & Signature', ringkas: 'Signature', catatan: 'Racikan rumah. Gula aren dari Tulungagung, susu sapi segar atau oat.' },
  { id: 'nonkopi', nama: 'Non-Kopi', ringkas: 'Non-kopi', catatan: 'Untuk yang menghindari kafein atau sekadar ingin yang lain.' },
  { id: 'kudapan', nama: 'Roti & Kudapan', ringkas: 'Kudapan', catatan: 'Dipanggang pagi hari di dapur sebelah. Yang habis, habis.' },
  { id: 'biji', nama: 'Biji Kopi Bawa Pulang', ringkas: 'Biji kopi', catatan: 'Kemasan 200 g, disangrai 3–10 hari sebelum dijual. Bisa digiling sesuai alat seduhmu.' },
];

/**
 * Item menu. kafein: 0 tidak ada, 1 rendah, 2 sedang, 3 tinggi. tag: favorit | baru | nabati.
 * `seduh` = catatan singkat gaya kartu cupping. `habis` = tidak bisa dipesan hari ini.
 */
export const menu = [
  // Espresso based
  { id: 'espresso', kategori: 'espresso', nama: 'Espresso', deskripsi: 'Double shot, rasa cokelat gelap dan karamel, sedikit asam jeruk di akhir.', harga: 18000, kafein: 3, seduh: '18 g → 36 g · 28 dtk', opsi: [] },
  { id: 'americano', kategori: 'espresso', nama: 'Americano', deskripsi: 'Espresso ditambah air panas atau es. Ringan, bersih.', harga: 22000, kafein: 3, seduh: '36 g + 150 ml', opsi: [SUHU, UKURAN] },
  { id: 'cappuccino', kategori: 'espresso', nama: 'Cappuccino', deskripsi: 'Busa susu tebal, taburan kayu manis kalau mau.', harga: 28000, kafein: 2, opsi: [SUHU, UKURAN, SUSU] },
  { id: 'flat-white', kategori: 'espresso', nama: 'Flat White', deskripsi: 'Dua shot dengan susu micro-foam tipis. Lebih kuat dari latte.', harga: 30000, kafein: 3, tag: ['favorit'], opsi: [UKURAN, SUSU] },
  { id: 'latte', kategori: 'espresso', nama: 'Caffè Latte', deskripsi: 'Satu shot, susu banyak, lembut.', harga: 28000, kafein: 2, opsi: [SUHU, UKURAN, SUSU] },
  { id: 'piccolo', kategori: 'espresso', nama: 'Piccolo', deskripsi: 'Ristretto dengan sedikit susu dalam gelas 90 ml.', harga: 24000, kafein: 2, opsi: [SUSU] },
  { id: 'mocha', kategori: 'espresso', nama: 'Mocha', deskripsi: 'Espresso, cokelat Dampit 60%, susu. Tidak terlalu manis.', harga: 32000, kafein: 2, opsi: [SUHU, UKURAN, SUSU, GULA] },

  // Manual brew
  { id: 'gayo-wine', kategori: 'manual', nama: 'Gayo Wine Process', deskripsi: 'Aceh, 1.500 mdpl. Stroberi, anggur hitam, cokelat. Fermentasi panjang, badan tebal.', harga: 32000, kafein: 2, tag: ['favorit'], seduh: '15 g · 1:15 · 93 °C', opsi: [METODE, SAJIAN] },
  { id: 'kintamani', kategori: 'manual', nama: 'Kintamani Natural', deskripsi: 'Bali. Jeruk, cokelat susu, manis seperti gula merah.', harga: 30000, kafein: 2, seduh: '15 g · 1:15 · 92 °C', opsi: [METODE, SAJIAN] },
  { id: 'bajawa', kategori: 'manual', nama: 'Flores Bajawa Washed', deskripsi: 'Bersih dan seimbang. Kacang, karamel, sedikit bunga.', harga: 30000, kafein: 2, seduh: '15 g · 1:15 · 94 °C', opsi: [METODE, SAJIAN] },
  { id: 'toraja', kategori: 'manual', nama: 'Toraja Sapan', deskripsi: 'Sulawesi. Rempah, tembakau manis, badan penuh. Cocok untuk Aeropress.', harga: 30000, kafein: 2, seduh: '15 g · 1:14 · 92 °C', opsi: [METODE, SAJIAN] },
  { id: 'cold-brew', kategori: 'manual', nama: 'Cold Brew 250 ml', deskripsi: 'Rendam 16 jam, disaring dua kali. Manis alami, rendah asam.', harga: 28000, kafein: 3, seduh: '1:8 · 16 jam', opsi: [] },
  { id: 'decaf', kategori: 'manual', nama: 'Decaf Sugarcane Colombia', deskripsi: 'Tanpa kafein lewat proses tebu. Cokelat, kismis. Untuk sore dan malam.', harga: 34000, kafein: 0, seduh: '15 g · 1:15 · 93 °C', opsi: [METODE, SAJIAN] },

  // Kopi susu & signature
  { id: 'kopi-susu', kategori: 'susu', nama: 'Kopi Susu Sepertiga', deskripsi: 'Espresso, susu segar, gula aren Tulungagung. Minuman yang membuat kedai ini ada.', harga: 25000, kafein: 2, tag: ['favorit'], opsi: [SUHU_DINGIN_DULU, UKURAN, SUSU, GULA] },
  { id: 'kopi-pandan', kategori: 'susu', nama: 'Es Kopi Pandan', deskripsi: 'Sirup pandan buatan sendiri, susu, espresso. Wangi dan hijau tipis.', harga: 27000, kafein: 2, tag: ['baru'], opsi: [UKURAN, SUSU, GULA] },
  { id: 'aren-oat', kategori: 'susu', nama: 'Kopi Susu Aren Oat', deskripsi: 'Versi nabati kopi susu kami. Oat, aren, espresso.', harga: 33000, kafein: 2, tag: ['nabati'], opsi: [SUHU_DINGIN_DULU, UKURAN, GULA] },
  { id: 'caramel-sea-salt', kategori: 'susu', nama: 'Caramel Sea Salt Latte', deskripsi: 'Karamel masak sendiri, garam laut Madura, susu, espresso.', harga: 32000, kafein: 2, opsi: [SUHU, UKURAN, SUSU] },
  { id: 'affogato', kategori: 'susu', nama: 'Affogato', deskripsi: 'Satu scoop es krim vanila diguyur espresso panas. Makan cepat.', harga: 34000, kafein: 3, opsi: [] },
  { id: 'dirty-matcha', kategori: 'susu', nama: 'Dirty Matcha', deskripsi: 'Matcha latte dingin dengan satu shot espresso di atasnya.', harga: 33000, kafein: 2, opsi: [UKURAN, SUSU, GULA] },

  // Non-kopi
  { id: 'matcha', kategori: 'nonkopi', nama: 'Matcha Latte', deskripsi: 'Matcha Uji grade seremonial, susu, tanpa sirup.', harga: 30000, kafein: 1, opsi: [SUHU, UKURAN, SUSU, GULA] },
  { id: 'cokelat', kategori: 'nonkopi', nama: 'Cokelat Susu Dampit', deskripsi: 'Cokelat 60% dari Dampit, Malang. Kental, pahit-manis.', harga: 28000, kafein: 1, opsi: [SUHU, UKURAN, SUSU, GULA] },
  { id: 'teh-melati', kategori: 'nonkopi', nama: 'Teh Melati Dingin', deskripsi: 'Teh hijau melati Wonosobo, diseduh dingin 8 jam.', harga: 18000, kafein: 1, opsi: [GULA] },
  { id: 'lemon-jahe', kategori: 'nonkopi', nama: 'Lemon Jahe Hangat', deskripsi: 'Jahe emprit bakar, lemon, madu hutan.', harga: 20000, kafein: 0, opsi: [GULA] },
  { id: 'chamomile', kategori: 'nonkopi', nama: 'Chamomile', deskripsi: 'Bunga chamomile kering, tanpa kafein. Untuk menutup hari.', harga: 22000, kafein: 0, opsi: [] },
  { id: 'air', kategori: 'nonkopi', nama: 'Air Mineral 600 ml', deskripsi: 'Dingin atau suhu ruang.', harga: 8000, kafein: 0, opsi: [SUHU_DINGIN_DULU] },

  // Roti & kudapan
  { id: 'roti-srikaya', kategori: 'kudapan', nama: 'Roti Bakar Srikaya', deskripsi: 'Roti tawar tebal, selai srikaya pandan buatan sendiri, mentega.', harga: 22000, kafein: 0, tag: ['favorit'], opsi: [] },
  { id: 'croissant', kategori: 'kudapan', nama: 'Croissant Mentega', deskripsi: 'Dipanggang pukul 06.30. Renyah di luar, berlapis di dalam.', harga: 24000, kafein: 0, opsi: [] },
  { id: 'banana-bread', kategori: 'kudapan', nama: 'Banana Bread', deskripsi: 'Pisang raja matang, kenari, kayu manis. Satu irisan tebal.', harga: 20000, kafein: 0, opsi: [] },
  { id: 'pisang-goreng', kategori: 'kudapan', nama: 'Pisang Goreng Kayu Manis', deskripsi: 'Tiga potong, gula kayu manis, saus cokelat Dampit.', harga: 18000, kafein: 0, opsi: [] },
  { id: 'cookies', kategori: 'kudapan', nama: 'Cookies Cokelat Garam', deskripsi: 'Satu keping besar, cokelat chunk, garam laut.', harga: 12000, kafein: 0, habis: true, opsi: [] },
  { id: 'sandwich', kategori: 'kudapan', nama: 'Sandwich Telur Daun Bawang', deskripsi: 'Telur orak-arik lembut, daun bawang, mayones, roti sourdough.', harga: 28000, kafein: 0, opsi: [] },

  // Biji kopi
  { id: 'biji-gayo', kategori: 'biji', nama: 'Gayo Wine Process 200 g', deskripsi: 'Stroberi, anggur hitam, cokelat. Sangrai medium-light.', harga: 95000, kafein: 0, tag: ['favorit'], seduh: 'Sangrai 9 Okt 2026', opsi: [{ id: 'giling', label: 'Giling', pilihan: [{ id: 'biji', label: 'Biji utuh', diam: true }, { id: 'kasar', label: 'Giling kasar (French press)' }, { id: 'sedang', label: 'Giling sedang (V60/Kalita)' }, { id: 'halus', label: 'Giling halus (espresso/moka)' }] }] },
  { id: 'biji-blend', kategori: 'biji', nama: 'House Blend Pandan Wangi 200 g', deskripsi: 'Arabika Dampit + Robusta Temanggung. Cokelat, karamel, kuat.', harga: 75000, kafein: 0, seduh: 'Sangrai 11 Okt 2026', opsi: [{ id: 'giling', label: 'Giling', pilihan: [{ id: 'biji', label: 'Biji utuh', diam: true }, { id: 'kasar', label: 'Giling kasar (French press)' }, { id: 'sedang', label: 'Giling sedang (V60/Kalita)' }, { id: 'halus', label: 'Giling halus (espresso/moka)' }] }] },
  { id: 'biji-kintamani', kategori: 'biji', nama: 'Kintamani Natural 200 g', deskripsi: 'Jeruk, cokelat susu, gula merah. Sangrai medium.', harga: 85000, kafein: 0, seduh: 'Sangrai 8 Okt 2026', opsi: [{ id: 'giling', label: 'Giling', pilihan: [{ id: 'biji', label: 'Biji utuh', diam: true }, { id: 'kasar', label: 'Giling kasar (French press)' }, { id: 'sedang', label: 'Giling sedang (V60/Kalita)' }, { id: 'halus', label: 'Giling halus (espresso/moka)' }] }] },
  { id: 'drip-bag', kategori: 'biji', nama: 'Drip Bag isi 5', deskripsi: 'Gayo Wine dalam kantong seduh. Tinggal tuang air panas.', harga: 45000, kafein: 0, tag: ['baru'], opsi: [] },
];

export const faq = [
  { q: 'Bagaimana cara memesan dari menu ini?', a: 'Tambah item ke nampan, lalu tekan "Pesan via WhatsApp". Pesanan tersusun otomatis bersama nomor mejamu dan terkirim ke WhatsApp kedai. Di demo ini WhatsApp terbuka tanpa nomor tujuan.' },
  { q: 'Apakah ada menu tanpa kafein?', a: 'Ada: Decaf Sugarcane Colombia, Lemon Jahe Hangat, Chamomile, dan semua kudapan. Pakai saringan "Tanpa kafein".' },
  { q: 'Bisa pakai susu oat?', a: 'Semua minuman bersusu bisa diganti susu oat dengan tambahan Rp8.000.' },
  { q: 'Apakah biji kopi bisa dikirim?', a: 'Bisa. Pesan lewat WhatsApp dengan pilihan "Bungkus", sebutkan alamatmu, dan kami kirim lewat kurir hari yang sama untuk Malang Raya.' },
];

export const alergen = [
  'Minuman bersusu memakai susu sapi kecuali dipilih oat.',
  'Croissant, roti bakar, banana bread, cookies, dan sandwich mengandung gluten.',
  'Banana bread mengandung kenari. Cookies mengandung kacang-kacangan dari dapur yang sama.',
  'Semua menu tanpa alkohol dan tanpa babi.',
];

export const cariItem = (id) => menu.find((m) => m.id === id);
export const itemKategori = (id) => menu.filter((m) => m.kategori === id);

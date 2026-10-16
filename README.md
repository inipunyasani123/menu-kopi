# Sepertiga Kopi — Menu digital (QR menu)

Demo menu digital untuk kedai kopi: satu halaman ringan yang dibuka dari kode QR di meja. Tamu memindai, memilih, lalu mengirim pesanannya lewat WhatsApp bersama nomor meja. Sepertiga Kopi adalah kedai fiktif.

**Demo live:** https://menu-kopi.pintuweb.id — coba dengan nomor meja: https://menu-kopi.pintuweb.id/?meja=12

> Nama kedai, alamat, biji kopi, dan harga semuanya rekaan. Tidak ada data yang dikirim ke server: nampan dan nomor meja disimpan di `localStorage` browser pengunjung, dan tombol WhatsApp membuka WhatsApp tanpa nomor tujuan.

## Yang diperlihatkan

- **Nomor meja dari QR.** Tautan `?meja=12` dibaca sekali lalu disimpan; lencana meja di header dan pesan WhatsApp ikut menyebutnya. Nomor bisa diketik sendiri di nampan.
- **Kategori dengan scrollspy.** Bilah kategori lengket (ponsel) dan rel vertikal (desktop) menandai bagian yang sedang dibaca.
- **Cari dan saring.** Pencarian nama/deskripsi, saringan Favorit, Bisa dingin, Tanpa kafein; bagian yang kosong disembunyikan.
- **Pilihan per item.** Suhu, ukuran, susu oat (+Rp8.000), gula, metode seduh, flash brew, giling biji; harga tambahan dihitung di lembar pilihan.
- **Nampan ke WhatsApp.** Jumlah per baris, makan di sini/bungkus, atas nama, catatan, lalu pesan tersusun otomatis (`wa.me/?text=`) atau disalin.
- **Jam buka WIB.** Status buka/tutup dihitung di perangkat tamu dalam WIB dan diperbarui tiap menit; jam tutup lewat tengah malam juga ditangani.
- **Kode QR sungguhan.** Dibuat saat build dengan paket `qrcode` sebagai SVG inline; inilah yang dicetak untuk tiap meja.
- **SEO menu.** JSON-LD `CafeOrCoffeeShop` + `Menu` → `MenuSection` → `MenuItem` dengan harga, plus `FAQPage`.

## Identitas visual

- **Huruf:** Fraunces (judul, sumbu SOFT/WONK) dan Instrument Sans (teks), lewat `next/font`.
- **Warna:** kertas krem, susu, kopi gelap, karamel, hijau daun untuk tanpa kafein.
- **Motif:** kartu cupping (rasio, suhu, waktu seduh), titik-titik penuntun ke harga seperti papan menu, tiga titik kadar kafein, noda cincin cangkir di hero, tanda ⅓.

## Struktur

| Berkas | Isi |
| --- | --- |
| `lib/data.js` | Profil kedai, jam buka, kategori, 36 item, FAQ, alergen |
| `lib/format.js` | Rupiah, status buka WIB |
| `lib/nampan.js` | Nampan, nomor meja, cara makan di `localStorage` (`sepertiga.*.v1`) |
| `components/Menu.js` | Cari, saring, daftar per kategori, lembar pilihan |
| `components/Nampan.js` | Bilah lengket, lembar nampan, pesan WhatsApp |
| `components/QR.js` | Kode QR SVG dari `qrcode` |

Satu rute (`/`), halaman 404 bergaya, `sitemap.xml`, `robots.txt`, Open Graph, dan ikon SVG.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000/?meja=12.

---

Dibuat oleh [PintuWeb](https://www.pintuweb.id), jasa pembuatan website.

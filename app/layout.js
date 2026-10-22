import './globals.css';
import localFont from 'next/font/local';
import { site, kategori, menu, itemKategori } from '@/lib/data';

// Fraunces & Instrument Sans (OFL, app/fonts/OFL-*.txt) di-host sendiri dari irisan latin Google Fonts yang sama, dipersempit
// ke variasi yang benar-benar dirender (fontTools varLib.instancer + pyftsubset): versi Google penuh ±294 KB menahan LCP.
// - Fraunces-400: wght 400, SOFT 0, WONK 0, opsz 16–28 (nama kedai, langkah pindai, FAQ, kartu QR)
// - Fraunces-500: wght 500, WONK 1, SOFT 40–60, opsz 16–74 (h1–h3; h3 item memakai SOFT 60)
// - Fraunces-Italic: wght 400, SOFT 100, WONK 1, opsz 44–74, hanya a–z (kata "perlahan" di hero)
// - Instrument Sans: wght 400–600, Latin + Latin-1 (isian tamu ikut tercakup)
// Glyph Fraunces: ASCII + © ° · × è é – — ‘ ’ “ ” …. Bila memakai bobot/variasi/aksara lain, buat ulang subsetnya.
const fraunces = localFont({
  src: [
    { path: './fonts/Fraunces-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Fraunces-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Fraunces-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-fraunces',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});
const instrument = localFont({
  src: [{ path: './fonts/InstrumentSans.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-instrument',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const HARI = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const jam24 = (j) => j.replace('.', ':');

// Restaurant + Menu/MenuSection/MenuItem: struktur menu terbaca mesin pencari (contoh rich result menu).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: site.nama,
  url: site.url,
  description: site.deskripsi,
  servesCuisine: ['Kopi', 'Kudapan'],
  priceRange: 'Rp8.000–Rp95.000',
  address: { '@type': 'PostalAddress', streetAddress: 'Jl. Kenanga No. 3, Lowokwaru', addressLocality: 'Malang', addressRegion: 'Jawa Timur', addressCountry: 'ID' },
  openingHoursSpecification: site.jam.map((j) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: j.hari.map((h) => HARI[h]), opens: jam24(j.buka), closes: jam24(j.tutup) })),
  hasMenu: {
    '@type': 'Menu',
    name: `Menu ${site.nama}`,
    inLanguage: 'id-ID',
    hasMenuSection: kategori.map((k) => ({
      '@type': 'MenuSection',
      name: k.nama,
      description: k.catatan,
      hasMenuItem: itemKategori(k.id).map((m) => ({
        '@type': 'MenuItem',
        name: m.nama,
        description: m.deskripsi,
        offers: { '@type': 'Offer', price: m.harga, priceCurrency: 'IDR', availability: m.habis ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' },
      })),
    })),
  },
};

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.judul, template: `%s — ${site.nama}` },
  description: site.deskripsi,
  applicationName: site.nama,
  keywords: ['menu digital', 'qr menu', 'menu kedai kopi', 'menu kafe', 'demo menu digital'],
  authors: [{ name: 'PintuWeb', url: 'https://www.pintuweb.id' }],
  creator: 'PintuWeb',
  publisher: 'PintuWeb',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: site.url,
    siteName: site.nama,
    title: site.judul,
    description: site.deskripsi,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `Menu digital ${site.nama}: daftar espresso dan manual brew dengan harga` }],
  },
  twitter: { card: 'summary_large_image', title: site.judul, description: site.deskripsi, images: ['/og.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport = { themeColor: '#f7f2e9', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="antialiased">
        <a href="#isi" className="sr-only-fokus fixed left-3 top-3 z-[70] rounded-full bg-kopi px-4 py-2 text-kertas">
          Langsung ke menu
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href={`https://www.pintuweb.id/kontak?demo=${site.slug}`} style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
      </body>
    </html>
  );
}

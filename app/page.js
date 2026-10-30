import { site, faq, alergen, menu } from '@/lib/data';
import { labelHari } from '@/lib/format';
import Tanda from '@/components/Tanda';
import Meja from '@/components/Meja';
import StatusBuka from '@/components/StatusBuka';
import KategoriNav from '@/components/KategoriNav';
import Menu from '@/components/Menu';
import Nampan from '@/components/Nampan';
import QR from '@/components/QR';
import Footer from '@/components/Footer';
import { Pindai, Cangkir, Daun } from '@/components/Ikon';
import FotoMenu from '@/components/FotoMenu';

export const metadata = { alternates: { canonical: '/' } };

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const CONTOH_MEJA = '12';

export default function Halaman() {
  const jumlahMenu = menu.filter((m) => m.kategori !== 'biji').length;
  const tanpaKafein = menu.filter((m) => m.kafein === 0 && m.kategori !== 'biji' && m.kategori !== 'kudapan').length;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-susu bg-kertas/95 backdrop-blur">
        <div className="wadah flex h-14 items-center gap-3">
          <a href="#top" className="flex items-center gap-2.5">
            <Tanda className="h-8 w-8 text-kopi" />
            <span className="whitespace-nowrap font-display text-[1.2rem] leading-none tracking-tight sm:text-[1.35rem]">{site.nama}<span className="sr-only">, ke atas</span></span>
          </a>
          <div className="ms-auto flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:block"><StatusBuka /></span>
            <Meja />
          </div>
        </div>
      </header>

      <main id="top" className="pb-24">
        {/* Hero: kartu cupping */}
        <section className="relative overflow-hidden border-b border-susu">
          <div className="noda -left-20 -top-24 h-72 w-72" aria-hidden="true" />
          <div className="noda right-[-5rem] top-10 h-56 w-56" aria-hidden="true" />
          <div className="noda bottom-[-6rem] left-1/3 h-80 w-80 opacity-70" aria-hidden="true" />
          <div className="wadah relative grid gap-8 py-10 sm:py-14 lg:grid-cols-12 lg:items-end lg:py-16">
            <div className="lg:col-span-7">
              <p className="label-cupping">Menu · edisi {site.edisi}</p>
              <h1 className="mt-3 text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-[4.6rem]">
                Seduh <em className="font-normal italic text-karamel-tua" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>perlahan</em>,
                <br />pilih pelan-pelan.
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-kopi-2">
                {jumlahMenu} pilihan dari mesin espresso, meja seduh manual, dan dapur roti di sebelah. Tandai yang kamu mau, lalu kirim pesanannya dari meja tanpa memanggil siapa pun.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#isi" className="tombol tombol-kopi">Lihat menu</a>
                <span className="sm:hidden"><StatusBuka /></span>
              </div>
              <FotoMenu id="hero" alt="Barista menuang air panas ke corong seduh manual di meja bar" priority sizes="(min-width: 1024px) 640px, 92vw" className="mt-8 aspect-[16/10] w-full rounded-[18px]" />
            </div>

            {/* Kartu cupping minggu ini */}
            <aside className="kartu relative p-5 sm:p-6 lg:col-span-5" aria-labelledby="judul-cupping">
              <div className="flex items-center justify-between">
                <p id="judul-cupping" className="label-cupping">Biji minggu ini</p>
                <Cangkir className="h-5 w-5 text-karamel" />
              </div>
              <FotoMenu id="biji" alt={`Biji kopi sangrai ${site.bijiMingguIni.nama}`} sizes="(min-width: 1024px) 420px, 92vw" className="mt-3 aspect-[4/3] w-full rounded-[12px]" />
              <p className="mt-2 font-display text-[1.7rem] leading-tight">{site.bijiMingguIni.nama}</p>
              <p className="mt-1 text-sm text-kopi-2">Catatan rasa: {site.bijiMingguIni.rasa}.</p>
              <dl className="mt-5 grid grid-cols-3 divide-x divide-susu border-t border-susu pt-4 text-center">
                {[['Rasio', site.rasio.air], ['Air', site.rasio.suhu], ['Waktu', site.rasio.waktu]].map(([k, v]) => (
                  <div key={k} className="px-2">
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-kopi-3">{k}</dt>
                    <dd className="mt-1 font-display text-lg leading-none">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-kopi-3"><Daun className="h-3.5 w-3.5 text-daun" /> {tanpaKafein} minuman tanpa kafein tersedia</p>
            </aside>
          </div>
        </section>

        {/* Pembungkus ini membatasi bilah kategori lengket: berhenti di akhir daftar menu */}
        <div>
        <KategoriNav />

        <div className="wadah lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8 pt-10">
              <KategoriNav vertikal />
              <div className="kartu p-4">
                <p className="label-cupping">Pindai di meja</p>
                <div className="mt-3 flex items-center gap-4">
                  <QR url={`${site.url}/?meja=${CONTOH_MEJA}`} className="h-20 w-20 shrink-0 text-kopi" label={`Kode QR contoh meja ${CONTOH_MEJA}`} />
                  <p className="text-sm leading-snug text-kopi-2">Setiap meja punya QR sendiri; nomor mejanya ikut terbaca saat memesan.</p>
                </div>
              </div>
            </div>
          </aside>
          <Menu />
        </div>
        </div>

        {/* Pindai & pesan */}
        <section id="pindai" aria-labelledby="judul-pindai" className="wadah mt-16">
          <div className="gelap grid gap-8 overflow-hidden rounded-[var(--radius-cawan)] bg-malam px-6 py-8 text-susu sm:px-10 sm:py-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="label-cupping !text-susu-tua">Cara memesan</p>
              <h2 id="judul-pindai" className="mt-3 text-3xl text-kertas sm:text-4xl">Pindai, pilih, kirim. Tanpa antre di kasir.</h2>
              <ol className="mt-6 grid gap-4 text-[0.95rem] sm:grid-cols-3">
                {[
                  ['Pindai QR di meja', 'Tautannya membawa nomor mejamu, jadi barista tahu ke mana mengantar.'],
                  ['Isi nampan', 'Pilih suhu, ukuran, susu, dan gula. Tulis catatan kalau perlu.'],
                  ['Kirim lewat WhatsApp', 'Pesanan tersusun rapi sebagai pesan. Bayar di kasir atau lewat QRIS saat diantar.'],
                ].map(([j, d], i) => (
                  <li key={j} className="border-t border-malam-2 pt-3">
                    <p className="font-display text-lg text-kertas"><span className="text-karamel-terang">{i + 1}.</span> {j}</p>
                    <p className="mt-1 text-sm leading-relaxed text-susu-tua">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-center justify-center lg:col-span-5">
              <div className="rounded-[var(--radius-cawan)] bg-kertas p-5 text-kopi shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between gap-6">
                  <p className="label-cupping">Meja {CONTOH_MEJA}</p>
                  <Pindai className="h-4 w-4 text-karamel" />
                </div>
                <QR url={`${site.url}/?meja=${CONTOH_MEJA}`} className="mt-3 h-44 w-44 text-kopi sm:h-52 sm:w-52" label={`Kode QR contoh untuk meja ${CONTOH_MEJA}`} />
                <p className="mt-3 text-center font-display text-base">{site.nama}</p>
                <p className="text-center text-[12px] text-kopi-3">menu-kopi.pintuweb.id/?meja={CONTOH_MEJA}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Info & FAQ */}
        <section id="info" aria-labelledby="judul-info" className="wadah mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-cupping">Perlu diketahui</p>
            <h2 id="judul-info" className="mt-3 text-3xl sm:text-4xl">Alergen & catatan dapur</h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem] text-kopi-2">
              {alergen.map((a) => (
                <li key={a} className="flex gap-3"><span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-karamel" />{a}</li>
              ))}
            </ul>
            <dl className="mt-6 divide-y divide-susu border-y border-susu text-sm">
              {site.jam.map((j) => (
                <div key={j.buka + j.hari.join()} className="flex justify-between py-2"><dt className="text-kopi-2">{labelHari(j.hari)}</dt><dd className="font-semibold">{j.buka}–{j.tutup} WIB</dd></div>
              ))}
              <div className="flex justify-between gap-6 py-2"><dt className="text-kopi-2">Alamat</dt><dd className="text-end font-semibold">{site.alamat}</dd></div>
            </dl>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl">Yang sering ditanya</h2>
            <div className="mt-5 divide-y divide-susu border-y border-susu">
              {faq.map((f, i) => (
                <details key={f.q} name="faq" open={i === 0} className="group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-display text-[1.15rem] leading-snug [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-susu-tua text-lg leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-4 text-[0.95rem] leading-relaxed text-kopi-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </main>

      <Footer />
      <Nampan />
    </>
  );
}

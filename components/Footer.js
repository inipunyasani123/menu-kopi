import { site } from '@/lib/data';
import { labelHari } from '@/lib/format';
import Tanda from './Tanda';

export default function Footer() {
  return (
    <footer className="gelap mt-16 bg-malam text-susu">
      <div className="wadah grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Tanda className="h-10 w-10 text-kertas" />
            <p className="font-display text-2xl text-kertas">{site.nama}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-susu-tua">{site.tagline} Kedai kopi kecil di {site.kota} yang menyangrai sendiri, menyeduh pelan, dan menulis menunya di halaman ini supaya tidak perlu dicetak ulang tiap bulan.</p>
        </div>
        <div className="text-sm">
          <p className="label-cupping !text-susu-tua">Jam buka</p>
          <ul className="mt-3 space-y-1.5">
            {site.jam.map((j) => (
              <li key={j.buka + j.hari.join()} className="flex justify-between gap-4 border-b border-malam-2 pb-1.5">
                <span>{labelHari(j.hari)}</span>
                <span className="text-kertas">{j.buka}–{j.tutup} WIB</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="label-cupping !text-susu-tua">Alamat</p>
          <p className="mt-3 leading-relaxed">{site.alamat}</p>
          <p className="mt-3 text-susu-tua">Menu edisi {site.edisi}. {site.pajak}</p>
        </div>
      </div>
      <div className="border-t border-malam-2">
        <p className="wadah py-4 text-xs text-susu-tua">© 2026 {site.nama}. Usaha fiktif untuk demo menu digital.</p>
      </div>
    </footer>
  );
}

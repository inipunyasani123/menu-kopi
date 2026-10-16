'use client';

import { useEffect, useRef, useState } from 'react';
import { site, cariItem } from '@/lib/data';
import { rupiah } from '@/lib/format';
import { useNampan, useMeja, useCaraMakan, useTerpasang, hargaBaris, labelPilihan } from '@/lib/nampan';
import { Plus, Minus, Tutup, Nampan as IkonNampan, Salin, Sampah } from './Ikon';

function susunPesan({ baris, total, meja, cara, nama, catatan }) {
  const judul = `Halo ${site.nama}, saya mau pesan.`;
  const dari = `${meja ? `Meja ${meja}` : 'Meja belum diisi'} · ${cara === 'bungkus' ? 'bungkus' : 'makan di sini'}${nama ? ` · atas nama ${nama}` : ''}`;
  const isi = baris.map((b) => {
    const item = cariItem(b.id);
    const pil = labelPilihan(b);
    return `${b.qty}× ${item?.nama ?? b.id}${pil ? ` (${pil})` : ''}${b.catatan ? ` — ${b.catatan}` : ''} — ${rupiah(hargaBaris(b) * b.qty)}`;
  });
  return [judul, dari, '', ...isi, '', `Total ${rupiah(total)}`, catatan ? `Catatan: ${catatan}` : null, '', `Dikirim dari menu digital ${site.nama}`].filter((x) => x !== null).join('\n');
}

export default function Nampan() {
  const ref = useRef(null);
  const terpasang = useTerpasang();
  const { baris, jumlah, total, ubahQty, kosongkan } = useNampan();
  const [meja, setMeja] = useMeja();
  const [cara, setCara] = useCaraMakan();
  const [nama, setNama] = useState('');
  const [catatan, setCatatan] = useState('');
  const [disalin, setDisalin] = useState(false);

  useEffect(() => {
    const buka = () => ref.current && !ref.current.open && ref.current.showModal();
    window.addEventListener('sepertiga:nampan', buka);
    return () => window.removeEventListener('sepertiga:nampan', buka);
  }, []);

  const pesan = susunPesan({ baris, total, meja, cara, nama: nama.trim(), catatan: catatan.trim() });
  const salin = async () => {
    try {
      await navigator.clipboard.writeText(pesan);
      setDisalin(true);
      setTimeout(() => setDisalin(false), 2000);
    } catch {
      /* clipboard diblokir */
    }
  };
  const ada = terpasang && jumlah > 0;

  return (
    <>
      {/* Bilah nampan lengket di bawah */}
      <div className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-transform duration-300 sm:px-6 ${ada ? 'translate-y-0' : 'translate-y-[120%]'}`} aria-hidden={!ada}>
        <button
          type="button"
          onClick={() => ref.current?.showModal()}
          tabIndex={ada ? 0 : -1}
          className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-full bg-kopi px-2 py-2 text-kertas shadow-[0_10px_30px_rgba(29,19,15,0.35)]"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-karamel text-white"><IkonNampan className="h-5 w-5" /></span>
            <span className="text-left text-sm leading-tight">
              <span className="block font-semibold">{jumlah} item di nampan</span>
              <span className="block text-susu-tua">{meja ? `Meja ${meja}` : 'Nomor meja belum diisi'}</span>
            </span>
          </span>
          <span className="flex items-center gap-3 pe-3 font-semibold">{rupiah(total)}<span className="text-susu-tua">Lihat</span></span>
        </button>
      </div>

      <dialog ref={ref} className="lembar" aria-labelledby="judul-nampan">
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-center justify-between border-b border-susu px-5 pb-4 pt-5">
            <div>
              <p className="label-cupping">Nampan</p>
              <h2 id="judul-nampan" className="mt-0.5 text-2xl">{jumlah ? `${jumlah} item · ${rupiah(total)}` : 'Nampan kosong'}</h2>
            </div>
            <button type="button" onClick={() => ref.current?.close()} className="grid h-10 w-10 place-items-center rounded-full border-1.5 border-susu-tua" aria-label="Tutup nampan"><Tutup className="h-5 w-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {baris.length ? (
              <ul className="divide-y divide-susu">
                {baris.map((b) => {
                  const item = cariItem(b.id);
                  const pil = labelPilihan(b);
                  return (
                    <li key={b.kunci + (b.catatan || '')} className="flex items-start gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[1.05rem] leading-tight">{item?.nama}</p>
                        {pil && <p className="mt-0.5 text-sm text-kopi-2">{pil}</p>}
                        {b.catatan && <p className="mt-0.5 text-sm italic text-kopi-3">“{b.catatan}”</p>}
                        <p className="mt-1 text-sm font-semibold">{rupiah(hargaBaris(b) * b.qty)}</p>
                      </div>
                      <div className="inline-flex items-center rounded-full border-1.5 border-susu-tua bg-white" role="group" aria-label={`Jumlah ${item?.nama}`}>
                        <button type="button" onClick={() => ubahQty(b.kunci, b.catatan, b.qty - 1)} className="grid h-9 w-9 place-items-center rounded-full" aria-label="Kurangi">{b.qty === 1 ? <Sampah className="h-4 w-4" /> : <Minus className="h-4 w-4" />}</button>
                        <span className="w-5 text-center text-sm font-semibold">{b.qty}</span>
                        <button type="button" onClick={() => ubahQty(b.kunci, b.catatan, b.qty + 1)} className="grid h-9 w-9 place-items-center rounded-full" aria-label="Tambah"><Plus className="h-4 w-4" /></button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-6 text-center text-kopi-2">Belum ada pesanan. Tekan tombol + di menu untuk mulai.</p>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="label-cupping mb-1.5 block">Nomor meja</span>
                <input value={meja} onChange={(e) => setMeja(e.target.value.replace(/[^0-9A-Za-z-]/g, '').toUpperCase())} inputMode="numeric" maxLength={6} placeholder="Tertulis di stiker QR" className="w-full rounded-[10px] border-1.5 border-susu bg-white px-3.5 py-2.5 text-[0.95rem] placeholder:text-kopi-3" />
              </label>
              <label className="block">
                <span className="label-cupping mb-1.5 block">Atas nama</span>
                <input value={nama} onChange={(e) => setNama(e.target.value)} maxLength={30} placeholder="Opsional" className="w-full rounded-[10px] border-1.5 border-susu bg-white px-3.5 py-2.5 text-[0.95rem] placeholder:text-kopi-3" />
              </label>
            </div>
            <div className="mt-3" role="radiogroup" aria-label="Cara makan">
              <span className="label-cupping mb-1.5 block">Cara makan</span>
              <div className="grid grid-cols-2 gap-2">
                {[['sini', 'Makan di sini'], ['bungkus', 'Bungkus']].map(([id, label]) => (
                  <button key={id} type="button" role="radio" aria-checked={cara === id} onClick={() => setCara(id)} className="chip justify-center">{label}</button>
                ))}
              </div>
            </div>
            <label className="mt-3 block">
              <span className="label-cupping mb-1.5 block">Catatan umum</span>
              <input value={catatan} onChange={(e) => setCatatan(e.target.value)} maxLength={100} placeholder="Mis. sajikan bersamaan" className="w-full rounded-[10px] border-1.5 border-susu bg-white px-3.5 py-2.5 text-[0.95rem] placeholder:text-kopi-3" />
            </label>
            <p className="mt-4 text-xs leading-relaxed text-kopi-3">Di demo ini WhatsApp terbuka tanpa nomor tujuan. Saat dipasang untuk kedai sungguhan, pesanan langsung masuk ke nomor WhatsApp kasir.</p>
          </div>

          <div className="border-t border-susu bg-krem px-5 py-4">
            <div className="flex gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(pesan)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!baris.length}
                onClick={(e) => !baris.length && e.preventDefault()}
                className={`tombol tombol-kopi min-h-12 flex-1 ${baris.length ? '' : 'pointer-events-none opacity-50'}`}
              >
                Pesan via WhatsApp
              </a>
              <button type="button" onClick={salin} disabled={!baris.length} className="tombol tombol-garis min-h-12 px-3.5 disabled:opacity-50" aria-label="Salin teks pesanan">
                <Salin className="h-5 w-5" />
                <span className="sr-only sm:not-sr-only">{disalin ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
            {baris.length > 0 && (
              <button type="button" onClick={kosongkan} className="mt-3 w-full text-center text-sm font-medium text-kopi-3 underline-offset-4 hover:underline">Kosongkan nampan</button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

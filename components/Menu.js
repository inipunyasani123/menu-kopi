'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { kategori, menu } from '@/lib/data';
import { rupiah } from '@/lib/format';
import { useNampan } from '@/lib/nampan';
import { Plus, Minus, Cari, Tutup, Centang } from './Ikon';
import FotoMenu from './FotoMenu';

const SARING = [
  { id: 'favorit', label: 'Favorit', uji: (m) => m.tag?.includes('favorit') },
  { id: 'dingin', label: 'Bisa dingin', uji: (m) => m.opsi?.some((o) => o.id === 'suhu' || o.id === 'sajian') || ['cold-brew', 'teh-melati', 'dirty-matcha', 'kopi-pandan'].includes(m.id) },
  { id: 'tanpa-kafein', label: 'Tanpa kafein', uji: (m) => m.kafein === 0 && m.kategori !== 'biji' },
];

const LABEL_KAFEIN = ['Tanpa kafein', 'Kafein rendah', 'Kafein sedang', 'Kafein tinggi'];

function Kafein({ n }) {
  return (
    <span className="inline-flex items-center gap-[3px]" title={LABEL_KAFEIN[n]}>
      <span className="sr-only">{LABEL_KAFEIN[n]}</span>
      {[1, 2, 3].map((i) => (
        <span key={i} aria-hidden="true" className={`h-[7px] w-[7px] rounded-full ${i <= n ? 'bg-kopi' : 'border border-susu-tua'}`} />
      ))}
    </span>
  );
}

function Tag({ t }) {
  const gaya = { favorit: 'bg-karamel-tua text-white', baru: 'bg-daun text-white', nabati: 'bg-daun-muda text-daun' };
  const teks = { favorit: 'Favorit', baru: 'Baru', nabati: 'Nabati' };
  return <span className={`rounded-full px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide ${gaya[t]}`}>{teks[t]}</span>;
}

function Baris({ m, onPilih }) {
  const bisaDingin = m.opsi?.some((o) => o.id === 'suhu' || o.id === 'sajian');
  return (
    <li className="group relative py-4">
      <div className="flex items-start gap-3">
        <FotoMenu id={m.id} sizes="80px" className={`h-[4.5rem] w-[4.5rem] shrink-0 rounded-[14px] sm:h-20 sm:w-20 ${m.habis ? 'opacity-50 grayscale' : ''}`} />
        <div className="min-w-0 flex-1">
          <div className="baris-harga">
            <h3 className={`font-display text-[1.15rem] leading-tight ${m.habis ? 'text-kopi-3' : 'text-kopi'}`} style={{ fontVariationSettings: '"SOFT" 60, "WONK" 1' }}>{m.nama}</h3>
            <span className={`titik ${m.habis ? 'opacity-50' : ''}`} aria-hidden="true" />
            <span className={`shrink-0 text-[0.98rem] font-semibold ${m.habis ? 'text-kopi-3 line-through decoration-1' : ''}`}>{rupiah(m.harga)}</span>
          </div>
          <p className={`mt-1 pe-10 text-[0.92rem] leading-snug ${m.habis ? 'text-kopi-3' : 'text-kopi-2'}`}>{m.deskripsi}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-kopi-3">
            {m.kategori !== 'biji' && <Kafein n={m.kafein} />}
            {m.seduh && <span className="font-medium tracking-wide">{m.seduh}</span>}
            {bisaDingin && <span>Panas / dingin</span>}
            {m.tag?.map((t) => <Tag key={t} t={t} />)}
            {m.habis && <span className="font-semibold text-awas">Habis hari ini</span>}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onPilih(m)}
          disabled={m.habis}
          aria-label={m.habis ? `${m.nama} habis` : `Tambah ${m.nama}${m.opsi?.length ? ', pilih opsi' : ''}`}
          className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border-1.5 border-susu-tua text-kopi transition hover:border-kopi hover:bg-kopi hover:text-kertas disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-susu-tua disabled:hover:bg-transparent disabled:hover:text-kopi"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}

/** Lembar pilihan: opsi (suhu, ukuran, susu, gula), catatan, jumlah, lalu tambah ke nampan. */
function LembarPilihan({ item, onTutup, onTambah }) {
  const ref = useRef(null);
  const [pilihan, setPilihan] = useState({});
  const [qty, setQty] = useState(1);
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (!item) return;
    const awal = {};
    for (const o of item.opsi || []) awal[o.id] = o.pilihan[0].id;
    setPilihan(awal);
    setQty(1);
    setCatatan('');
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, [item]);

  if (!item) return null;
  const tambahan = (item.opsi || []).reduce((n, o) => n + (o.pilihan.find((p) => p.id === pilihan[o.id])?.tambah || 0), 0);
  const harga = (item.harga + tambahan) * qty;

  return (
    <dialog ref={ref} className="lembar" onClose={onTutup} aria-labelledby="judul-pilihan">
      <form
        method="dialog"
        className="flex max-h-[92dvh] flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          onTambah(item, pilihan, qty, catatan.trim());
          ref.current?.close();
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-susu px-5 pt-5 pb-4">
          <FotoMenu id={item.id} sizes="80px" className="h-20 w-20 shrink-0 rounded-[14px]" />
          <div className="min-w-0 flex-1">
            <p className="label-cupping">{kategori.find((k) => k.id === item.kategori)?.nama}</p>
            <h2 id="judul-pilihan" className="mt-1 text-2xl">{item.nama}</h2>
            <p className="mt-1.5 text-sm text-kopi-2">{item.deskripsi}</p>
          </div>
          <button type="button" onClick={() => ref.current?.close()} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-1.5 border-susu-tua" aria-label="Tutup">
            <Tutup className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {(item.opsi || []).map((o) => (
            <fieldset key={o.id} className="mb-5">
              <legend className="label-cupping mb-2">{o.label}</legend>
              <div className="grid gap-2" role="radiogroup" aria-label={o.label}>
                {o.pilihan.map((p) => {
                  const on = pilihan[o.id] === p.id;
                  return (
                    <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => setPilihan((s) => ({ ...s, [o.id]: p.id }))} className="pil-opsi">
                      <span className="flex items-center gap-2.5">
                        <span className={`grid h-5 w-5 place-items-center rounded-full border-1.5 ${on ? 'border-kopi bg-kopi text-kertas' : 'border-susu-tua'}`} aria-hidden="true">{on && <Centang className="h-3.5 w-3.5" strokeWidth={2.5} />}</span>
                        {p.label}
                      </span>
                      {p.tambah ? <span className="text-sm text-kopi-2">+{rupiah(p.tambah)}</span> : null}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
          <label className="block">
            <span className="label-cupping mb-2 block">Catatan untuk barista</span>
            <input value={catatan} onChange={(e) => setCatatan(e.target.value)} maxLength={80} placeholder="Mis. es sedikit, tanpa kayu manis" className="w-full rounded-[10px] border-1.5 border-susu bg-white px-3.5 py-2.5 text-[0.95rem] placeholder:text-kopi-3" />
          </label>
        </div>

        <div className="flex items-center gap-3 border-t border-susu bg-krem px-5 py-4">
          <div className="inline-flex items-center rounded-full border-1.5 border-susu-tua bg-white" role="group" aria-label="Jumlah">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center rounded-full" aria-label="Kurangi"><Minus className="h-4 w-4" /></button>
            <span className="w-6 text-center font-semibold" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid h-11 w-11 place-items-center rounded-full" aria-label="Tambah"><Plus className="h-4 w-4" /></button>
          </div>
          <button type="submit" className="tombol tombol-kopi min-h-11 flex-1 justify-between px-5">
            <span>Tambah ke nampan</span>
            <span>{rupiah(harga)}</span>
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default function Menu() {
  const [cari, setCari] = useState('');
  const [saring, setSaring] = useState(null);
  const [dipilih, setDipilih] = useState(null);
  const [toast, setToast] = useState('');
  const { tambah } = useNampan();

  const q = cari.trim().toLowerCase();
  const lolos = useMemo(() => {
    const uji = saring ? SARING.find((s) => s.id === saring).uji : () => true;
    return menu.filter((m) => uji(m) && (!q || `${m.nama} ${m.deskripsi}`.toLowerCase().includes(q)));
  }, [q, saring]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const pilih = (m) => {
    if (m.opsi?.length) setDipilih(m);
    else {
      tambah(m.id, {}, 1, '');
      setToast(`${m.nama} masuk nampan`);
    }
  };
  const tambahDariLembar = (item, pilihan, qty, catatan) => {
    tambah(item.id, pilihan, qty, catatan);
    setToast(`${qty}× ${item.nama} masuk nampan`);
  };

  const adaSaring = q || saring;

  return (
    <section id="isi" aria-labelledby="judul-menu" className="min-w-0 scroll-mt-28">
      <h2 id="judul-menu" className="sr-only">Daftar menu</h2>
      {/* Cari & saring */}
      <div className="sticky top-[6.6rem] z-20 -mx-4 bg-kertas/95 px-4 pb-3 pt-2 backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:pt-0">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Cari menu</span>
            <Cari className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-kopi-3" />
            <input type="search" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari: latte, pandan, tanpa kafein…" className="w-full rounded-full border-1.5 border-susu bg-white py-2.5 pl-10 pr-4 text-[0.95rem] placeholder:text-kopi-3 focus:border-kopi focus:outline-none" />
          </label>
          <div className="sembunyi-gulir flex gap-2 overflow-x-auto" role="group" aria-label="Saring">
            {SARING.map((s) => (
              <button key={s.id} type="button" aria-pressed={saring === s.id} onClick={() => setSaring(saring === s.id ? null : s.id)} className="chip">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {adaSaring && (
        <p className="mt-3 text-sm text-kopi-2" role="status">
          {lolos.length ? `${lolos.length} item cocok` : 'Tidak ada yang cocok.'}{' '}
          <button type="button" onClick={() => { setCari(''); setSaring(null); }} className="font-semibold text-karamel-tua underline underline-offset-4">Tampilkan semua</button>
        </p>
      )}

      {kategori.map((k) => {
        const daftar = lolos.filter((m) => m.kategori === k.id);
        if (adaSaring && !daftar.length) return null;
        return (
          <section key={k.id} id={`k-${k.id}`} data-kategori className="scroll-mt-[7.5rem] pt-8 lg:scroll-mt-24" aria-labelledby={`judul-${k.id}`}>
            <div className="border-b-2 border-kopi pb-3">
              <h2 id={`judul-${k.id}`} className="text-[1.9rem] sm:text-[2.2rem]">{k.nama}</h2>
              <p className="mt-1.5 max-w-2xl text-[0.92rem] text-kopi-2">{k.catatan}</p>
            </div>
            <ul className="divide-y divide-susu">
              {daftar.map((m) => <Baris key={m.id} m={m} onPilih={pilih} />)}
            </ul>
          </section>
        );
      })}

      <LembarPilihan item={dipilih} onTutup={() => setDipilih(null)} onTambah={tambahDariLembar} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
        {toast && <p className="muncul rounded-full bg-kopi px-4 py-2 text-sm font-medium text-kertas shadow-lg">{toast}</p>}
      </div>
    </section>
  );
}

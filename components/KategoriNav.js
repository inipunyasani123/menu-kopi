'use client';

import { useEffect, useRef, useState } from 'react';
import { kategori } from '@/lib/data';

/**
 * Navigasi kategori dengan scrollspy: bagian menu yang sedang terlihat ditandai. Versi mendatar lengket di bawah
 * header pada ponsel; versi vertikal untuk sisi kiri di layar lebar.
 */
export default function KategoriNav({ vertikal = false }) {
  const [aktif, setAktif] = useState(kategori[0].id);
  const wadah = useRef(null);

  useEffect(() => {
    const bagian = kategori.map((k) => document.getElementById(`k-${k.id}`)).filter(Boolean);
    if (!bagian.length) return;
    const terlihat = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) terlihat.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // kategori paling atas yang terlihat
        const pertama = bagian.find((b) => (terlihat.get(b.id) || 0) > 0);
        if (pertama) setAktif(pertama.id.slice(2));
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    );
    bagian.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (vertikal) return;
    const el = wadah.current?.querySelector(`[data-id="${aktif}"]`);
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [aktif, vertikal]);

  if (vertikal) {
    return (
      <nav aria-label="Kategori menu">
        <p className="label-cupping mb-3">Kategori</p>
        <ul className="space-y-0.5 border-s border-susu">
          {kategori.map((k) => {
            const on = k.id === aktif;
            return (
              <li key={k.id}>
                <a
                  href={`#k-${k.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={`-ms-px flex items-center border-s-2 py-1.5 ps-4 text-[0.95rem] transition ${on ? 'border-kopi font-semibold text-kopi' : 'border-transparent text-kopi-2 hover:border-susu-tua hover:text-kopi'}`}
                >
                  {k.nama}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Kategori menu" className="sticky top-14 z-30 border-b border-susu bg-kertas/95 backdrop-blur lg:hidden">
      <ul ref={wadah} className="sembunyi-gulir flex gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
        {kategori.map((k) => (
          <li key={k.id} className="shrink-0">
            <a href={`#k-${k.id}`} data-id={k.id} aria-current={k.id === aktif ? 'true' : undefined} className="chip">
              {k.ringkas}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

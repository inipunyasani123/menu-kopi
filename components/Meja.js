'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMeja, useTerpasang } from '@/lib/nampan';
import { Meja as IkonMeja } from './Ikon';

/** Membaca ?meja= dari tautan QR dan menyimpannya; dibungkus Suspense karena useSearchParams. */
function BacaTautan() {
  const params = useSearchParams();
  const [, setMeja] = useMeja();
  useEffect(() => {
    const m = params.get('meja');
    if (m && /^[0-9A-Za-z-]{1,6}$/.test(m)) setMeja(m.toUpperCase());
  }, [params, setMeja]);
  return null;
}

export const bukaNampan = () => window.dispatchEvent(new CustomEvent('sepertiga:nampan'));

/** Lencana nomor meja di header. Menekannya membuka nampan, tempat nomor meja bisa diubah. */
export default function Meja({ className = '' }) {
  const [meja] = useMeja();
  const terpasang = useTerpasang();
  const ada = terpasang && meja;
  return (
    <>
      <Suspense fallback={null}>
        <BacaTautan />
      </Suspense>
      <button
        type="button"
        onClick={bukaNampan}
        className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-1.5 px-3 text-sm font-semibold transition ${ada ? 'border-kopi bg-kopi text-kertas' : 'border-susu-tua text-kopi-2 hover:border-kopi'} ${className}`}
        aria-label={ada ? `Meja ${meja}, buka nampan untuk mengubah` : 'Isi nomor meja'}
      >
        <IkonMeja className="h-4 w-4" />
        {ada ? `Meja ${meja}` : 'Nomor meja'}
      </button>
    </>
  );
}

import Link from 'next/link';
import Tanda from '@/components/Tanda';

export const metadata = { title: 'Halaman tidak ditemukan', robots: { index: false, follow: true }, alternates: { canonical: null } };

export default function TidakDitemukan() {
  return (
    <main id="isi" className="wadah flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      <Tanda className="h-16 w-16 text-kopi" />
      <p className="label-cupping mt-8">404 · cangkir kosong</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">Halaman ini belum diseduh</h1>
      <p className="mt-4 max-w-md text-kopi-2">Alamat yang kamu buka tidak ada di menu. Menu lengkap ada di halaman utama, lengkap dengan nomor mejamu.</p>
      <Link href="/" className="tombol tombol-kopi mt-8">Kembali ke menu</Link>
    </main>
  );
}

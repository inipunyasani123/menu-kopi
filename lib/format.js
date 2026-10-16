// Format Rupiah dan jam buka dalam WIB (Asia/Jakarta). Tidak ada waktu lokal perangkat yang dipakai mentah.
const angka = new Intl.NumberFormat('id-ID');

export function rupiah(n) {
  return `Rp${angka.format(Math.round(n || 0))}`;
}

// Menit sejak 00.00 WIB dan hari dalam minggu (0 = Minggu) untuk waktu tertentu.
export function sekarangWIB(ms = Date.now()) {
  const d = new Date(ms + 7 * 3600 * 1000);
  return { hari: d.getUTCDay(), menit: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

const keMenit = (jam) => {
  const [h, m] = jam.split('.').map(Number);
  return h * 60 + (m || 0);
};

/**
 * Status buka dari daftar jam `[{ hari: [1,2,3,4,5], buka: '07.00', tutup: '21.00' }]`.
 * Jam tutup lewat tengah malam (mis. 16.00–01.00) ditangani: sesi kemarin masih dihitung sampai jam tutupnya.
 */
export function statusBuka(jadwal, ms = Date.now()) {
  const { hari, menit } = sekarangWIB(ms);
  const sesi = (h) => jadwal.find((j) => j.hari.includes(h));
  const ini = sesi(hari);
  if (ini) {
    const b = keMenit(ini.buka);
    const t = keMenit(ini.tutup);
    if (t > b) {
      if (menit >= b && menit < t) return { buka: true, sampai: ini.tutup };
      if (menit < b) return { buka: false, mulai: ini.buka, hariIni: true };
    } else {
      // melewati tengah malam
      if (menit >= b) return { buka: true, sampai: ini.tutup };
    }
  }
  const kemarin = sesi((hari + 6) % 7);
  if (kemarin && keMenit(kemarin.tutup) < keMenit(kemarin.buka) && menit < keMenit(kemarin.tutup)) {
    return { buka: true, sampai: kemarin.tutup };
  }
  // cari sesi berikutnya
  for (let i = ini ? 1 : 0; i <= 7; i++) {
    const h = (hari + i) % 7;
    const s = sesi(h);
    if (s && !(i === 0 && menit >= keMenit(s.buka))) return { buka: false, mulai: s.buka, hariIni: i === 0, hariBerikut: i === 1 ? 'besok' : NAMA_HARI[h] };
  }
  return { buka: false };
}

export const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// "Sen–Jum" untuk [1,2,3,4,5]; "Sab & Min" untuk [6,0].
export function labelHari(hari) {
  const pendek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const urut = [...hari].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  if (urut.length === 1) return pendek[urut[0]];
  const beruntun = urut.every((h, i) => i === 0 || (h + 6) % 7 === ((urut[i - 1] + 6) % 7) + 1);
  if (beruntun && urut.length > 2) return `${pendek[urut[0]]}–${pendek[urut[urut.length - 1]]}`;
  return urut.map((h) => pendek[h]).join(' & ');
}

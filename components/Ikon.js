const dasar = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Svg = ({ children, className = '', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...dasar} {...p}>{children}</svg>
);

export const Plus = (p) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>;
export const Minus = (p) => <Svg {...p}><path d="M5 12h14" /></Svg>;
export const Tutup = (p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const Cari = (p) => <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>;
export const Centang = (p) => <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>;
export const Panah = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const Nampan = (p) => <Svg {...p}><path d="M3 15h18M5 15l1.2 4h11.6L19 15M8 15V9a4 4 0 0 1 8 0v6" /></Svg>;
export const Sampah = (p) => <Svg {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></Svg>;
export const Salin = (p) => <Svg {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></Svg>;
export const Pindai = (p) => <Svg {...p}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16" /></Svg>;
export const Meja = (p) => <Svg {...p}><path d="M3 8h18M6 8v10M18 8v10M6 13h12" /></Svg>;
export const Jam = (p) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>;
export const Daun = (p) => <Svg {...p}><path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14Z" /><path d="M5 19 13 11" /></Svg>;
export const Cangkir = (p) => <Svg {...p}><path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8ZM16 10h2a2.5 2.5 0 0 1 0 5h-2M8 3v2M12 3v2" /></Svg>;

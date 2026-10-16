/** Tanda kedai: lingkaran kopi dengan pecahan sepertiga. */
export default function Tanda({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="currentColor" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="var(--color-karamel)" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="32" y="41" textAnchor="middle" fontFamily="var(--font-display)" fontSize="26" fill="var(--color-kertas)">⅓</text>
    </svg>
  );
}

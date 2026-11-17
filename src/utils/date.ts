export function formatDateVN(isoDate: string): string {
  if (!isoDate || !isoDate.includes('-')) return isoDate;
  const [y, m, d] = isoDate.split('T')[0].split('-');
  if (!y || !m || !d) return isoDate;
  return `${d}/${m}/${y}`;
}

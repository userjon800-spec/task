export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  if (diffSec < 60) return `hozirgina`;
  if (diffMin < 60) return `${diffMin} minut oldin`;
  if (diffHour < 24) return `${diffHour} soat oldin`;
  if (diffDay === 1) return `kecha`;
  if (diffDay < 30) return `${diffDay} kun oldin`;
  if (diffMonth < 12) return `${diffMonth} oy oldin`;
  return `${diffYear} yil oldin`;
}
export function getTimeParts(diffMs: number) {
  const totalSec = Math.max(Math.floor(diffMs / 1000), 0);

  return {
    days: Math.floor(totalSec / (24 * 3600)),
    hours: Math.floor((totalSec % (24 * 3600)) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: Math.floor(totalSec % 60),
  };
}

export function formatTwo(value: number): string {
  return String(value).padStart(2, "0");
}

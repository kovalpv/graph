export default function nextId(m: number[]): number {
  if (!m.length) return 1;
  return Math.max(...m) + 1;
}

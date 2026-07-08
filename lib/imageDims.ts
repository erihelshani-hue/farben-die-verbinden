// Liest Breite/Höhe aus einer Sanity-Asset-Referenz, z. B.
// "image-<hash>-1170x1513-jpg" → { width: 1170, height: 1513 }.
// So können Bilder im natürlichen Seitenverhältnis (ohne Beschnitt)
// gerendert werden, ohne einen zweiten API-Request für Metadaten.
export function dimsFromRef(ref?: string): { width: number; height: number } | null {
  const m = ref?.match(/-(\d+)x(\d+)-/);
  if (!m) return null;
  return { width: Number(m[1]), height: Number(m[2]) };
}

export function aspectFromRef(ref: string | undefined, fallback: string): string {
  const d = dimsFromRef(ref);
  return d ? `${d.width} / ${d.height}` : fallback;
}

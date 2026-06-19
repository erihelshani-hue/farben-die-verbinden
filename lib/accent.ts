// Akzentfarbe pro Werk aus der Markenpalette „Atelier Reshani".
// Ersetzt die frühere Kategorie-Färbung: Jedes Werk bekommt anhand seines
// Slugs deterministisch eine der vier Signaturfarben — so bleibt die Galerie
// farbig und lebendig, ohne den Werken eine (oft unpassende) Kategorie
// aufzuzwingen.
const PALETTE = [
  "#2B3FBF", // Ultramarin
  "#C03A78", // Krapp
  "#2E6B4F", // Tanne
  "#E9A820", // Sonne
];

export function accentFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

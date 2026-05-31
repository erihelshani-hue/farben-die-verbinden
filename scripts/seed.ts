/**
 * Seed-Skript: legt 13 Beispiel-Werke + die Singleton-Inhalte
 * (Ausstellung, Künstlerin, Website-Einstellungen) an.
 *
 * Ausführen (nutzt deine Sanity-Login-Sitzung, kein Token nötig):
 *
 *   npx sanity@latest exec scripts/seed.ts --with-user-token
 *
 * Die Platzhalterbilder kommen von picsum.photos und können später im
 * Studio einfach durch echte Werk-Fotos ersetzt werden.
 * Das Skript ist idempotent: erneutes Ausführen überschreibt, dupliziert nicht.
 */

import { getCliClient } from "sanity/cli";

const client = getCliClient();

interface SeedArtwork {
  title: string;
  category: "baeume-natur" | "abstrakt" | "maritim" | "tiere";
  technique: "Acryl" | "Aquarell" | "Öl" | "Mischtechnik";
  dimensions: string;
  year: number;
  description: string;
  featured?: boolean;
}

const artworks: SeedArtwork[] = [
  // Bäume & Natur (6)
  { title: "Lebensbaum im Morgenlicht", category: "baeume-natur", technique: "Acryl", dimensions: "80 × 60 cm", year: 2023, description: "Ein leuchtender Baum, dessen Äste sich wie offene Hände dem Licht entgegenstrecken.", featured: true },
  { title: "Herbstwald in Flammen", category: "baeume-natur", technique: "Öl", dimensions: "100 × 70 cm", year: 2022, description: "Warme Rot- und Orangetöne verschmelzen zu einem Wald voller Energie." },
  { title: "Wurzeln der Hoffnung", category: "baeume-natur", technique: "Mischtechnik", dimensions: "70 × 50 cm", year: 2024, description: "Die Verbindung von Erde und Himmel, eingefangen in kräftigen Farbschichten.", featured: true },
  { title: "Blühende Wiese", category: "baeume-natur", technique: "Acryl", dimensions: "90 × 60 cm", year: 2023, description: "Ein Meer aus Blüten, jede Farbe ein eigener kleiner Moment des Glücks." },
  { title: "Stiller Birkenhain", category: "baeume-natur", technique: "Aquarell", dimensions: "50 × 40 cm", year: 2021, description: "Zarte Birken in kühlem Licht — Ruhe und Klarheit." },
  { title: "Sonnenuntergang über dem Tal", category: "baeume-natur", technique: "Öl", dimensions: "120 × 80 cm", year: 2024, description: "Ein Tal, das im letzten Licht des Tages in Gold getaucht wird." },

  // Abstrakt (4)
  { title: "Farben die verbinden", category: "abstrakt", technique: "Acryl", dimensions: "100 × 100 cm", year: 2024, description: "Das Herzstück der Ausstellung — Farben, die ineinanderfließen und eins werden.", featured: true },
  { title: "Tanz der Emotionen", category: "abstrakt", technique: "Mischtechnik", dimensions: "80 × 80 cm", year: 2023, description: "Bewegung und Gefühl, festgehalten in spontanen Farbgesten." },
  { title: "Innere Landschaft", category: "abstrakt", technique: "Acryl", dimensions: "70 × 90 cm", year: 2022, description: "Eine Reise nach innen, erzählt in Schichten aus Blau und Magenta." },
  { title: "Vielfalt", category: "abstrakt", technique: "Mischtechnik", dimensions: "90 × 90 cm", year: 2024, description: "Viele einzelne Farbflächen, die zusammen ein harmonisches Ganzes bilden." },

  // Maritim (2)
  { title: "Segel im Wind", category: "maritim", technique: "Öl", dimensions: "100 × 70 cm", year: 2023, description: "Ein Segelboot auf bewegter See, getragen von Freiheit und Weite.", featured: true },
  { title: "Hafen bei Abenddämmerung", category: "maritim", technique: "Acryl", dimensions: "80 × 60 cm", year: 2022, description: "Stille Boote im warmen Licht eines ruhigen Abends am Wasser." },

  // Tiere (1)
  { title: "Pferd in Bewegung", category: "tiere", technique: "Öl", dimensions: "110 × 80 cm", year: 2024, description: "Die Kraft und Anmut eines galoppierenden Pferdes in lebendigen Farben." },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadPlaceholder(seed: string, filename: string): Promise<string> {
  const res = await fetch(`https://picsum.photos/seed/${seed}/1200/900`);
  if (!res.ok) throw new Error(`Bild-Download fehlgeschlagen für ${seed}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

async function run() {
  console.log("→ Singletons anlegen …");

  await client.createOrReplace({
    _id: "exhibitionInfo",
    _type: "exhibitionInfo",
    titel: "Farben die verbinden",
    einleitungstext:
      "Abstrakte und expressionistische Gemälde von Vjollca Reshani. Jedes Bild erzählt eine Geschichte aus Farben, Emotionen und Kreativität.",
    story:
      "In dieser Ausstellung begegnen sich Bäume, Wasser und Licht — verwandelt durch Farbe in etwas Universelles. Jedes Werk lädt dazu ein, innezuhalten und zu fühlen, was Worte oft nicht ausdrücken können.",
    botschaft:
      "Farben kennen keine Grenzen. Jede Farbe ist einzigartig und schön. Zusammen entstehen Bilder voller Leben, Hoffnung und Energie. Meine Kunst soll Menschen verbinden und zeigen, dass Vielfalt unsere Stärke ist.",
  });

  const artistPhoto = await uploadPlaceholder("vjollca-portrait", "vjollca.jpg");
  await client.createOrReplace({
    _id: "artist",
    _type: "artist",
    name: "Vjollca Reshani",
    photo: { _type: "image", asset: { _type: "reference", _ref: artistPhoto } },
    statement:
      "Meine Kunst zeigt, dass jede Farbe ihren Platz hat. Gemeinsam erschaffen Farben Harmonie, Vielfalt und Schönheit – so wie die Menschen auf unserer Welt.",
    bio: [
      {
        _type: "block",
        _key: "bio1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "bio1s",
            text:
              "Vjollca Reshani malt seit vielen Jahren und hat eine unverwechselbare Bildsprache entwickelt, in der Natur, Licht und intensive Farben miteinander in Dialog treten.",
          },
        ],
      },
    ],
    exhibitionTitle: "Farben die verbinden",
  });

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    kontaktEmail: "kontakt@farben-die-verbinden.de",
    socialLinks: [],
  });

  console.log("→ 13 Werke anlegen (inkl. Bild-Upload) …");
  let order = 1;
  for (const art of artworks) {
    const slug = slugify(art.title);
    const assetId = await uploadPlaceholder(slug, `${slug}.jpg`);
    await client.createOrReplace({
      _id: `artwork-${slug}`,
      _type: "artwork",
      title: art.title,
      slug: { _type: "slug", current: slug },
      image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
      category: art.category,
      technique: art.technique,
      dimensions: art.dimensions,
      year: art.year,
      description: art.description,
      featured: art.featured ?? false,
      order: order++,
    });
    console.log(`   ✓ ${art.title}`);
  }

  console.log("\n✅ Fertig — 13 Werke und alle Texte wurden angelegt.");
}

run().catch((err) => {
  console.error("❌ Seed fehlgeschlagen:", err);
  process.exit(1);
});

/**
 * Seed-Skript: legt 13 echte Werke + Singleton-Inhalte an.
 * Bilder kommen aus dem lokalen Ordner /Kunstwerke/.
 *
 * Ausführen:
 *   npx sanity@latest exec scripts/seed.ts --with-user-token
 *
 * Das Skript ist idempotent: erneutes Ausführen überschreibt, dupliziert nicht.
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

// Token aus .env.local laden
const envPath = path.join(process.cwd(), ".env.local");
const envVars: Record<string, string> = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf-8").split("\n").forEach((line) => {
    const [k, ...v] = line.split("=");
    if (k && v.length) envVars[k.trim()] = v.join("=").trim();
  });
}

const client = createClient({
  projectId: envVars["NEXT_PUBLIC_SANITY_PROJECT_ID"] ?? "im5ett58",
  dataset:   envVars["NEXT_PUBLIC_SANITY_DATASET"]    ?? "production",
  apiVersion: "2024-01-01",
  token:     envVars["SANITY_API_TOKEN"],
  useCdn:    false,
});

interface SeedArtwork {
  title: string;
  localFile: string;          // Dateiname im Ordner Kunstwerke/
  category: "baeume-natur" | "abstrakt" | "maritim" | "tiere";
  technique: "Acryl" | "Aquarell" | "Öl" | "Mischtechnik";
  dimensions: string;
  year: number;
  description: string;
  featured?: boolean;
}

const artworks: SeedArtwork[] = [
  // ── Bäume & Natur (4) ─────────────────────────────────────
  {
    title: "Lebensbaum",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (12).jpeg",
    category: "baeume-natur", technique: "Acryl", dimensions: "80 × 80 cm", year: 2023,
    description: "Ein expressiver Baum voller Lebensfreude — Rot, Gelb und Blau wirbeln in der Krone wie tanzende Flammen. Auf leuchtendem Blau und Gold wächst er in alle Richtungen: grenzenlos.",
    featured: true,
  },
  {
    title: "Blühende Wiese",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (15).jpeg",
    category: "baeume-natur", technique: "Acryl", dimensions: "90 × 60 cm", year: 2023,
    description: "Weiße Margeriten leuchten aus einem Meer aus Grün und Türkis — ein Moment sommerlicher Stille, in dem jede Blüte ihre eigene Geschichte erzählt.",
  },
  {
    title: "Herbstleuchten",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (19).jpeg",
    category: "baeume-natur", technique: "Öl", dimensions: "120 × 80 cm", year: 2022,
    description: "Bäume spiegeln sich in stiller Wasserfläche, während der Himmel in flammendem Rot und Ocker glüht — ein letzter, großartiger Blick auf den scheidenden Tag.",
  },
  {
    title: "Baum der Nacht",
    localFile: "WhatsApp Image 2026-05-31 at 15.12.06.jpeg",
    category: "baeume-natur", technique: "Acryl", dimensions: "60 × 80 cm", year: 2024,
    description: "Goldene Äste breiten sich über schwarzen Grund aus, die Krone geschmückt mit pinken und gelben Blüten, die wie kleine Lichter in der Dunkelheit leuchten.",
  },

  // ── Abstrakt (5) ─────────────────────────────────────────
  {
    title: "Farben die verbinden",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (16).jpeg",
    category: "abstrakt", technique: "Acryl", dimensions: "100 × 100 cm", year: 2024,
    description: "Das Herzstück der Ausstellung — Farben fließen ineinander, stoßen aufeinander, verbinden sich. Ein Sog aus Blau, Magenta und Gelb, der den Betrachter mitten hineinzieht.",
    featured: true,
  },
  {
    title: "Naturgeist",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (17).jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "80 × 120 cm", year: 2023,
    description: "Ein Gesicht, das aus dem Kosmos erwächst, die Haare als Äste — die Grenze zwischen Mensch und Natur löst sich auf in einem farbenfrohen Tanz aus Gelb, Rot und Blau.",
  },
  {
    title: "Früchte des Lebens",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (21).jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "50 × 50 cm", year: 2023,
    description: "Zwei Früchte explodieren in einem Feuerwerk aus Gelb, Pink und Schwarz auf türkisem Grund — ein Fest der Sinne, das Natur und pure Lebensfreude feiert.",
  },
  {
    title: "Frühlingserwachen",
    localFile: "WhatsApp Image 2026-05-31 at 14.48.01.jpeg",
    category: "abstrakt", technique: "Acryl", dimensions: "120 × 60 cm", year: 2024,
    description: "Kirschblüten in Pink, Blau und Violett umarmen eine goldene Stadtsilhouette — ein Traum, in dem Natur und Metropole in vollkommener Harmonie verschmelzen.",
    featured: true,
  },
  {
    title: "La Belle",
    localFile: "WhatsApp Image 2026-05-31 at 15.40.36.jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "80 × 100 cm", year: 2024,
    description: "Eine Frau im großen lila Hut, geschmückt mit üppigen dreidimensionalen Blüten in den Farben der Welt — Eleganz und Farbenfreude in einem einzigen Bild.",
  },

  // ── Maritim (3) ───────────────────────────────────────────
  {
    title: "Regatta",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (13).jpeg",
    category: "maritim", technique: "Acryl", dimensions: "100 × 50 cm", year: 2023,
    description: "Eine Flotte bunter Segelboote auf blau-violettem Wasser — Segel in Rot, Grün, Weiß und Gelb tanzen über die Wellen in einem Fest aus Bewegung und Farbe.",
  },
  {
    title: "Segel im Abendrot",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (22).jpeg",
    category: "maritim", technique: "Öl", dimensions: "100 × 70 cm", year: 2022,
    description: "Fünf Segelboote mit farbigen Segeln vor einem dramatischen Abendhimmel — Magenta, Rot, Weiß und Violett spiegeln sich im tiefen Blau des Meeres.",
    featured: true,
  },
  {
    title: "Tiefsee",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (18).jpeg",
    category: "maritim", technique: "Öl", dimensions: "140 × 100 cm", year: 2024,
    description: "Ein leuchtendes Unterwasserparadies — goldene Fische schwärmen durch tiefes Grün und Blau, rund um einen leuchtenden Kern aus Gold und Orange.",
  },

  // ── Tiere (1) ─────────────────────────────────────────────
  {
    title: "Schwarzes Pferd",
    localFile: "WhatsApp Image 2026-05-31 at 13.47.21 (20).jpeg",
    category: "tiere", technique: "Öl", dimensions: "110 × 160 cm", year: 2024,
    description: "Ein schwarzes Pferd in voller Würde — die Mähne fließt, das Auge leuchtet golden. Der strukturierte Hintergrund aus Kupfer und Violett verleiht dem Tier eine fast mythische Präsenz.",
    featured: true,
  },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const KUNSTWERKE_DIR = path.join(process.cwd(), "Kunstwerke");

async function uploadLocalImage(filename: string, label: string): Promise<string> {
  const filepath = path.join(KUNSTWERKE_DIR, filename);
  if (!fs.existsSync(filepath)) {
    throw new Error(`Datei nicht gefunden: ${filepath}`);
  }
  const buffer = fs.readFileSync(filepath);
  const asset = await client.assets.upload("image", buffer, {
    filename: `${slugify(label)}.jpg`,
    contentType: "image/jpeg",
  });
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

  await client.createOrReplace({
    _id: "artist",
    _type: "artist",
    name: "Vjollca Reshani",
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
            text: "Vjollca Reshani malt seit vielen Jahren und hat eine unverwechselbare Bildsprache entwickelt, in der Natur, Licht und intensive Farben miteinander in Dialog treten.",
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

  console.log(`\n→ ${artworks.length} Werke anlegen (echte Bilder aus /Kunstwerke/) …`);
  let order = 1;
  for (const art of artworks) {
    const slug = slugify(art.title);
    console.log(`   Lade hoch: ${art.title} …`);
    const assetId = await uploadLocalImage(art.localFile, art.title);
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

  console.log("\n✅ Fertig — 13 echte Werke und alle Texte wurden angelegt.");
}

run().catch((err) => {
  console.error("❌ Seed fehlgeschlagen:", err);
  process.exit(1);
});

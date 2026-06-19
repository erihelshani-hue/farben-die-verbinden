/**
 * Seed-Skript: legt die 9 offiziellen Werke + Singleton-Inhalte an.
 * Bilder kommen aus dem lokalen Ordner /Kunstwerke/.
 *
 * Ausführen:
 *   npx sanity@latest exec scripts/seed.ts --with-user-token
 *
 * Das Skript ist idempotent: erneutes Ausführen überschreibt, dupliziert nicht.
 * ACHTUNG: legt nur die hier definierten Werke neu an — alte Werke vorher
 * über das Studio oder die API löschen.
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
  {
    title: "Farben die verbinden",
    localFile: "kosmische-wirbel.jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "Diptychon · 2 × 60 × 80 cm", year: 2026,
    description:
      "Dieses einzigartige Diptychon bietet zwei verschiedene Präsentationsmöglichkeiten. Die beiden Leinwände können klassisch nebeneinander aufgehängt werden und bilden einen harmonischen, geschlossenen Farbwirbel. Alternativ können sie versetzt angeordnet werden, wodurch eine moderne und dynamische Wirkung entsteht. So passt sich das Kunstwerk individuell an unterschiedliche Räume und Einrichtungsstile an.",
    featured: true,
  },
  {
    title: "Zwischen Himmel und Tiefe",
    localFile: "zwischen-himmel-und-tiefe.jpeg",
    category: "baeume-natur", technique: "Acryl", dimensions: "Diptychon · 2 × 40 × 50 cm", year: 2026,
    description:
      "Dieses Werk bewegt sich zwischen Traum und Wirklichkeit. Die leuchtenden Blau-, Rosa- und Türkistöne verbinden die Weite des Himmels mit der geheimnisvollen Tiefe des Wassers. Die sanft schwingenden Pflanzenformen symbolisieren Wachstum, Freiheit und die Verbundenheit mit der Natur.",
    featured: true,
  },
  {
    title: "Frucht der Emotionen",
    localFile: "frucht-der-emotionen.jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "50 × 40 cm", year: 2026,
    description:
      "Leuchtende Farben, lebendige Strukturen und kraftvolle Kontraste fangen die Energie tropischer Früchte ein. Die plastisch gestalteten Formen treten aus der Leinwand hervor und verbinden sich mit dynamischen Farbspritzern zu einer Komposition voller Lebensfreude und Exotik. Das Werk lädt den Betrachter ein, die Wärme, Frische und Farbenpracht tropischer Früchte zu erleben.",
  },
  {
    title: "Wurzeln des Lebens",
    localFile: "wurzeln-des-lebens.jpeg",
    category: "baeume-natur", technique: "Mischtechnik", dimensions: "Triptychon · 3 × 40 × 40 cm", year: 2026,
    description:
      "Drei Bäume, drei Persönlichkeiten, drei Lebenswege. Der farbenreiche Lebensbaum in der Mitte symbolisiert Stärke, Wachstum und Zusammenhalt. Die beiden seitlichen Bäume werden von seiner Kraft angezogen und suchen die Verbindung zu ihm. Das Werk erzählt von Gemeinschaft, von Jung und Alt, von Vielfalt und dem Wunsch, trotz aller Unterschiede miteinander verbunden zu sein. Es erinnert daran, dass unsere Wurzeln uns tragen und unsere Beziehungen uns wachsen lassen.",
    featured: true,
  },
  {
    title: "Geheimnis in Violett",
    localFile: "geheimnis-in-violett.jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "80 × 100 cm", year: 2026,
    description:
      "Das Werk beschäftigt sich mit der Idee, dass das Wertvollste eines Menschen oft nicht auf den ersten Blick sichtbar ist. Hinter der äußeren Erscheinung verbirgt sich eine innere Welt voller Erfahrungen, Gefühle und Möglichkeiten. Die leuchtenden Farben verleihen dieser inneren Kraft Ausdruck und stehen im Kontrast zur zurückhaltenden Darstellung der Figur.",
  },
  {
    title: "Der Blick des Pferdes",
    localFile: "der-blick-des-pferdes.jpeg",
    category: "tiere", technique: "Öl", dimensions: "110 × 160 cm", year: 2026,
    description:
      "Nicht nur Menschen können porträtiert werden – auch Tiere. Besonders Pferde besitzen eine eigene Persönlichkeit, Ausstrahlung und Würde. Sie begleiten den Menschen seit Jahrhunderten und nehmen oft einen besonderen Platz in seinem Leben ein. Mit diesem Porträt möchte ich zeigen, dass auch Tiere als individuelle Wesen wahrgenommen und wertgeschätzt werden können.",
    featured: true,
  },
  {
    title: "Aus Gold geboren, im Schatten leben",
    localFile: "aus-gold-geboren.jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "80 × 120 cm", year: 2026,
    description:
      "Ein Porträt über Wachstum, Erinnerungen und die Spuren des Lebens. Die Farben spiegeln unterschiedliche Gefühle wider, während die dunkle Brille Schutz und Rückzug symbolisiert. Die goldenen Äste stehen für Herkunft, Stärke und Verbundenheit.",
  },
  {
    title: "Segel zum Licht",
    localFile: "segel-zum-licht.jpeg",
    category: "maritim", technique: "Öl", dimensions: "100 × 70 cm", year: 2026,
    description:
      "Durch die ausdrucksstarke Struktur und die sichtbaren Spuren des Farbauftrags entsteht Bewegung, die Wind, Wellen und die Energie des Augenblicks spürbar macht. Der Himmel verbindet kühle und warme Farbtöne und symbolisiert den Übergang zwischen Ruhe und Kraft, zwischen Aufbruch und Ankunft.",
    featured: true,
  },
  {
    title: "Frankfurt in Blüte",
    localFile: "frankfurt-in-bluete.jpeg",
    category: "abstrakt", technique: "Mischtechnik", dimensions: "120 × 60 cm", year: 2026,
    description:
      "Dieses Werk zeigt Frankfurt als Symbol für Vielfalt, Zusammenhalt und friedliches Miteinander. Die bunten Blüten stehen für die vielen Kulturen und Menschen, die gemeinsam die Stadt prägen. Trotz ihrer Unterschiede bilden sie zusammen eine harmonische Einheit.",
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

// Hilfsfunktion: Text mit Absätzen → Portable-Text-Blöcke
function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    children: [{ _type: "span", _key: `b${i}s`, text }],
  }));
}

async function run() {
  console.log("→ Singletons anlegen …");

  await client.createOrReplace({
    _id: "exhibitionInfo",
    _type: "exhibitionInfo",
    titel: "Farben die verbinden",
    einleitungstext:
      "Willkommen auf meiner Kunstseite. Hier präsentiere ich meine abstrakten und expressionistischen Gemälde. Jedes Bild erzählt eine eigene Geschichte aus Farben, Emotionen und Kreativität. Mit meiner Kunst möchte ich zeigen, dass Vielfalt etwas Schönes ist und dass jede Farbe zum großen Ganzen beiträgt.",
    story:
      "Ich lade Sie herzlich zu meiner Ausstellung ein. Die Ausstellung findet in der Schweizer Straße 5 in Sachsenhausen, Frankfurt am Main statt. Gezeigt werden über 30 meiner Bilder, die einen Einblick in mein aktuelles künstlerisches Projekt geben. Ich freue mich sehr über Ihren Besuch und darauf, meine Arbeiten persönlich mit Ihnen zu teilen.",
    botschaft:
      "Farben kennen keine Grenzen. Jede Farbe ist einzigartig und schön. Zusammen entstehen Bilder voller Leben, Hoffnung und Energie. Meine Kunst soll Menschen verbinden und zeigen, dass Vielfalt unsere Stärke ist.",
    datum: "27. Juni 2026",
    ort: "Sachsenhausen · Frankfurt",
    adresse: "Schweizer Straße 5, 60594 Frankfurt am Main",
  });

  const artistPhotoId = await uploadLocalImage("vjollca-portrait.jpeg", "Vjollca Reshani Portrait");
  await client.createOrReplace({
    _id: "artist",
    _type: "artist",
    name: "Vjollca Reshani",
    photo: { _type: "image", asset: { _type: "reference", _ref: artistPhotoId } },
    statement:
      "Meine Kunst zeigt, dass jede Farbe ihren Platz hat. Gemeinsam erschaffen Farben Harmonie, Vielfalt und Schönheit – so wie die Menschen auf unserer Welt.",
    bio: toBlocks([
      "Beruflich arbeite ich als Erzieherin. Durch meine Arbeit mit Kindern konnte ich viele Erfahrungen im kreativen Gestalten und im Umgang mit künstlerischen Ausdrucksformen sammeln.",
      "Um meine eigenen künstlerischen Fähigkeiten weiterzuentwickeln, habe ich außerdem ein Fernstudium bei der Studiengemeinschaft Darmstadt (SGD) absolviert. Der Lehrgang „Kunstwerkstatt – Professionell Malen“ ermöglichte es mir, verschiedene Maltechniken kennenzulernen und meine kreative Arbeitsweise weiterzuentwickeln.",
      "Während des Malens höre ich klassische Musik. Die Musik hilft mir, mich zu konzentrieren und in einen kreativen Zustand zu kommen. Durch die Klänge entstehen in meiner Vorstellung neue Gedanken, Stimmungen und Bilder.",
      "Meine Werke sind meist nicht von Anfang an vollständig geplant. Während ich male und der Musik zuhöre, entwickeln sich die Bilder Schritt für Schritt. Farben, Formen und Kompositionen verändern sich im Laufe des Arbeitsprozesses und führen oft zu neuen Ideen.",
      "Besonders interessant finde ich die Verbindung zwischen Musik, Fantasie und Malerei. Die Musik beeinflusst meine Wahrnehmung und unterstützt meinen kreativen Prozess. Dadurch entstehen Bildwelten, die sich während des Malens immer weiter entfalten.",
    ]),
    exhibitionTitle: "Farben die verbinden",
  });

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    kontaktEmail: "v.reshani@web.de",
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

  console.log(`\n✅ Fertig — ${artworks.length} Werke und alle Texte wurden angelegt.`);
}

run().catch((err) => {
  console.error("❌ Seed fehlgeschlagen:", err);
  process.exit(1);
});

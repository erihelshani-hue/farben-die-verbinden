import Link from "next/link";
import Image from "next/image";
import {
  getFeaturedArtworks,
  getArtist,
  getExhibitionInfo,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ArtworkCard from "@/components/ArtworkCard";
import FadeIn from "@/components/FadeIn";

export const revalidate = 3600;

// Platzhalter-Texte (greifen, solange in Sanity noch nichts gepflegt ist).
const FALLBACK = {
  titel: "Farben die verbinden",
  einleitung:
    "Abstrakte und expressionistische Gemälde von Vjollca Reshani. Jedes Bild erzählt eine Geschichte aus Farben, Emotionen und Kreativität.",
  story:
    "In dieser Ausstellung begegnen sich Bäume, Wasser und Licht — verwandelt durch Farbe in etwas Universelles. Jedes Werk lädt dazu ein, innezuhalten und zu fühlen, was Worte oft nicht ausdrücken können.",
  botschaft:
    "Farben kennen keine Grenzen. Jede Farbe ist einzigartig und schön. Zusammen entstehen Bilder voller Leben, Hoffnung und Energie. Meine Kunst soll Menschen verbinden und zeigen, dass Vielfalt unsere Stärke ist.",
};

export default async function HomePage() {
  const [featured, artist, exhibition] = await Promise.all([
    getFeaturedArtworks(),
    getArtist(),
    getExhibitionInfo(),
  ]);

  const titel = exhibition?.titel ?? FALLBACK.titel;
  const einleitung = exhibition?.einleitungstext ?? FALLBACK.einleitung;
  const story = exhibition?.story ?? FALLBACK.story;
  const botschaft = exhibition?.botschaft ?? FALLBACK.botschaft;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#FAF7F2] to-[#D87436]/10" />
        <FadeIn className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
          <p className="text-[#D87436] text-sm font-medium tracking-widest uppercase mb-6">
            Kunstausstellung
          </p>
          <h1 className="font-headline text-5xl md:text-7xl font-semibold text-[#211E1A] leading-tight mb-6">
            {titel}
          </h1>
          <p className="text-lg md:text-xl text-[#211E1A]/70 max-w-2xl mx-auto leading-relaxed mb-10">
            {einleitung}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/galerie"
              className="px-8 py-4 bg-[#D87436] hover:bg-[#c4672d] text-white font-medium rounded-lg transition-colors"
            >
              Zur Ausstellung
            </Link>
            <Link
              href="/kontakt"
              className="px-8 py-4 border border-[#211E1A]/20 hover:border-[#D87436] text-[#211E1A] font-medium rounded-lg transition-colors"
            >
              Anfrage stellen
            </Link>
          </div>
        </FadeIn>

        {/* Dekorativer Farbbalken */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex" aria-hidden="true">
          <div className="flex-1 bg-[#D87436]" />
          <div className="flex-1 bg-[#1B589F]" />
          <div className="flex-1 bg-[#36B0D8]" />
          <div className="flex-1 bg-[#D8365E]" />
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <FadeIn>
          <h2 className="font-headline text-3xl md:text-4xl text-[#211E1A] mb-6">
            Über die Ausstellung
          </h2>
          <p className="text-lg text-[#211E1A]/70 leading-relaxed">{story}</p>
        </FadeIn>
      </section>

      {/* Highlight-Werke */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <FadeIn className="flex items-end justify-between mb-10">
            <h2 className="font-headline text-3xl text-[#211E1A]">
              Ausgewählte Werke
            </h2>
            <Link
              href="/galerie"
              className="text-[#D87436] hover:underline text-sm font-medium whitespace-nowrap"
            >
              Alle Werke →
            </Link>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((artwork, i) => (
              <FadeIn key={artwork._id} delay={i * 0.08}>
                <ArtworkCard artwork={artwork} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Botschaft */}
      <section className="bg-[#1A1815] text-[#FAF7F2] py-24 mt-24">
        <FadeIn className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#D87436] text-sm font-medium tracking-widest uppercase mb-6">
            Die Botschaft
          </p>
          <blockquote className="font-headline text-2xl md:text-3xl leading-relaxed">
            „{botschaft}"
          </blockquote>
        </FadeIn>
      </section>

      {/* Künstlerin-Teaser */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {artist?.photo ? (
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={urlFor(artist.photo).width(800).height(1067).fit("crop").url()}
                alt={`Porträt von ${artist.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[#D87436]/15 via-[#36B0D8]/10 to-[#1B589F]/15" />
          )}
          <div>
            <p className="text-[#D87436] text-sm font-medium tracking-widest uppercase mb-4">
              Die Künstlerin
            </p>
            <h2 className="font-headline text-3xl md:text-4xl text-[#211E1A] mb-6">
              {artist?.name ?? "Vjollca Reshani"}
            </h2>
            <p className="text-[#211E1A]/70 leading-relaxed mb-8">
              {artist?.statement ??
                "Meine Kunst zeigt, dass jede Farbe ihren Platz hat. Gemeinsam erschaffen Farben Harmonie, Vielfalt und Schönheit – so wie die Menschen auf unserer Welt."}
            </p>
            <Link
              href="/kuenstlerin"
              className="inline-block px-8 py-3 border border-[#211E1A]/20 hover:border-[#D87436] text-[#211E1A] font-medium rounded-lg transition-colors"
            >
              Mehr über Vjollca
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

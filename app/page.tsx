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
import Hero from "@/components/Hero";

export const revalidate = 3600;

// Platzhalter-Texte, solange in Sanity noch nichts gepflegt ist.
const FALLBACK = {
  einleitung:
    "Abstrakte und expressionistische Gemälde von Vjollca Reshani. Jedes Bild erzählt eine Geschichte aus Farben, Emotionen und Kreativität.",
  statement:
    "Farben kennen keine Grenzen. Zusammen entstehen Bilder voller Leben, Hoffnung und Energie.",
  bio:
    "Vjollca Reshani malt seit über einem Jahrzehnt und hat eine unverwechselbare Bildsprache entwickelt, in der Natur, Licht und intensive Farben miteinander in Dialog treten.",
};

export default async function HomePage() {
  const [featured, artist, exhibition] = await Promise.all([
    getFeaturedArtworks(),
    getArtist(),
    getExhibitionInfo(),
  ]);

  const heroImage = featured[0]?.image
    ? urlFor(featured[0].image).width(2000).height(2400).fit("crop").url()
    : artist?.photo
      ? urlFor(artist.photo).width(2000).height(2400).fit("crop").url()
      : undefined;

  const statement = artist?.statement ?? FALLBACK.statement;
  const intro = exhibition?.einleitungstext ?? FALLBACK.einleitung;

  return (
    <>
      <Hero
        label="Kunstausstellung · 2025"
        title="Farben die verbinden"
        subtitle="Vjollca Reshani"
        imageUrl={heroImage}
      />

      {/* Statement / Story */}
      <section className="px-6 py-28 md:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="font-serif italic font-light text-3xl md:text-4xl leading-[1.4] text-ink">
              „{statement}"
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-10 text-lg font-light leading-relaxed text-stone">
              {intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Ausgewählte Werke */}
      {featured.length > 0 && (
        <section className="px-6 lg:px-10 pb-28 md:pb-40">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <h2 className="text-[11px] font-light uppercase tracking-[0.3em] text-accent">
                Ausgewählte Werke
              </h2>
              <Link
                href="/galerie"
                className="text-[13px] font-light uppercase tracking-[0.1em] text-ink/70 hover:text-accent transition-colors"
              >
                Alle Werke ansehen →
              </Link>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {featured.slice(0, 6).map((artwork, i) => (
                <FadeIn key={artwork._id} delay={i * 0.08}>
                  <ArtworkCard artwork={artwork} priority={i < 3} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Über die Künstlerin — Teaser */}
      <section className="px-6 lg:px-10 pb-28 md:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">
          <FadeIn from="left" className="md:col-span-3">
            {artist?.photo ? (
              <div className="relative aspect-[4/3] overflow-hidden shadow-[0_10px_40px_rgba(26,23,20,0.12)]">
                <Image
                  src={urlFor(artist.photo)
                    .width(1400)
                    .height(1050)
                    .fit("crop")
                    .url()}
                  alt={`Porträt von ${artist.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover [filter:grayscale(100%)_sepia(18%)]"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-line" />
            )}
          </FadeIn>
          <FadeIn from="right" className="md:col-span-2">
            <p className="text-[11px] font-light uppercase tracking-[0.3em] text-accent mb-5">
              Die Künstlerin
            </p>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-ink mb-6">
              {artist?.name ?? "Vjollca Reshani"}
            </h2>
            <p className="text-base font-light leading-relaxed text-stone mb-8">
              {FALLBACK.bio}
            </p>
            <Link
              href="/kuenstlerin"
              className="inline-block text-[13px] font-light uppercase tracking-[0.1em] text-ink border-b border-accent pb-1 hover:text-accent transition-colors"
            >
              Mehr erfahren →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink px-6 py-28 md:py-36">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-light text-4xl md:text-5xl text-white mb-6">
            Interesse an einem Werk?
          </h2>
          <p className="text-base font-light text-white/60 mb-10">
            Kontaktieren Sie uns für Anfragen und Ausstellungsinformationen.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-10 py-4 bg-accent text-white font-light uppercase tracking-[0.15em] text-[13px] hover:bg-[#b5612f] transition-colors"
          >
            Anfrage stellen
          </Link>
        </FadeIn>
      </section>
    </>
  );
}

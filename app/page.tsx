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

const FALLBACK = {
  einleitung:
    "Abstrakte und expressionistische Gemälde von Vjollca Reshani. Jedes Bild erzählt eine Geschichte aus Farben, Emotionen und Kreativität.",
  statement:
    "Farben kennen keine Grenzen. Zusammen entstehen Bilder voller Leben, Hoffnung und Energie.",
  bio: "Erzieherin und Malerin aus Frankfurt. Ihre Bilder entstehen beim Hören klassischer Musik — Schritt für Schritt aus Farbe, Fantasie und Gefühl.",
};

export default async function HomePage() {
  const [featured, artist, exhibition] = await Promise.all([
    getFeaturedArtworks(),
    getArtist(),
    getExhibitionInfo(),
  ]);

  // Hero-Hintergrund: das zentrale Werk „Farben die verbinden"
  const heroImage = featured[0]?.image
    ? urlFor(featured[0].image).width(2000).height(1400).fit("crop").url()
    : "/ausstellung/saal-golddecke.jpeg";

  const intro = exhibition?.einleitungstext ?? FALLBACK.einleitung;
  const datum = exhibition?.datum ?? "27. Juni 2026";

  return (
    <>
      <Hero
        label="Kunstausstellung 2026"
        subtitle="Vjollca Reshani"
        datum={exhibition?.datum ?? "27. Juni 2026"}
        ort={exhibition?.ort ?? "Sachsenhausen · Frankfurt"}
        imageUrl={heroImage}
      />

      {/* ── Manifest ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-14 py-24 md:py-36">
        <FadeIn className="max-w-4xl ml-auto">
          <blockquote
            className="leading-[1.2]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              letterSpacing: "-0.015em",
            }}
          >
            „Farben kennen{" "}
            <mark style={{ background: "var(--color-ultramarin)", color: "var(--color-canvas)", padding: "0 0.1em", boxDecorationBreak: "clone" }}>
              keine Grenzen
            </mark>
            . Jede Farbe ist einzigartig und schön. Zusammen entstehen Bilder voller{" "}
            <mark style={{ background: "var(--color-sonne)", color: "var(--color-ink)", padding: "0 0.1em", boxDecorationBreak: "clone" }}>
              Leben, Hoffnung und Energie
            </mark>
            . Meine Kunst soll Menschen verbinden und zeigen, dass{" "}
            <mark style={{ background: "var(--color-accent)", color: "var(--color-canvas)", padding: "0 0.1em", boxDecorationBreak: "clone" }}>
              Vielfalt unsere Stärke ist
            </mark>
            ."
          </blockquote>
          <figcaption className="mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-stone">
            — {artist?.name ?? "Vjollca Reshani"}, Botschaft der Ausstellung
          </figcaption>
        </FadeIn>

        <FadeIn delay={0.1} className="max-w-xl mt-10">
          <p className="text-base leading-relaxed text-stone">{intro}</p>
        </FadeIn>
      </section>

      {/* ── Ausgewählte Werke ──────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="px-6 lg:px-14 pb-24 md:pb-36">
          <FadeIn>
            <div className="section-head">
              <h2>Ausgewählte Werke</h2>
              <Link
                href="/galerie"
                className="ml-auto text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-stone hover:text-ink transition-colors"
              >
                Alle Werke →
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.slice(0, 6).map((artwork, i) => (
              <FadeIn key={artwork._id} delay={i * 0.07}>
                <ArtworkCard artwork={artwork} priority={i < 3} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ── Künstlerin Teaser ──────────────────────────────────── */}
      <section className="px-6 lg:px-14 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">
          <FadeIn from="left" className="md:col-span-3">
            {artist?.photo ? (
              <div
                className="relative aspect-[4/3] overflow-hidden border-[2.5px] border-ink"
                style={{ boxShadow: "8px 8px 0 var(--color-ink)" }}
              >
                <Image
                  src={urlFor(artist.photo).width(1400).height(1050).fit("crop").url()}
                  alt={`Porträt von ${artist.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-line border-[2.5px] border-ink" />
            )}
          </FadeIn>
          <FadeIn from="right" className="md:col-span-2">
            <div
              className="h-[3px] w-12 mb-6"
              style={{ background: "linear-gradient(90deg, var(--color-tanne) 0 25%, var(--color-accent) 25% 50%, var(--color-ultramarin) 50% 75%, var(--color-sonne) 75%)" }}
            />
            <h2
              className="text-4xl md:text-5xl text-ink mb-6 uppercase"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
            >
              {artist?.name ?? "Vjollca Reshani"}
            </h2>
            <p className="text-base leading-relaxed text-stone mb-8">{FALLBACK.bio}</p>
            <Link
              href="/kuenstlerin"
              className="inline-block text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink border-b-[2.5px] border-ink pb-1 hover:border-accent hover:text-accent transition-colors"
            >
              Mehr erfahren →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Ausstellung Teaser ─────────────────────────────────── */}
      <section className="px-6 lg:px-14 pb-24 md:pb-36">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="section-head">
              <h2>Rückblick</h2>
              <span className="ml-auto text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-stone">
                {datum} · Frankfurt
              </span>
            </div>
          </FadeIn>

          {/* Rückblick-Teaser mit Foto */}
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 border-[2.5px] border-ink">
              <div className="relative min-h-[240px] md:min-h-[340px]">
                <Image
                  src="/ausstellung/rueckblick/vernissage.jpeg"
                  alt="Vernissage der Ausstellung „Farben die verbinden“"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7 sm:p-10 flex flex-col justify-center bg-ink">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sonne mb-3">
                  Die erste Ausstellung
                </p>
                <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
                  Am {datum} wurde „Farben die verbinden“ in einer historischen Galerie in
                  Frankfurt-Sachsenhausen eröffnet — über 30 Werke, dazu die „Baum des
                  Lebens“-Skulpturen und musikalische Begleitung am Flügel.
                </p>
                <Link
                  href="/ausstellung"
                  className="self-start rounded-full px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-all hover:-translate-y-0.5"
                  style={{ background: "var(--color-sonne)", color: "var(--color-ink)", fontFamily: "var(--font-display)" }}
                >
                  Zum Rückblick →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

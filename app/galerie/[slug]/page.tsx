import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllArtworks,
  getArtworkBySlug,
  getRelatedArtworks,
  getExhibitionInfo,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { accentFor } from "@/lib/accent";
import ArtworkCard from "@/components/ArtworkCard";
import FadeIn from "@/components/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const artworks = await getAllArtworks();
  return artworks.map((a) => ({ slug: a.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: artwork.description ?? `${artwork.title} — ${artwork.technique ?? ""}`.trim(),
  };
}

export const revalidate = 3600;

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) notFound();

  const [related, exhibition] = await Promise.all([
    getRelatedArtworks(undefined, artwork._id),
    getExhibitionInfo(),
  ]);
  const datum = exhibition?.datum ?? "27. Juni 2026";
  const imageUrl = urlFor(artwork.image).width(2000).fit("max").url();
  const accentColor = accentFor(artwork.slug.current);

  const details = [
    ["Technik", artwork.technique],
    ["Maße",    artwork.dimensions],
    ["Jahr",    artwork.year?.toString()],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article className="pt-[72px]">
      {/* Kategorie-Streifen + Bild */}
      <div style={{ borderTop: `5px solid ${accentColor}` }}>
        <div className="relative w-full h-[70vh] bg-ink">
          <Image
            src={imageUrl}
            alt={artwork.title}
            fill
            sizes="100vw"
            priority
            className="object-contain"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav
          className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stone mb-12"
          aria-label="Brotkrumen"
        >
          <Link href="/galerie" className="hover:text-ink transition-colors">
            Galerie
          </Link>
          <span className="mx-2 text-line">·</span>
          <span className="text-ink">{artwork.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Fakten */}
          <FadeIn from="left">
            {/* Kategorie-Badge */}
            <div
              className="h-[3px] w-10 mb-6"
              style={{ background: accentColor }}
            />
            <h1
              className="text-4xl md:text-5xl text-ink mb-10 leading-tight uppercase"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
            >
              {artwork.title}
            </h1>
            <dl className="border-y-[2px] border-ink divide-y-[1px] divide-line">
              {details.map(([label, value]) => (
                <div key={label} className="flex justify-between py-4">
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stone">
                    {label}
                  </dt>
                  <dd className="text-sm text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          {/* Beschreibung */}
          <FadeIn from="right">
            {artwork.description && (
              <p
                className="italic text-xl md:text-2xl leading-[1.5] text-ink mb-10"
                style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: "1.25rem" }}
              >
                {artwork.description}
              </p>
            )}
            <div className="border-t-[2.5px] border-ink pt-8">
              <p
                className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] mb-2"
                style={{ color: accentColor }}
              >
                Teil der Ausstellung
              </p>
              <p className="text-sm text-stone mb-6">
                Dieses Werk ist Teil der Ausstellung „Farben die verbinden“ — zu sehen
                am {datum} in Frankfurt-Sachsenhausen.
              </p>
              <Link
                href="/ausstellung"
                className="inline-block text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink border-b-[2.5px] border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
              >
                Zur Ausstellung →
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Weitere Werke */}
        {related.length > 0 && (
          <section className="mt-28 md:mt-36">
            <FadeIn>
              <div className="section-head">
                <h2>Weitere Werke</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((a, i) => (
                <FadeIn key={a._id} delay={i * 0.08}>
                  <ArtworkCard artwork={a} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

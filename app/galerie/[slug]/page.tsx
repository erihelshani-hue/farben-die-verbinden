import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllArtworks,
  getArtworkBySlug,
  getRelatedArtworks,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ContactForm from "@/components/ContactForm";
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
    description:
      artwork.description ?? `${artwork.title} — ${artwork.technique ?? ""}`.trim(),
  };
}

export const revalidate = 3600;

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) notFound();

  const related = await getRelatedArtworks(artwork.category, artwork._id);

  const imageUrl = urlFor(artwork.image).width(2000).fit("max").url();

  const details = [
    ["Technik", artwork.technique],
    ["Maße", artwork.dimensions],
    ["Jahr", artwork.year?.toString()],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article className="pt-20">
      {/* Großes Bild */}
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav
          className="text-[12px] font-light uppercase tracking-[0.1em] text-stone mb-12"
          aria-label="Brotkrumen"
        >
          <Link href="/galerie" className="hover:text-accent transition-colors">
            Galerie
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{artwork.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Links: Fakten */}
          <FadeIn from="left">
            <h1 className="font-serif font-light text-4xl md:text-6xl text-ink mb-10 leading-tight">
              {artwork.title}
            </h1>
            <dl className="divide-y divide-line border-y border-line">
              {details.map(([label, value]) => (
                <div key={label} className="flex justify-between py-4">
                  <dt className="text-[12px] font-light uppercase tracking-[0.1em] text-stone">
                    {label}
                  </dt>
                  <dd className="text-base font-light text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          {/* Rechts: Beschreibung + Anfrage */}
          <FadeIn from="right">
            {artwork.description && (
              <p className="font-serif italic font-light text-2xl leading-[1.5] text-ink mb-12">
                {artwork.description}
              </p>
            )}
            <div className="border-t border-line pt-10">
              <p className="text-[11px] font-light uppercase tracking-[0.3em] text-accent mb-2">
                Preis auf Anfrage
              </p>
              <p className="text-sm font-light text-stone mb-8">
                Füllen Sie das Formular aus — wir melden uns schnellstmöglich bei
                Ihnen.
              </p>
              <ContactForm artworkTitle={artwork.title} />
            </div>
          </FadeIn>
        </div>

        {/* Weitere Werke */}
        {related.length > 0 && (
          <section className="mt-28 md:mt-40">
            <FadeIn>
              <h2 className="text-[11px] font-light uppercase tracking-[0.3em] text-accent mb-12 text-center">
                Weitere Werke
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
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

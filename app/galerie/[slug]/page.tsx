import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArtworks, getArtworkBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ContactForm from "@/components/ContactForm";

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
    description: artwork.description ?? `${artwork.title} — ${artwork.technique}`,
  };
}

export const revalidate = 3600;

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) notFound();

  const imageUrl = urlFor(artwork.image).width(1200).height(900).fit("max").url();

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/galerie" className="inline-flex items-center gap-2 text-sm text-[#211E1A]/60 hover:text-[#D87436] mb-8 transition-colors">
          ← Zurück zur Galerie
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={artwork.title}
              width={1200}
              height={900}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Details + Form */}
          <div>
            <h1 className="font-headline text-4xl md:text-5xl text-[#211E1A] mb-4">
              {artwork.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              {artwork.technique && (
                <span className="px-3 py-1 bg-[#D87436]/10 text-[#D87436] rounded-full text-sm">
                  {artwork.technique}
                </span>
              )}
              {artwork.dimensions && (
                <span className="px-3 py-1 bg-[#1B589F]/10 text-[#1B589F] rounded-full text-sm">
                  {artwork.dimensions}
                </span>
              )}
              {artwork.year && (
                <span className="px-3 py-1 bg-[#211E1A]/5 text-[#211E1A]/60 rounded-full text-sm">
                  {artwork.year}
                </span>
              )}
            </div>

            {artwork.description && (
              <p className="text-[#211E1A]/70 leading-relaxed mb-10">{artwork.description}</p>
            )}

            <div className="border-t border-[#211E1A]/10 pt-8">
              <h2 className="font-headline text-2xl text-[#211E1A] mb-2">Preis auf Anfrage</h2>
              <p className="text-sm text-[#211E1A]/60 mb-6">
                Füllen Sie das Formular aus — wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <ContactForm artworkTitle={artwork.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

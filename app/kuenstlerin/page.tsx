import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getArtist } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

export const metadata: Metadata = {
  title: "Über die Künstlerin",
  description: "Vjollca — Malerin und Schöpferin der Ausstellung Farben die verbinden.",
};

export const revalidate = 3600;

export default async function KuenstlerinPage() {
  const artist = await getArtist();

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-headline text-4xl md:text-5xl text-[#211E1A] mb-16 text-center">
          Über die Künstlerin
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Photo */}
          {artist?.photo && (
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={urlFor(artist.photo).width(800).height(1067).fit("crop").url()}
                alt={artist.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col justify-center">
            <h2 className="font-headline text-3xl text-[#211E1A] mb-6">
              {artist?.name ?? "Vjollca"}
            </h2>

            {artist?.bio ? (
              <div className="prose prose-stone max-w-none text-[#211E1A]/80 leading-relaxed">
                <PortableText value={artist.bio as Parameters<typeof PortableText>[0]["value"]} />
              </div>
            ) : (
              <p className="text-[#211E1A]/70 leading-relaxed">
                Vjollca malt seit über einem Jahrzehnt und hat eine unverwechselbare Bildsprache entwickelt, in der Natur, Licht und intensive Farben miteinander in Dialog treten.
              </p>
            )}

            {artist?.statement && (
              <blockquote className="mt-8 border-l-4 border-[#D87436] pl-6 italic text-[#211E1A]/60">
                „{artist.statement}"
              </blockquote>
            )}

            <Link
              href="/galerie"
              className="mt-10 inline-block px-8 py-3 bg-[#D87436] hover:bg-[#c4672d] text-white font-medium rounded-lg transition-colors"
            >
              Ihre Werke entdecken
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

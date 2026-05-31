import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { getArtist } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Künstlerin",
  description:
    "Vjollca Reshani — Malerin und Schöpferin der Ausstellung Farben die verbinden.",
};

export const revalidate = 3600;

export default async function KuenstlerinPage() {
  const artist = await getArtist();
  const name = artist?.name ?? "Vjollca Reshani";

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[480px] bg-ink flex items-end">
        {artist?.photo && (
          <Image
            src={urlFor(artist.photo).width(2000).height(2400).fit("crop").url()}
            alt={`Porträt von ${name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 pb-16">
          <p className="text-[11px] font-light uppercase tracking-[0.3em] text-accent mb-4">
            Die Künstlerin
          </p>
          <h1 className="font-serif font-light text-white text-6xl md:text-8xl leading-none">
            {name}
          </h1>
        </div>
      </section>

      {/* Statement-Zitat */}
      {artist?.statement && (
        <section className="px-6 py-24 md:py-32">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <p className="font-serif italic font-light text-3xl md:text-4xl leading-[1.4] text-ink">
              <span className="text-accent">„</span>
              {artist.statement}
              <span className="text-accent">"</span>
            </p>
          </FadeIn>
        </section>
      )}

      {/* Biografie */}
      <section className="px-6 lg:px-10 pb-28 md:pb-40">
        <div className="max-w-3xl mx-auto">
          {artist?.bio ? (
            <FadeIn>
              <div className="prose-artist font-light text-lg leading-relaxed text-ink/80 space-y-6">
                <PortableText
                  value={
                    artist.bio as Parameters<typeof PortableText>[0]["value"]
                  }
                />
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <p className="font-light text-lg leading-relaxed text-ink/80">
                Vjollca Reshani malt seit über einem Jahrzehnt und hat eine
                unverwechselbare Bildsprache entwickelt, in der Natur, Licht und
                intensive Farben miteinander in Dialog treten.
              </p>
            </FadeIn>
          )}

          {artist?.longBio && (
            <FadeIn delay={0.1}>
              <div className="prose-artist font-light text-lg leading-relaxed text-ink/80 space-y-6 mt-8">
                <PortableText
                  value={
                    artist.longBio as Parameters<typeof PortableText>[0]["value"]
                  }
                />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.15}>
            <div className="mt-16 text-center">
              <Link
                href="/galerie"
                className="inline-block px-10 py-4 bg-accent text-white font-light uppercase tracking-[0.15em] text-[13px] hover:bg-[#b5612f] transition-colors"
              >
                Ihre Werke entdecken
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}

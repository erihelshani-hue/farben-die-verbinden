import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { getArtist } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Künstlerin",
  description: "Vjollca Reshani — Malerin und Schöpferin der Ausstellung Farben die verbinden.",
};

export const revalidate = 3600;

export default async function KuenstlerinPage() {
  const artist = await getArtist();
  const name = artist?.name ?? "Vjollca Reshani";

  return (
    <article>
      {/* Header */}
      <section className="pt-[72px] px-6 lg:px-14">
        <div className="max-w-7xl mx-auto pt-16 pb-0">
          <div className="section-head">
            <h1>Die Künstlerin</h1>
          </div>
        </div>
      </section>

      {/* Grid: Bild + Statement */}
      <section className="px-6 lg:px-14 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Bild */}
          <FadeIn from="left">
            {artist?.photo ? (
              <div
                className="relative aspect-[3/4] overflow-hidden border-[2.5px] border-ink"
                style={{ boxShadow: "8px 8px 0 var(--color-ink)" }}
              >
                <Image
                  src={urlFor(artist.photo).width(1200).height(1600).fit("crop").url()}
                  alt={`Porträt von ${name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-line border-[2.5px] border-ink" />
            )}
          </FadeIn>

          {/* Text */}
          <FadeIn from="right" className="pt-0 lg:pt-4">
            {/* Vierfarbiger Marker */}
            <div
              className="h-[3px] w-16 mb-8"
              style={{ background: "linear-gradient(90deg, var(--color-tanne) 0 25%, var(--color-accent) 25% 50%, var(--color-ultramarin) 50% 75%, var(--color-sonne) 75%)" }}
            />

            <h2
              className="text-5xl md:text-6xl text-ink mb-8 uppercase leading-none"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
            >
              {name}
            </h2>

            {artist?.statement && (
              <blockquote
                className="italic text-xl md:text-2xl leading-[1.45] text-ink mb-10"
                style={{ borderLeft: "3px solid var(--color-accent)", paddingLeft: "1.25rem" }}
              >
                „{artist.statement}"
              </blockquote>
            )}

            {artist?.bio ? (
              <div className="text-base leading-relaxed text-stone space-y-4">
                <PortableText
                  value={artist.bio as Parameters<typeof PortableText>[0]["value"]}
                />
              </div>
            ) : (
              <p className="text-base leading-relaxed text-stone">
                Vjollca Reshani malt seit vielen Jahren und hat eine unverwechselbare
                Bildsprache entwickelt, in der Natur, Licht und intensive Farben
                miteinander in Dialog treten.
              </p>
            )}

            {artist?.longBio && (
              <div className="text-base leading-relaxed text-stone space-y-4 mt-6">
                <PortableText
                  value={artist.longBio as Parameters<typeof PortableText>[0]["value"]}
                />
              </div>
            )}

            <div className="mt-12">
              <Link
                href="/galerie"
                className="inline-block rounded-full px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-all hover:-translate-y-0.5"
                style={{ background: "var(--color-ink)", color: "var(--color-canvas)", fontFamily: "var(--font-display)" }}
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

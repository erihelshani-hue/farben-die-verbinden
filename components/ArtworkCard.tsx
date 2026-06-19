"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { accentFor } from "@/lib/accent";
import type { Artwork } from "@/sanity/lib/queries";

interface Props {
  artwork: Artwork;
  priority?: boolean;
}

export default function ArtworkCard({ artwork, priority = false }: Props) {
  const imageUrl = urlFor(artwork.image).width(900).height(1100).fit("crop").url();
  const accentColor = accentFor(artwork.slug.current);

  return (
    <Link
      href={`/galerie/${artwork.slug.current}`}
      className="group block"
      aria-label={artwork.title}
    >
      {/* Kategorie-Farbstreifen oben */}
      <div
        className="h-[3px] w-full transition-all duration-300 group-hover:h-[5px]"
        style={{ background: accentColor }}
      />

      <div className="relative overflow-hidden aspect-[4/5] bg-line border-[2.5px] border-t-0 border-ink">
        <Image
          src={imageUrl}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Hover-Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `color-mix(in srgb, ${accentColor} 85%, transparent)` }}
        />
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <h3
            className="text-white text-2xl leading-tight uppercase"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            {artwork.title}
          </h3>
          {artwork.technique && (
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/80">
              {artwork.technique}{artwork.year ? ` · ${artwork.year}` : ""}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { Artwork } from "@/sanity/lib/queries";

interface Props {
  artwork: Artwork;
  priority?: boolean;
}

export default function ArtworkCard({ artwork, priority = false }: Props) {
  const imageUrl = urlFor(artwork.image)
    .width(900)
    .height(1100)
    .fit("crop")
    .url();

  return (
    <Link
      href={`/galerie/${artwork.slug.current}`}
      className="group block"
      aria-label={artwork.title}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-line shadow-[0_8px_30px_rgba(26,23,20,0.08)]">
        <Image
          src={imageUrl}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <h3 className="font-serif font-light text-2xl text-white leading-tight">
            {artwork.title}
          </h3>
          {artwork.technique && (
            <p className="mt-1 text-[12px] font-light uppercase tracking-[0.15em] text-white/70">
              {artwork.technique}
              {artwork.year ? ` · ${artwork.year}` : ""}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

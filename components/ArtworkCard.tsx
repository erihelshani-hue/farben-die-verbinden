"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import type { Artwork } from "@/sanity/lib/queries";

interface Props {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: Props) {
  const imageUrl = urlFor(artwork.image).width(800).height(600).fit("crop").url();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/galerie/${artwork.slug.current}`}>
        <div className="overflow-hidden rounded-lg aspect-[4/3] bg-[#211E1A]/5 relative">
          <Image
            src={imageUrl}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium">Details ansehen →</span>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="font-headline text-lg text-[#211E1A]">{artwork.title}</h3>
          {artwork.technique && (
            <p className="text-sm text-[#211E1A]/60 mt-0.5">{artwork.technique}</p>
          )}
          {artwork.dimensions && (
            <p className="text-sm text-[#211E1A]/40">{artwork.dimensions}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArtworkCard from "@/components/ArtworkCard";
import type { Artwork } from "@/sanity/lib/queries";

export default function GaleriePage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/artworks")
      .then((r) => r.json())
      .then((data) => { setArtworks(data); setLoading(false); });
  }, []);

  return (
    <>
      <section className="pt-[72px] px-6 lg:px-14">
        <div className="max-w-7xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="section-head"
          >
            <h1>Galerie</h1>
            <span className="ml-auto text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-stone">
              {loading ? "…" : `${artworks.length} ${artworks.length === 1 ? "Werk" : "Werke"}`}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="max-w-2xl mb-14 text-base leading-relaxed text-stone"
          >
            Jedes Werk erzählt eine eigene Geschichte aus Farben, Emotionen und
            Kreativität. Alle Arbeiten sind verkäuflich — Preis auf Anfrage.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-14 pb-24 md:pb-36">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-line animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {artworks.map((artwork, i) => (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <ArtworkCard artwork={artwork} priority={i < 3} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && artworks.length === 0 && (
          <p className="text-center text-stone text-sm font-semibold uppercase tracking-[0.1em] mt-16">
            Zurzeit sind keine Werke verfügbar.
          </p>
        )}
      </div>
    </>
  );
}

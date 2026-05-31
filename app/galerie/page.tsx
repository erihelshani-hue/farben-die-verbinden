"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtworkCard from "@/components/ArtworkCard";
import type { Artwork } from "@/sanity/lib/queries";

const categories = [
  { value: "alle", label: "Alle" },
  { value: "baeume-natur", label: "Bäume & Natur" },
  { value: "abstrakt", label: "Abstrakt" },
  { value: "maritim", label: "Maritim" },
  { value: "tiere", label: "Tiere" },
];

export default function GaleriePage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState("alle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/artworks")
      .then((r) => r.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      });
  }, []);

  const filtered =
    filter === "alle"
      ? artworks
      : artworks.filter((a) => a.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 bg-[#EDE7DC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light text-6xl md:text-8xl text-ink"
          >
            Galerie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-base font-light text-stone max-w-xl mx-auto"
          >
            Werke, entstanden aus der Begegnung mit Natur, Licht und Farbe.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-5 py-2 rounded-full text-[12px] font-light uppercase tracking-[0.1em] transition-colors ${
                filter === value
                  ? "bg-accent text-white"
                  : "border border-ink/15 text-ink/70 hover:border-accent hover:text-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-ink/5 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((artwork) => (
                <motion.div
                  key={artwork._id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArtworkCard artwork={artwork} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-stone font-light mt-12">
            Keine Werke in dieser Kategorie.
          </p>
        )}
      </div>
    </>
  );
}

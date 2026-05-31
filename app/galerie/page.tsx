"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtworkCard from "@/components/ArtworkCard";
import type { Artwork } from "@/sanity/lib/queries";

const categories = [
  { value: "alle", label: "Alle" },
  { value: "baeume", label: "Bäume" },
  { value: "natur", label: "Natur" },
  { value: "abstrakt", label: "Abstrakt" },
  { value: "maritim", label: "Maritim" },
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
    filter === "alle" ? artworks : artworks.filter((a) => a.category === filter);

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-[#211E1A] mb-4">Galerie</h1>
          <p className="text-[#211E1A]/60 max-w-xl mx-auto">
            13 Werke — entstanden aus der Begegnung mit Natur, Licht und Farbe.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === value
                  ? "bg-[#D87436] text-white"
                  : "bg-[#211E1A]/5 text-[#211E1A] hover:bg-[#211E1A]/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-[#211E1A]/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((artwork) => (
                <motion.div
                  key={artwork._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArtworkCard artwork={artwork} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-[#211E1A]/40 mt-12">
            Keine Werke in dieser Kategorie.
          </p>
        )}
      </div>
    </div>
  );
}

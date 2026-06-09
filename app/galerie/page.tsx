"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtworkCard from "@/components/ArtworkCard";
import type { Artwork } from "@/sanity/lib/queries";

const categories = [
  { value: "alle",         label: "Alle",         color: "var(--color-ink)" },
  { value: "baeume-natur", label: "Bäume & Natur", color: "var(--color-tanne)" },
  { value: "abstrakt",     label: "Abstrakt",      color: "var(--color-accent)" },
  { value: "maritim",      label: "Maritim",       color: "var(--color-ultramarin)" },
  { value: "tiere",        label: "Tiere",         color: "var(--color-sonne)" },
];

export default function GaleriePage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState("alle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/artworks")
      .then((r) => r.json())
      .then((data) => { setArtworks(data); setLoading(false); });
  }, []);

  const filtered = filter === "alle" ? artworks : artworks.filter((a) => a.category === filter);

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
              {loading ? "…" : `${filtered.length} ${filtered.length === 1 ? "Werk" : "Werke"}`}
            </span>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-14"
          >
            {categories.map(({ value, label, color }) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className="px-5 py-2 rounded-full text-[0.75rem] font-semibold uppercase tracking-[0.1em] border-[2px] transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    borderColor: active ? color : "var(--color-line)",
                    background: active ? color : "transparent",
                    color: active
                      ? value === "tiere" ? "var(--color-ink)" : "var(--color-canvas)"
                      : "var(--color-ink)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </motion.div>
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
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((artwork) => (
                <motion.div
                  key={artwork._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <ArtworkCard artwork={artwork} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-stone text-sm font-semibold uppercase tracking-[0.1em] mt-16">
            Keine Werke in dieser Kategorie.
          </p>
        )}
      </div>
    </>
  );
}

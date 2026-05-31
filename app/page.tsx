import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getFeaturedArtworks, getArtist } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ArtworkCard from "@/components/ArtworkCard";

export const revalidate = 3600;

export default async function HomePage() {
  const [featured, artist] = await Promise.all([
    getFeaturedArtworks(),
    getArtist(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#FAF7F2] to-[#D87436]/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
          <p className="text-[#D87436] text-sm font-medium tracking-widest uppercase mb-6">
            Kunstausstellung
          </p>
          <h1 className="font-headline text-5xl md:text-7xl font-semibold text-[#211E1A] leading-tight mb-6">
            Farben die verbinden
          </h1>
          <p className="text-lg md:text-xl text-[#211E1A]/70 max-w-2xl mx-auto leading-relaxed mb-10">
            {artist?.exhibitionText ??
              "13 Werke, die durch Farbe, Natur und Emotion eine Brücke zwischen Innen und Außen bauen."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/galerie"
              className="px-8 py-4 bg-[#D87436] hover:bg-[#c4672d] text-white font-medium rounded-lg transition-colors"
            >
              Zur Galerie
            </Link>
            <Link
              href="/kontakt"
              className="px-8 py-4 border border-[#211E1A]/20 hover:border-[#D87436] text-[#211E1A] font-medium rounded-lg transition-colors"
            >
              Anfrage stellen
            </Link>
          </div>
        </div>

        {/* Decorative color bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#D87436]" />
          <div className="flex-1 bg-[#1B589F]" />
          <div className="flex-1 bg-[#36B0D8]" />
          <div className="flex-1 bg-[#D8365E]" />
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="font-headline text-3xl md:text-4xl text-[#211E1A] mb-6">
          Warum Farben verbinden
        </h2>
        <p className="text-lg text-[#211E1A]/70 leading-relaxed">
          {artist?.statement ??
            "In dieser Ausstellung begegnen sich Bäume, Wasser und Licht — verwandelt durch Farbe in etwas Universelles. Jedes Werk lädt dazu ein, innezuhalten und zu fühlen, was Worte oft nicht ausdrücken können."}
        </p>
      </section>

      {/* Featured Works */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-headline text-3xl text-[#211E1A]">Ausgewählte Werke</h2>
            <Link
              href="/galerie"
              className="text-[#D87436] hover:underline text-sm font-medium"
            >
              Alle 13 Werke →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-[#1A1815] text-[#FAF7F2] py-20 mt-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-headline text-3xl md:text-4xl mb-4">
            Ein Werk interessiert Sie?
          </h2>
          <p className="text-[#FAF7F2]/60 mb-8">
            Alle Werke sind käuflich zu erwerben. Sprechen Sie uns einfach an — wir freuen uns auf Ihre Anfrage.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-8 py-4 bg-[#D87436] hover:bg-[#c4672d] text-white font-medium rounded-lg transition-colors"
          >
            Jetzt anfragen
          </Link>
        </div>
      </section>
    </>
  );
}

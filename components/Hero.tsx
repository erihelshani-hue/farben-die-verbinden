"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  label: string;
  subtitle: string;
  datum?: string;
  ort?: string;
  imageUrl: string;
}

const WORDS = [
  { text: "Farben",    color: "#FFFFFF" },
  { text: "die",       color: "#E8688F" },
  { text: "verbinden", color: "#FFFFFF" },
];

export default function Hero({ label, subtitle, datum, ort, imageUrl }: Props) {
  const reduce = useReducedMotion();

  const wordVariant = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: "0.35em" },
        visible: { opacity: 1, y: "0em", transition: { duration: 0.85, ease: [0.2, 0.7, 0.2, 1] as const } },
      };

  return (
    <section className="relative min-h-svh flex flex-col justify-end overflow-hidden bg-ink">
      {/* Hintergrund: Veranstaltungsort */}
      <Image
        src={imageUrl}
        alt="Ausstellungsort — historischer Saal in Frankfurt-Sachsenhausen"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(23,24,31,0.55) 0%, rgba(23,24,31,0.20) 38%, rgba(23,24,31,0.88) 100%)" }}
        aria-hidden="true"
      />

      {/* Inhalt */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 pt-[120px] pb-14 md:pb-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/80 mb-5"
        >
          {label}
        </motion.p>

        <h1 className="uppercase" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
            className="block leading-[0.92]"
            style={{ fontSize: "clamp(2.1rem, 7.5vw, 6.5rem)" }}
          >
            {WORDS.map(({ text, color }) => (
              <motion.span key={text} variants={wordVariant} className="block" style={{ color }}>
                {text}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Datum / Ort / Künstlerin */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-9 pt-5 border-t-2 border-white/30 flex flex-wrap items-end gap-x-10 gap-y-4"
        >
          {datum && (
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white/55 mb-1">Rückblick</p>
              <p className="text-lg sm:text-xl uppercase text-white leading-none" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                {datum}
              </p>
            </div>
          )}
          {ort && (
            <div className="sm:border-l-2 sm:border-white/30 sm:pl-10">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white/55 mb-1">Ort</p>
              <p className="text-lg sm:text-xl uppercase text-white leading-none" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                {ort}
              </p>
            </div>
          )}
          <div className="sm:ml-auto">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/90">{subtitle}</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll-Hinweis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 right-6 lg:right-14 z-10 flex items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">Scrollen</span>
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/0 via-white/70 to-white/0"
        />
      </motion.div>
    </section>
  );
}

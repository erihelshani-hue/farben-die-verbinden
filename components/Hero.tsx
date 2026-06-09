"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  label: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
}

const WORDS = [
  { text: "Farben",    color: "#2B3FBF", indent: false },
  { text: "die",       color: "#23252F", indent: true  },
  { text: "verbinden", color: "#C03A78", indent: false },
];

export default function Hero({ label, subtitle, imageUrl }: Props) {
  const reduce = useReducedMotion();

  const wordVariant = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: "0.4em" },
        visible: { opacity: 1, y: "0em", transition: { duration: 0.85, ease: [0.2, 0.7, 0.2, 1] as const } },
      };

  return (
    <section className="relative min-h-svh flex flex-col justify-center pt-[72px] overflow-hidden bg-canvas">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-14 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center py-16 lg:py-24">

        {/* Left: Typografie */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-stone mb-6"
          >
            {label}
          </motion.p>

          <h1
            className="leading-[0.93] uppercase"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } } }}
              style={{ fontSize: "clamp(3.5rem, 13vw, 10.5rem)" }}
            >
              {WORDS.map(({ text, color, indent }) => (
                <motion.span
                  key={text}
                  variants={wordVariant}
                  className="block"
                  style={{
                    color,
                    paddingLeft: indent ? "clamp(3rem, 13vw, 10.5rem)" : 0,
                  }}
                >
                  {text}
                </motion.span>
              ))}
            </motion.div>
          </h1>

          {/* Meta-Zeile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-8 pt-4 flex flex-wrap gap-x-8 gap-y-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink border-t-[2.5px] border-ink"
          >
            <span>{subtitle}</span>
            <span>{label}</span>
          </motion.div>
        </div>

        {/* Right: Bild-Panel (nur Desktop, nur wenn Bild vorhanden) */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="hidden lg:block relative w-64 xl:w-80 aspect-[3/4] border-[2.5px] border-ink shadow-[8px_8px_0_var(--color-ink)]"
          >
            <Image
              src={imageUrl}
              alt=""
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Scroll-Pfeil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-6 lg:left-14 flex items-center gap-3"
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-ink/0 via-ink/50 to-ink/0"
        />
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-stone">Scrollen</span>
      </motion.div>
    </section>
  );
}

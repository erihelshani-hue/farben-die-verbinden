"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  label: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
}

export default function Hero({ label, title, subtitle, imageUrl }: Props) {
  const reduce = useReducedMotion();
  const words = title.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.4, staggerChildren: 0.12 },
    },
  };
  const child = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80"
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[11px] font-light uppercase tracking-[0.3em] text-accent mb-8"
        >
          {label}
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="font-serif font-light text-white leading-[0.95] text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] flex flex-wrap justify-center gap-x-5"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2">
              <motion.span variants={child} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 text-base font-light tracking-[0.1em] text-white/60"
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/0 via-white/60 to-white/0"
        />
      </motion.div>
    </section>
  );
}

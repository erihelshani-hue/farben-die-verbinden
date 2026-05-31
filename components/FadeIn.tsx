"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Verzögerung in Sekunden, z.B. für gestaffelte Listen */
  delay?: number;
  className?: string;
  /** Verschieberichtung beim Einblenden */
  from?: "up" | "left" | "right";
}

const distance = 40;

// Sanftes Einblenden beim Scrollen (fadeUp). Bei „Bewegung reduzieren" wird
// der Inhalt sofort ohne Bewegung gezeigt.
export default function FadeIn({
  children,
  delay = 0,
  className,
  from = "up",
}: Props) {
  const reduce = useReducedMotion();

  const offset = reduce
    ? {}
    : from === "left"
      ? { x: -distance }
      : from === "right"
        ? { x: distance }
        : { y: distance };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

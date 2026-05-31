"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Verzögerung in Sekunden, z.B. für gestaffelte Listen */
  delay?: number;
  className?: string;
}

// Sanftes Einblenden beim Scrollen. Bei "Bewegung reduzieren" wird der
// Inhalt sofort ohne Bewegung gezeigt.
export default function FadeIn({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

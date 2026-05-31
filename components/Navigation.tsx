"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Start" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kuenstlerin", label: "Künstlerin" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Nur die Startseite hat einen dunklen Fullscreen-Hero, über dem die Nav
  // transparent mit heller Schrift starten darf.
  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        overHero
          ? "bg-transparent"
          : "bg-canvas/90 backdrop-blur-md border-b border-line"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`font-serif text-sm uppercase tracking-[0.15em] transition-colors ${
            overHero ? "text-white" : "text-ink"
          }`}
        >
          Farben die verbinden
        </Link>

        {/* Desktop */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="hidden md:flex items-center gap-10"
        >
          {links.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <motion.li
                key={href}
                variants={{
                  hidden: { opacity: 0, y: -8 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={href}
                  className={`text-[13px] font-light uppercase tracking-[0.1em] transition-colors ${
                    overHero
                      ? active
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                      : active
                        ? "text-accent"
                        : "text-ink/70 hover:text-accent"
                  }`}
                >
                  {label}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden relative z-50 p-2 ${
            menuOpen ? "text-ink" : overHero ? "text-white" : "text-ink"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-current mt-1.5 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-canvas flex flex-col items-center justify-center gap-8"
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif font-light text-5xl text-ink hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

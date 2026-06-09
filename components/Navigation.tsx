"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/galerie",     label: "Galerie",     hoverColor: "#2E6B4F" },
  { href: "/kuenstlerin", label: "Künstlerin",  hoverColor: "#C03A78" },
  { href: "/kontakt",     label: "Kontakt",     hoverColor: "#2B3FBF" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-canvas/92 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
      style={{ borderBottomWidth: "2.5px" }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-14 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-display text-[0.95rem] font-800 uppercase tracking-[-0.01em] text-ink"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
        >
          Farben <span style={{ color: "var(--color-accent)" }}>die</span> verbinden
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label, hoverColor }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="group relative text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors"
                  style={active ? { color: hoverColor } : undefined}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = hoverColor; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = active ? hoverColor : ""; }}
                >
                  {label}
                  <span
                    className="absolute left-0 -bottom-1 h-[2.5px] w-full origin-left transition-transform duration-300 ease-out"
                    style={{
                      background: hoverColor,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-ink"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-[2.5px] bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`block w-6 h-[2.5px] bg-current mt-1.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden fixed inset-0 z-40 bg-canvas flex flex-col items-start justify-end pb-16 px-6 gap-6"
          >
            {links.map(({ href, label, hoverColor }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-display font-800 uppercase text-5xl text-ink leading-tight"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = hoverColor; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}
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

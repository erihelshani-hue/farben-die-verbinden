"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/",            label: "Home",        hoverColor: "#23252F", exact: true },
  { href: "/ausstellung", label: "Ausstellung", hoverColor: "#E9A820" },
  { href: "/galerie",     label: "Galerie",     hoverColor: "#2E6B4F" },
  { href: "/kuenstlerin", label: "Künstlerin",  hoverColor: "#C03A78" },
  { href: "/kontakt",     label: "Kontakt",     hoverColor: "#2B3FBF" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href);
}

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

  // Seitenwechsel schließt das Menü, Body-Scroll sperren solange es offen ist.
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Seiten mit Bild-/Dunkel-Hero am oberen Rand → helle Navigationsschrift,
  // solange noch nicht gescrollt wurde (danach ist der Header hell hinterlegt).
  const darkPage = pathname === "/" || pathname === "/kontakt" || pathname === "/ausstellung";
  const lightText = darkPage && !scrolled && !menuOpen;
  const baseTextColor = lightText ? "#F2F3EE" : "var(--color-ink)";
  // Aktive Farbe: auf dunklem Hintergrund heben sich dunkle Akzentfarben nicht ab
  const activeColor = (c: string) => (lightText && c === "#23252F" ? "#F2F3EE" : c);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${
          scrolled && !menuOpen
            ? "bg-canvas/92 backdrop-blur-md border-b border-line"
            : "bg-transparent"
        }`}
        style={{
          borderBottomWidth: scrolled && !menuOpen ? "2.5px" : 0,
          // Lesbarkeits-Scrim: dunkler Verlauf hinter der Nav auf Bild-Heros
          backgroundImage: lightText
            ? "linear-gradient(180deg, rgba(23,24,31,0.62) 0%, rgba(23,24,31,0.28) 70%, rgba(23,24,31,0) 100%)"
            : undefined,
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-14 h-[72px] flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="uppercase tracking-[-0.01em] transition-colors"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", color: baseTextColor }}
          >
            Farben <span style={{ color: "var(--color-accent)" }}>die</span> verbinden
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-9">
            {links.map(({ href, label, hoverColor, exact }) => {
              const active = isActive(pathname, href, exact);
              const color = activeColor(hoverColor);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="group relative text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-colors"
                    style={{ color: active ? color : baseTextColor }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = color; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = active ? color : baseTextColor; }}
                  >
                    {label}
                    <span
                      className="absolute left-0 -bottom-1 h-[2.5px] w-full origin-left transition-transform duration-300 ease-out"
                      style={{ background: color, transform: active ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden relative z-[70] -mr-2 p-3 transition-colors"
            style={{ color: menuOpen ? "var(--color-ink)" : baseTextColor }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-[2.5px] bg-current transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-6 h-[2.5px] bg-current mt-1.5 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Overlay — bewusst AUSSERHALB des Headers: dessen backdrop-filter
          würde position:fixed sonst auf die Headerhöhe beschneiden. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-[60] bg-canvas flex flex-col justify-center gap-4 px-6"
          >
            {links.map(({ href, label, hoverColor, exact }) => {
              const active = isActive(pathname, href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block uppercase leading-[1.05] whitespace-nowrap transition-colors"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(1.25rem, 6.6vw, 2rem)",
                    color: active ? hoverColor : "var(--color-ink)",
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-stone">
              Vjollca Reshani — Malerei
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

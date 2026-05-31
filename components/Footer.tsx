import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1815] text-[#FAF7F2]/70 py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-headline text-[#FAF7F2] text-lg mb-2">Farben die verbinden</p>
            <p className="text-sm">Kunstausstellung von Vjollca</p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/galerie" className="hover:text-[#D87436] transition-colors">Galerie</Link>
            <Link href="/kuenstlerin" className="hover:text-[#D87436] transition-colors">Künstlerin</Link>
            <Link href="/kontakt" className="hover:text-[#D87436] transition-colors">Kontakt</Link>
          </nav>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-xs">
          <p>© {new Date().getFullYear()} Vjollca — Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await getSiteSettings();
  const email = settings?.kontaktEmail ?? "kontakt@farben-die-verbinden.de";

  return (
    <footer className="bg-[#1A1815] text-[#FAF7F2]/70 py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-headline text-[#FAF7F2] text-lg mb-2">
              Farben die verbinden
            </p>
            <p className="text-sm">Kunstausstellung von Vjollca Reshani</p>
            <a
              href="https://farben-die-verbinden.de"
              className="text-sm hover:text-[#D87436] transition-colors"
            >
              farben-die-verbinden.de
            </a>
          </div>

          <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
            <Link href="/galerie" className="hover:text-[#D87436] transition-colors">
              Galerie
            </Link>
            <Link href="/kuenstlerin" className="hover:text-[#D87436] transition-colors">
              Künstlerin
            </Link>
            <Link href="/kontakt" className="hover:text-[#D87436] transition-colors">
              Kontakt
            </Link>
          </nav>

          <div className="flex flex-col gap-2 text-sm">
            <a href={`mailto:${email}`} className="hover:text-[#D87436] transition-colors">
              {email}
            </a>
            {settings?.telefon && (
              <a
                href={`tel:${settings.telefon.replace(/\s/g, "")}`}
                className="hover:text-[#D87436] transition-colors"
              >
                {settings.telefon}
              </a>
            )}
            {settings?.socialLinks?.map(
              (link) =>
                link.url && (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D87436] transition-colors"
                  >
                    {link.plattform ?? link.url}
                  </a>
                )
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-xs">
          <p>
            © {new Date().getFullYear()} Vjollca Reshani — Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  );
}

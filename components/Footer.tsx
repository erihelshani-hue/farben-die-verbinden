import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await getSiteSettings();
  const email = settings?.kontaktEmail ?? "kontakt@farben-die-verbinden.de";

  return (
    <footer className="bg-ink text-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <p className="font-serif font-light text-2xl text-white mb-3">
              Farben die verbinden
            </p>
            <p className="text-sm font-light leading-relaxed">
              Kunstausstellung von Vjollca Reshani
            </p>
            <a
              href="https://farben-die-verbinden.de"
              className="text-sm font-light hover:text-accent transition-colors"
            >
              farben-die-verbinden.de
            </a>
          </div>

          <nav
            className="flex flex-col gap-3 text-[13px] font-light uppercase tracking-[0.1em]"
            aria-label="Footer"
          >
            <Link href="/galerie" className="hover:text-accent transition-colors">
              Galerie
            </Link>
            <Link href="/kuenstlerin" className="hover:text-accent transition-colors">
              Künstlerin
            </Link>
            <Link href="/kontakt" className="hover:text-accent transition-colors">
              Kontakt
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm font-light">
            <a
              href={`mailto:${email}`}
              className="hover:text-accent transition-colors"
            >
              {email}
            </a>
            {settings?.telefon && (
              <a
                href={`tel:${settings.telefon.replace(/\s/g, "")}`}
                className="hover:text-accent transition-colors"
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
                    className="hover:text-accent transition-colors"
                  >
                    {link.plattform ?? link.url}
                  </a>
                )
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-xs font-light">
          <p>© {new Date().getFullYear()} Vjollca Reshani — Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  );
}

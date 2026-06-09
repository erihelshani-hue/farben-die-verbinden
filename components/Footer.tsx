import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await getSiteSettings();
  const email = settings?.kontaktEmail ?? "kontakt@farben-die-verbinden.de";

  return (
    <footer className="bg-ink text-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">

          <div>
            <p
              className="text-white mb-2 uppercase"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em" }}
            >
              Farben <span style={{ color: "var(--color-accent)" }}>die</span> verbinden
            </p>
            <p className="text-sm">Vjollca Reshani — Malerei</p>
          </div>

          <nav className="flex flex-col gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em]" aria-label="Footer">
            <Link href="/galerie"     className="hover:text-tanne transition-colors">Galerie</Link>
            <Link href="/kuenstlerin" className="hover:text-accent transition-colors">Künstlerin</Link>
            <Link href="/kontakt"     className="hover:text-ultramarin transition-colors">Kontakt</Link>
          </nav>

          <div className="flex flex-col gap-2 text-sm">
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
            {settings?.telefon && (
              <a href={`tel:${settings.telefon.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                {settings.telefon}
              </a>
            )}
            {settings?.socialLinks?.map(
              (link) => link.url && (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {link.plattform ?? link.url}
                </a>
              )
            )}
          </div>
        </div>

        <div className="pt-6 text-xs text-white/30">
          © {new Date().getFullYear()} Vjollca Reshani — Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  );
}

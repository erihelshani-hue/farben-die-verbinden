import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Fragen zur Ausstellung „Farben die verbinden“ von Vjollca Reshani? Schreiben Sie mir.",
};

export const revalidate = 3600;

export default async function KontaktPage() {
  const settings = await getSiteSettings();
  const email = settings?.kontaktEmail ?? "v.reshani@web.de";

  return (
    <div className="bg-ink min-h-screen pt-[72px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16 md:py-24">

        {/* Header */}
        <div className="border-b-[2.5px] border-white/20 pb-4 mb-16">
          <h1
            className="text-white uppercase leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
            }}
          >
            Kontakt
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-sm">
              Haben Sie Fragen zur Ausstellung oder zu meinen Werken? Schreiben Sie
              mir gern — ich freue mich über Ihre Nachricht und melde mich persönlich
              bei Ihnen.
            </p>
            <div className="space-y-2 text-sm text-white/40">
              <p>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </p>
              {settings?.telefon && (
                <p>
                  <a
                    href={`tel:${settings.telefon.replace(/\s/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.telefon}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <ContactForm dark />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Anfragen zu Werken und zur Ausstellung Farben die verbinden von Vjollca Reshani.",
};

export const revalidate = 3600;

export default async function KontaktPage() {
  const settings = await getSiteSettings();
  const email = settings?.kontaktEmail ?? "kontakt@farben-die-verbinden.de";

  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Sehr großes, fast unsichtbares Hintergrundwort */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-4 left-1/2 -translate-x-1/2 font-serif font-light text-[28vw] leading-none text-ink/[0.03] whitespace-nowrap"
      >
        Kontakt
      </span>

      <div className="relative max-w-xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="font-serif font-light text-5xl md:text-6xl text-ink mb-5">
            Kontakt
          </h1>
          <p className="text-base font-light text-stone">
            Interesse an einem Werk oder Fragen zur Ausstellung? Wir freuen uns
            auf Ihre Nachricht.
          </p>
        </div>

        <ContactForm />

        <div className="mt-16 text-center text-sm font-light text-stone space-y-2">
          <p>Oder direkt:</p>
          <p>
            <a
              href={`mailto:${email}`}
              className="text-accent hover:underline underline-offset-4"
            >
              {email}
            </a>
          </p>
          {settings?.telefon && (
            <p>
              <a
                href={`tel:${settings.telefon.replace(/\s/g, "")}`}
                className="text-accent hover:underline underline-offset-4"
              >
                {settings.telefon}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <div className="pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-[#211E1A] mb-4">
            Kontakt
          </h1>
          <p className="text-[#211E1A]/60">
            Interesse an einem Werk oder Fragen zur Ausstellung? Wir freuen uns
            auf Ihre Nachricht.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <ContactForm />
        </div>

        <div className="mt-10 text-center text-sm text-[#211E1A]/60 space-y-1">
          <p>Oder direkt:</p>
          <p>
            <a
              href={`mailto:${email}`}
              className="text-[#D87436] hover:underline font-medium"
            >
              {email}
            </a>
          </p>
          {settings?.telefon && (
            <p>
              <a
                href={`tel:${settings.telefon.replace(/\s/g, "")}`}
                className="text-[#D87436] hover:underline font-medium"
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

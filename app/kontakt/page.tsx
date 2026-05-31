import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Anfragen zu Werken und Ausstellung — Farben die verbinden.",
};

export default function KontaktPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-[#211E1A] mb-4">Kontakt</h1>
          <p className="text-[#211E1A]/60">
            Interesse an einem Werk oder Fragen zur Ausstellung? Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <ContactForm />
        </div>

        <div className="mt-10 text-center text-sm text-[#211E1A]/50">
          <p>Oder direkt per E-Mail:</p>
          <a
            href="mailto:vjollca@beispiel.de"
            className="text-[#D87436] hover:underline font-medium"
          >
            vjollca@beispiel.de
          </a>
        </div>
      </div>
    </div>
  );
}

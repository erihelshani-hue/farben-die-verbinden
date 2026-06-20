import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der Website „Farben die verbinden“ von Vjollca Reshani.",
  robots: { index: true, follow: false },
};

export const revalidate = 3600;

export default async function ImpressumPage() {
  const settings = await getSiteSettings();
  const email = settings?.kontaktEmail ?? "v.reshani@web.de";

  return (
    <article className="pt-[72px]">
      <div className="max-w-3xl mx-auto px-6 lg:px-14 py-16 md:py-24">
        <div className="section-head">
          <h1>Impressum</h1>
        </div>

        <div className="space-y-10 text-ink">
          <section>
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Angaben gemäß § 5 DDG
            </h2>
            <p className="leading-relaxed">
              Vjollca Reshani<br />
              [Straße und Hausnummer]<br />
              [PLZ] Frankfurt am Main<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Kontakt
            </h2>
            <p className="leading-relaxed">
              E-Mail:{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-accent transition-colors">
                {email}
              </a>
              {settings?.telefon && (
                <>
                  <br />
                  Telefon: {settings.telefon}
                </>
              )}
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="leading-relaxed">
              Vjollca Reshani<br />
              [Straße und Hausnummer]<br />
              [PLZ] Frankfurt am Main
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Urheberrecht
            </h2>
            <p className="leading-relaxed text-stone">
              Sämtliche auf dieser Website gezeigten Kunstwerke sowie deren Abbildungen
              sind urheberrechtlich geschützt und Eigentum von Vjollca Reshani. Jede
              Verwendung, Vervielfältigung oder Verbreitung außerhalb der Grenzen des
              Urheberrechts bedarf der vorherigen schriftlichen Zustimmung der Künstlerin.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Haftung für Inhalte
            </h2>
            <p className="leading-relaxed text-stone">
              Als Diensteanbieterin bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
              DDG bin ich als Diensteanbieterin jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Haftung für Links
            </h2>
            <p className="leading-relaxed text-stone">
              Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte
              ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              EU-Streitschlichtung
            </h2>
            <p className="leading-relaxed text-stone">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent transition-colors">
                https://ec.europa.eu/consumers/odr/
              </a>
              . Ich bin nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <p className="pt-6 text-sm text-stone">
            Siehe auch unsere{" "}
            <Link href="/datenschutz" className="underline underline-offset-4 hover:text-accent transition-colors">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}

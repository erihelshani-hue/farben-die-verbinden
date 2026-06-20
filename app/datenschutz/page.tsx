import type { Metadata } from "next";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung gemäß DSGVO für die Website „Farben die verbinden“ von Vjollca Reshani.",
  robots: { index: true, follow: false },
};

export const revalidate = 3600;

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl mb-3 mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
      {children}
    </h2>
  );
}

export default async function DatenschutzPage() {
  const settings = await getSiteSettings();
  const email = settings?.kontaktEmail ?? "v.reshani@web.de";

  return (
    <article className="pt-[72px]">
      <div className="max-w-3xl mx-auto px-6 lg:px-14 py-16 md:py-24">
        <div className="section-head">
          <h1>Datenschutz</h1>
        </div>

        <div className="space-y-10 text-stone leading-relaxed">
          <section>
            <H2>1. Verantwortlicher</H2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
              Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <p className="mt-3 text-ink">
              Vjollca Reshani<br />
              [Straße und Hausnummer]<br />
              [PLZ] Frankfurt am Main<br />
              E-Mail:{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-accent transition-colors">
                {email}
              </a>
            </p>
          </section>

          <section>
            <H2>2. Allgemeines zur Datenverarbeitung</H2>
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit
              dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und
              Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach
              Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a DSGVO) oder auf Grundlage eines
              berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <H2>3. Hosting</H2>
            <p>
              Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              USA, gehostet. Beim Aufruf der Website werden durch den Hoster automatisch
              Informationen (Server-Logfiles) erfasst, darunter die IP-Adresse, Datum und
              Uhrzeit des Zugriffs, der verwendete Browser und das Betriebssystem. Diese Daten
              dienen der technischen Bereitstellung und Sicherheit der Website
              (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein Auftragsverarbeitungsvertrag;
              Datenübermittlungen in die USA stützen sich auf die EU-Standardvertragsklauseln.
            </p>
          </section>

          <section>
            <H2>4. Inhalts­verwaltung (Sanity)</H2>
            <p>
              Die Texte und Bilder dieser Website werden über das Content-Management-System der
              Sanity AS (Norwegen/EU) verwaltet und ausgeliefert. Beim Laden von Bildern können
              technische Verbindungsdaten (z. B. IP-Adresse) verarbeitet werden. Rechtsgrundlage
              ist unser berechtigtes Interesse an einer effizienten Bereitstellung der Inhalte
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <H2>5. Kontaktformular und E-Mail-Kontakt</H2>
            <p>
              Wenn Sie uns über das Kontaktformular oder per E-Mail Anfragen zukommen lassen,
              werden Ihre Angaben (Name, E-Mail-Adresse, Nachricht) zum Zweck der Bearbeitung
              Ihrer Anfrage verarbeitet. Der Versand der Formularnachrichten erfolgt technisch
              über den Dienst Resend (Resend, Inc., USA). Rechtsgrundlage ist Art. 6 Abs. 1
              lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO (berechtigtes Interesse
              an der Beantwortung). Die Daten werden gelöscht, sobald sie für die Zweckerreichung
              nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen.
            </p>
          </section>

          <section>
            <H2>6. Google Maps</H2>
            <p>
              Auf einzelnen Seiten binden wir Karten des Dienstes Google Maps (Google Ireland
              Limited, Gordon House, Barrow Street, Dublin 4, Irland) ein, um Ihnen den
              Ausstellungsort anzuzeigen. Beim Laden der Karte wird Ihre IP-Adresse an Google
              übermittelt; die Datenübermittlung kann auch in die USA erfolgen. Rechtsgrundlage
              ist unser berechtigtes Interesse an einer ansprechenden Darstellung und einfachen
              Auffindbarkeit des Veranstaltungsorts (Art. 6 Abs. 1 lit. f DSGVO). Weitere
              Informationen finden Sie in der Datenschutzerklärung von Google:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent transition-colors">
                policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <H2>7. Schriftarten (Google Fonts)</H2>
            <p>
              Diese Website verwendet Schriftarten („Syne“ und „Archivo“), die lokal über das
              Hosting bereitgestellt und beim Seitenaufbau ausgeliefert werden. Es wird hierbei
              keine Verbindung zu Servern von Google aufgebaut.
            </p>
          </section>

          <section>
            <H2>8. Cookies und Analyse</H2>
            <p>
              Diese Website verwendet keine Tracking-Cookies und keine Analyse- oder
              Marketing-Werkzeuge. Es werden nur technisch notwendige Daten verarbeitet, die für
              den Betrieb der Website erforderlich sind.
            </p>
          </section>

          <section>
            <H2>9. SSL-/TLS-Verschlüsselung</H2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres
              Browsers.
            </p>
          </section>

          <section>
            <H2>10. Ihre Rechte</H2>
            <p>
              Ihnen stehen gegenüber dem Verantwortlichen folgende Rechte hinsichtlich Ihrer
              personenbezogenen Daten zu: Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
              (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
              Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung
              (Art. 21 DSGVO). Sie haben zudem das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten
              zu beschweren.
            </p>
          </section>

          <p className="pt-4 text-sm">Stand: Juni 2026</p>
        </div>
      </div>
    </article>
  );
}

import Image from "next/image";
import type { Metadata } from "next";
import { getExhibitionInfo } from "@/sanity/lib/queries";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Ausstellung — Rückblick",
  description:
    "Rückblick auf die erste Kunstausstellung „Farben die verbinden“ von Vjollca Reshani am 27. Juni 2026 in Frankfurt am Main.",
};

export const revalidate = 3600;

const HERO = "/ausstellung/rueckblick/vernissage.jpeg";

export default async function AusstellungPage() {
  const exhibition = await getExhibitionInfo();
  const datum = exhibition?.datum ?? "27. Juni 2026";

  return (
    <article>
      {/* ── Bild-Hero ─────────────────────────────────────────── */}
      <section className="relative h-[82svh] min-h-[500px] flex items-end overflow-hidden bg-ink">
        <Image src={HERO} alt="Vernissage der Ausstellung „Farben die verbinden“ in Frankfurt" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(23,24,31,0.5) 0%, rgba(23,24,31,0.15) 40%, rgba(23,24,31,0.9) 100%)" }} aria-hidden="true" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 pb-14 md:pb-20">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/80 mb-4">
            Rückblick · {datum}
          </p>
          <h1 className="text-white leading-[0.95]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}>
            Farben die verbinden
          </h1>
          <p className="mt-4 text-white/80 text-sm md:text-base max-w-xl">
            Meine erste Kunstausstellung — ein Tag voller Begegnungen, Musik und Farbe
            in einer historischen Galerie in Frankfurt-Sachsenhausen.
          </p>
        </div>
      </section>

      {/* ── Lead ──────────────────────────────────────────────── */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-xl md:text-2xl leading-[1.5] text-ink" style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.015em" }}>
              Meine erste Kunstausstellung „Farben die verbinden“ war für mich ein
              ganz besonderer Meilenstein auf meinem künstlerischen Weg.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Die Ausstellung fand in einer stilvollen Galerie in der Schweizer Straße 5
              in Frankfurt statt — einem der bedeutendsten Kulturviertel der Stadt, in
              unmittelbarer Nähe des Städel Museums, des Filmmuseums und weiterer
              renommierter Kultureinrichtungen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Werke ─────────────────────────────────────────────── */}
      <section className="px-6 lg:px-14 pt-14 md:pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <FadeIn from="left">
            <div className="relative aspect-[3/4] overflow-hidden border-[2.5px] border-ink" style={{ boxShadow: "8px 8px 0 var(--color-accent)" }}>
              <Image src="/ausstellung/rueckblick/gesicht.jpeg" alt="Werk „Aus Gold geboren, im Schatten leben“ im Ausstellungssaal" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn from="right">
            <div className="h-[3px] w-12 mb-6" style={{ background: "var(--color-accent)" }} />
            <h2 className="text-3xl md:text-4xl text-ink mb-5 uppercase" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}>
              Die Werke
            </h2>
            <p className="text-base leading-relaxed text-stone">
              Im Mittelpunkt standen meine abstrakten und expressionistischen Werke, in
              denen die Primärfarben eine zentrale Rolle spielen. Mit ihren kraftvollen
              Farbkompositionen wollte ich Emotionen, Lebensfreude und Verbundenheit
              ausdrücken. Mein Ziel war es, zu zeigen, dass Kunst Menschen unabhängig von
              Sprache, Herkunft oder Kultur miteinander verbinden kann.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Baum des Lebens (Mutter) ──────────────────────────── */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="section-head">
              <h2>Baum des Lebens</h2>
              <span className="ml-auto text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-stone">
                Zwei Generationen
              </span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
            <FadeIn from="left">
              <div className="relative aspect-[4/3] overflow-hidden border-[2.5px] border-ink" style={{ boxShadow: "8px 8px 0 var(--color-tanne)" }}>
                <Image src="/ausstellung/rueckblick/baum-des-lebens.jpeg" alt="Skulpturen „Baum des Lebens“, gefertigt von der Mutter der Künstlerin, unter drei Gemälden" fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn from="right">
              <p className="text-base leading-relaxed text-stone">
                Ein besonderes Highlight war die Verbindung meiner Gemälde mit den
                Skulpturen <strong className="text-ink">„Baum des Lebens“</strong>, die
                meine Mutter in liebevoller Handarbeit gefertigt hat. Sie hat ihr Leben
                lang als Schneiderin gearbeitet und besitzt ein außergewöhnliches
                handwerkliches Talent.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone">
                Die Kombination ihrer Skulpturen mit meinen Bildern schuf einen
                einzigartigen Dialog zwischen zwei Generationen und zwei verschiedenen
                Kunstformen — von den Besucherinnen und Besuchern besonders geschätzt und
                vielfach bewundert.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Stimmen ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <FadeIn from="left" className="md:order-2">
            <div className="relative aspect-[4/3] overflow-hidden border-[2.5px] border-ink" style={{ boxShadow: "8px 8px 0 var(--color-ultramarin)" }}>
              <Image src="/ausstellung/rueckblick/gespraech.jpeg" alt="Besucherinnen im Gespräch vor dem Werk „Segel zum Licht“" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn from="right" className="md:order-1">
            <div className="h-[3px] w-12 mb-6" style={{ background: "var(--color-ultramarin)" }} />
            <h2 className="text-3xl md:text-4xl text-ink mb-5 uppercase" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}>
              Stimmen der Gäste
            </h2>
            <p className="text-base leading-relaxed text-stone">
              Zahlreiche Besucherinnen und Besucher nahmen sich Zeit, die Werke auf sich
              wirken zu lassen, stellten Fragen und teilten ihre persönlichen Eindrücke.
              Besonders gelobt wurden die harmonische Farbgestaltung, die ausdrucksstarke
              Wirkung der Primärfarben sowie die emotionale Tiefe der Werke. Viele
              beschrieben die Ausstellung als inspirierend, lebendig und voller positiver
              Energie.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Musik ─────────────────────────────────────────────── */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <FadeIn from="left">
            <div className="relative aspect-[4/3] overflow-hidden border-[2.5px] border-ink" style={{ boxShadow: "8px 8px 0 var(--color-sonne)" }}>
              <Image src="/ausstellung/rueckblick/piano.jpeg" alt="Pianistin Adelina Hashani am Flügel während der Vernissage" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn from="right">
            <div className="h-[3px] w-12 mb-6" style={{ background: "var(--color-sonne)" }} />
            <h2 className="text-3xl md:text-4xl text-ink mb-5 uppercase" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}>
              Musikalische Begleitung
            </h2>
            <p className="text-base leading-relaxed text-stone">
              Musikalisch wurde die Vernissage von zwei Studenten sowie der Pianistin
              <strong className="text-ink"> Adelina Hashani</strong> begleitet. Mit ihrem
              einfühlsamen Klavierspiel verlieh sie der Veranstaltung eine besondere
              Atmosphäre und machte den Tag zu einem unvergesslichen Erlebnis.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Impressionen (Galerie) ────────────────────────────── */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="section-head">
              <h2>Impressionen</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {[
              { src: "/ausstellung/rueckblick/saal-pferd.jpeg", alt: "Werke im historischen Saal", span: true },
              { src: "/ausstellung/rueckblick/wand-segel.jpeg", alt: "Werkwand mit maritimen Motiven" },
              { src: "/ausstellung/rueckblick/anstossen.jpeg", alt: "Gäste stoßen auf die Ausstellung an" },
              { src: "/ausstellung/rueckblick/eingang.jpeg", alt: "Eingang der Galerie mit Ausstellungsplakat" },
            ].map((img) => (
              <FadeIn key={img.src} className={img.span ? "sm:col-span-2 lg:col-span-1" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden border-[2.5px] border-ink">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mt-4 lg:mt-5">
            {["/ausstellung/rueckblick/impression-1.mp4", "/ausstellung/rueckblick/impression-2.mp4"].map((src) => (
              <FadeIn key={src}>
                <div className="border-[2.5px] border-ink overflow-hidden bg-ink">
                  <video controls preload="metadata" playsInline className="w-full h-full block">
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schluss ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-14 py-16 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="h-[3px] w-16 mx-auto mb-8" style={{ background: "linear-gradient(90deg, var(--color-tanne) 0 25%, var(--color-accent) 25% 50%, var(--color-ultramarin) 50% 75%, var(--color-sonne) 75%)" }} />
            <p className="text-xl md:text-3xl leading-[1.4] text-ink" style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.015em" }}>
              Diese Ausstellung war weit mehr als die Präsentation meiner Kunst — sie war
              die Verwirklichung eines langjährigen Traums und der Beginn eines neuen
              künstlerischen Weges.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone max-w-xl mx-auto">
              Die große Wertschätzung und das positive Feedback der Besucherinnen und
              Besucher motivieren mich, meine kreative Arbeit mit Leidenschaft fortzusetzen.
            </p>
            <p className="mt-10 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-stone">
              Vjollca Reshani · Frankfurt am Main · {datum}
            </p>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}

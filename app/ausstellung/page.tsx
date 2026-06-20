import Image from "next/image";
import type { Metadata } from "next";
import { getExhibitionInfo } from "@/sanity/lib/queries";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Ausstellung",
  description:
    "Die Kunstausstellung „Farben die verbinden“ von Vjollca Reshani — am 27. Juni 2026 in der Schweizer Straße 5, Frankfurt am Main.",
};

export const revalidate = 3600;

const VENUE = [
  { src: "/ausstellung/saal-golddecke.jpeg", alt: "Festsaal mit goldener Deckenmalerei und Kronleuchter" },
  { src: "/ausstellung/saal-holzdecke.jpeg", alt: "Saal mit kunstvoll geschnitzter Holzdecke" },
  { src: "/ausstellung/eingang-flur.jpeg",   alt: "Eingangsbereich mit Parkettboden und Blumenschmuck" },
];

const MAPS_QUERY = "Schweizer%20Stra%C3%9Fe%205%2C%2060594%20Frankfurt%20am%20Main";

export default async function AusstellungPage() {
  const exhibition = await getExhibitionInfo();
  const datum = exhibition?.datum ?? "27. Juni 2026";

  return (
    <>
      {/* Bild-Hero des Veranstaltungsorts */}
      <section className="relative h-[78svh] min-h-[480px] flex items-end overflow-hidden bg-ink">
        <Image
          src={VENUE[0].src}
          alt={VENUE[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(23,24,31,0.5) 0%, rgba(23,24,31,0.15) 40%, rgba(23,24,31,0.9) 100%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 pb-14 md:pb-20">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/80 mb-4">
            Kunstausstellung
          </p>
          <h1
            className="text-white uppercase leading-[0.92]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
          >
            Die Ausstellung
          </h1>
        </div>
      </section>

      {/* WANN / WO */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 border-[2.5px] border-ink">
              <div className="p-7 sm:p-9" style={{ background: "var(--color-accent)" }}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80 mb-2">Wann</p>
                <p className="text-3xl md:text-4xl text-white uppercase leading-none" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {datum}
                </p>
              </div>
              <div className="p-7 sm:p-9 border-t-[2.5px] sm:border-t-0 sm:border-l-[2.5px] border-ink" style={{ background: "var(--color-ultramarin)" }}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80 mb-2">Wo</p>
                <p className="text-xl md:text-2xl text-white uppercase leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.01em" }}>
                  Schweizer Straße 5<br />
                  60594 Frankfurt a. M.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Einladung */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p
              className="text-2xl md:text-3xl leading-[1.4] text-ink"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.015em" }}
            >
              Ich lade Sie herzlich zu meiner Ausstellung ein.
            </p>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-stone">
              Gezeigt werden über 30 meiner Bilder, die einen Einblick in mein aktuelles
              künstlerisches Projekt geben. Die Ausstellung findet in einem historischen Saal
              in Frankfurt-Sachsenhausen statt. Ich freue mich sehr über Ihren Besuch und
              darauf, meine Arbeiten persönlich mit Ihnen zu teilen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Veranstaltungsort — Bildergalerie */}
      <section className="px-6 lg:px-14 pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="section-head">
              <h2>Der Ort</h2>
              <span className="ml-auto text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-stone">
                Historischer Saal · Frankfurt
              </span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {VENUE.map((v, i) => (
              <FadeIn key={v.src} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <div className={`relative w-full overflow-hidden border-[2.5px] border-ink ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Anfahrt / Karte */}
      <section className="px-6 lg:px-14 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="section-head">
              <h2>Anfahrt</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14 items-start">
            <FadeIn from="left">
              <div
                className="h-[3px] w-16 mb-6"
                style={{ background: "linear-gradient(90deg, var(--color-tanne) 0 25%, var(--color-accent) 25% 50%, var(--color-ultramarin) 50% 75%, var(--color-sonne) 75%)" }}
              />
              <p className="text-lg leading-snug text-ink mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                Schweizer Straße 5<br />
                Sachsenhausen<br />
                60594 Frankfurt am Main
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink border-b-[2.5px] border-ink pb-1 hover:border-ultramarin hover:text-ultramarin transition-colors"
              >
                Route planen ↗
              </a>
            </FadeIn>
            <FadeIn from="right">
              <div className="border-[2.5px] border-ink overflow-hidden" style={{ boxShadow: "8px 8px 0 var(--color-sonne)" }}>
                <iframe
                  title="Ausstellungsort — Schweizer Straße 5, Frankfurt am Main"
                  src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                  width="100%"
                  height="380"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, display: "block" }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

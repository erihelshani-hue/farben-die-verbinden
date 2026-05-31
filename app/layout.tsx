import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://farben-die-verbinden.de"),
  title: {
    default: "Farben die verbinden — Vjollca Reshani",
    template: "%s — Farben die verbinden",
  },
  description:
    "Kunstausstellung von Vjollca Reshani. Gemälde, die durch Farbe, Natur und Emotion verbinden.",
  openGraph: {
    siteName: "Farben die verbinden",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="bg-canvas text-ink font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

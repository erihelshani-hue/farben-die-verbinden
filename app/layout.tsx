import type { Metadata } from "next";
import { Syne, Archivo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
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
    <html lang="de" className={`${syne.variable} ${archivo.variable}`}>
      <body className="bg-canvas text-ink antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

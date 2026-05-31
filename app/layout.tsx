import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Farben die verbinden — Kunstausstellung von Vjollca",
    template: "%s | Farben die verbinden",
  },
  description:
    "Eine Ausstellung von Vjollca. 13 Werke, die durch Farbe, Natur und Emotion verbinden.",
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
    <html lang="de" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-[#FAF7F2] text-[#211E1A] font-[var(--font-inter)]">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

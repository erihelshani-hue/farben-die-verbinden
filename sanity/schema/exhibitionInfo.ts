import { defineField, defineType } from "sanity";

// Singleton: Texte der Ausstellung (Hero, Story, Botschaft).
// Wird über sanity/structure.ts als einzelner Eintrag dargestellt.
export const exhibitionInfo = defineType({
  name: "exhibitionInfo",
  title: "Ausstellung",
  type: "document",
  fields: [
    defineField({
      name: "titel",
      title: "Ausstellungstitel",
      type: "string",
      description: "Erscheint als grosse Überschrift im Hero.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "einleitungstext",
      title: "Einleitungstext (Hero-Untertitel)",
      type: "text",
      rows: 3,
      description: "Kurzer Text direkt unter dem Titel auf der Startseite.",
    }),
    defineField({
      name: "story",
      title: "Story / Über die Ausstellung",
      type: "text",
      rows: 6,
      description: "Erzählender Abschnitt auf der Startseite.",
    }),
    defineField({
      name: "botschaft",
      title: "Botschaft",
      type: "text",
      rows: 6,
      description: "Die zentrale Botschaft der Ausstellung (Zitat-Block).",
    }),
    defineField({
      name: "datum",
      title: "Ausstellungsdatum",
      type: "string",
      description: "Wird prominent auf der Startseite gezeigt, z.B. „27. Juni 2026“.",
    }),
    defineField({
      name: "ort",
      title: "Ort (kurz)",
      type: "string",
      description: "Kurzform für den Hero, z.B. „Sachsenhausen · Frankfurt“.",
    }),
    defineField({
      name: "adresse",
      title: "Vollständige Adresse",
      type: "text",
      rows: 3,
      description: "Für den Ausstellungs-Block und die Kartenanzeige, z.B. „Schweizer Straße 5, 60594 Frankfurt am Main“.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Ausstellung" }),
  },
});

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
  ],
  preview: {
    prepare: () => ({ title: "Ausstellung" }),
  },
});

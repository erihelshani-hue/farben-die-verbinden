import { defineField, defineType } from "sanity";

export const artwork = defineType({
  name: "artwork",
  title: "Kunstwerk",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Pfad",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "technique",
      title: "Technik",
      type: "string",
      options: {
        list: [
          { title: "Acryl", value: "Acryl" },
          { title: "Aquarell", value: "Aquarell" },
          { title: "Öl", value: "Öl" },
          { title: "Mischtechnik", value: "Mischtechnik" },
        ],
      },
      description: "Verwendete Maltechnik.",
    }),
    defineField({
      name: "dimensions",
      title: "Maße",
      type: "string",
      description: "z.B. 80 × 60 cm",
    }),
    defineField({
      name: "year",
      title: "Jahr",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Bäume & Natur", value: "baeume-natur" },
          { title: "Abstrakt", value: "abstrakt" },
          { title: "Maritim", value: "maritim" },
          { title: "Tiere", value: "tiere" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featured",
      title: "Auf Startseite zeigen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "technique",
    },
  },
});

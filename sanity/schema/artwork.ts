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
      description: "z.B. Acryl auf Leinwand",
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
          { title: "Bäume", value: "baeume" },
          { title: "Natur", value: "natur" },
          { title: "Abstrakt", value: "abstrakt" },
          { title: "Maritim", value: "maritim" },
        ],
      },
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

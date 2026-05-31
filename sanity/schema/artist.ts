import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Künstlerin",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Kurzbiografie",
      type: "array",
      of: [{ type: "block" }],
      description: "Kurzer Text (max. 3 Absätze), erscheint im Teaser.",
    }),
    defineField({
      name: "statement",
      title: "Statement / Zitat",
      type: "text",
      rows: 3,
      description: "1–2 Sätze, als großes Zitat hervorgehoben.",
    }),
    defineField({
      name: "longBio",
      title: "Langbiografie",
      type: "array",
      of: [{ type: "block" }],
      description: "Ausführlicher Text auf der Künstlerinnen-Seite.",
    }),
    defineField({
      name: "exhibitionTitle",
      title: "Ausstellungstitel",
      type: "string",
    }),
    defineField({
      name: "exhibitionText",
      title: "Ausstellungstext",
      type: "text",
      rows: 8,
    }),
  ],
  preview: {
    select: { title: "name", media: "photo" },
  },
});

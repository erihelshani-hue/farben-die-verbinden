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
      title: "Biografie",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "statement",
      title: "Künstlerisches Statement",
      type: "text",
      rows: 6,
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

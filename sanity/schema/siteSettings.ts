import { defineField, defineType } from "sanity";

// Singleton: globale Website-Einstellungen (Kontakt, Social Links).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "kontaktEmail",
      title: "Kontakt-E-Mail",
      type: "string",
      description: "Empfänger-Adresse für Anfragen, wird auch öffentlich angezeigt.",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "telefon",
      title: "Telefon (optional)",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social-Media-Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({ name: "plattform", title: "Plattform", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "plattform", subtitle: "url" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Website-Einstellungen" }),
  },
});

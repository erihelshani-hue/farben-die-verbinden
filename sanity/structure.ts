import type { StructureResolver } from "sanity/structure";

// Übersichtliche Studio-Navigation für eine nicht-technische Redakteurin:
// Singletons (Ausstellung, Künstlerin, Einstellungen) als einzelne Einträge,
// die Werke als normale Liste.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalte")
    .items([
      S.listItem()
        .title("Ausstellung")
        .id("exhibitionInfo")
        .child(
          S.document().schemaType("exhibitionInfo").documentId("exhibitionInfo")
        ),
      S.listItem()
        .title("Künstlerin")
        .id("artist")
        .child(S.document().schemaType("artist").documentId("artist")),
      S.listItem()
        .title("Website-Einstellungen")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("artwork").title("Kunstwerke"),
    ]);

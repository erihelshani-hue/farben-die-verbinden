import { artwork } from "./artwork";
import { artist } from "./artist";
import { exhibitionInfo } from "./exhibitionInfo";
import { siteSettings } from "./siteSettings";
import type { SchemaTypeDefinition } from "sanity";

export const schemaTypes: SchemaTypeDefinition[] = [
  artwork,
  artist,
  exhibitionInfo,
  siteSettings,
];

import { client } from "./client";

export interface Artwork {
  _id: string;
  title: string;
  slug: { current: string };
  image: { asset: { _ref: string }; hotspot?: { x: number; y: number } };
  technique?: string;
  dimensions?: string;
  year?: number;
  category?: Category;
  description?: string;
  featured?: boolean;
  order?: number;
}

export type Category = "baeume-natur" | "abstrakt" | "maritim" | "tiere";

export interface Artist {
  name: string;
  photo?: { asset: { _ref: string } };
  bio?: unknown[];
  statement?: string;
  longBio?: unknown[];
  exhibitionTitle?: string;
  exhibitionText?: string;
}

export interface ExhibitionInfo {
  titel: string;
  einleitungstext?: string;
  story?: string;
  botschaft?: string;
}

export interface SocialLink {
  plattform?: string;
  url?: string;
}

export interface SiteSettings {
  kontaktEmail: string;
  telefon?: string;
  socialLinks?: SocialLink[];
}

const artworkFields = `
  _id,
  title,
  slug,
  image,
  technique,
  dimensions,
  year,
  category,
  description,
  featured,
  order
`;

export async function getAllArtworks(): Promise<Artwork[]> {
  return client.fetch(
    `*[_type == "artwork"] | order(order asc) { ${artworkFields} }`
  );
}

export async function getFeaturedArtworks(): Promise<Artwork[]> {
  return client.fetch(
    `*[_type == "artwork" && featured == true] | order(order asc) { ${artworkFields} }`
  );
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  return client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] { ${artworkFields} }`,
    { slug }
  );
}

export async function getRelatedArtworks(
  category: Category | undefined,
  excludeId: string
): Promise<Artwork[]> {
  if (!category) {
    return client.fetch(
      `*[_type == "artwork" && _id != $excludeId] | order(order asc)[0...3] { ${artworkFields} }`,
      { excludeId }
    );
  }
  return client.fetch(
    `*[_type == "artwork" && category == $category && _id != $excludeId] | order(order asc)[0...3] { ${artworkFields} }`,
    { category, excludeId }
  );
}

export async function getArtist(): Promise<Artist | null> {
  return client.fetch(`*[_type == "artist"][0]`);
}

export async function getExhibitionInfo(): Promise<ExhibitionInfo | null> {
  return client.fetch(`*[_type == "exhibitionInfo"][0]`);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

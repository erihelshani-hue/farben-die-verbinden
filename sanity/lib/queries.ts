import { client } from "./client";

export interface Artwork {
  _id: string;
  title: string;
  slug: { current: string };
  image: { asset: { _ref: string }; hotspot?: { x: number; y: number } };
  technique?: string;
  dimensions?: string;
  year?: number;
  category?: string;
  description?: string;
  featured?: boolean;
  order?: number;
}

export interface Artist {
  name: string;
  photo?: { asset: { _ref: string } };
  bio?: unknown[];
  statement?: string;
  exhibitionTitle?: string;
  exhibitionText?: string;
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

export async function getArtist(): Promise<Artist | null> {
  return client.fetch(`*[_type == "artist"][0]`);
}

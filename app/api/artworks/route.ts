import { NextResponse } from "next/server";
import { getAllArtworks } from "@/sanity/lib/queries";

export const revalidate = 3600;

export async function GET() {
  const artworks = await getAllArtworks();
  return NextResponse.json(artworks);
}

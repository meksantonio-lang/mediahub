import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

type Movie = {
  id: number;
  title: string;
  genre: string;
  cover: string | null;
  release_year: number | null;
};

export async function GET() {
  try {
    const { env } = getRequestContext();
    const db = (env as any)?.MOVIEDB as any;

    if (!db) {
      return NextResponse.json(
        { error: "D1 binding 'MOVIEDB' not found." },
        { status: 500 }
      );
    }

    const { results } = await (db
      .prepare(
        `SELECT id, title, genre, cover, release_year
         FROM movies
         ORDER BY id DESC`
      )
      .all() as Promise<{ results: Movie[] }>);

    return NextResponse.json(
      { result: results ?? [] },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movies", detail: String(error) },
      { status: 500 }
    );
  }
}
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // For Next.js on Cloudflare Pages, access bindings via globalThis
    const DB = (globalThis as any).DB || (process.env as any).DB;
    
    if (!DB) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Query movies from D1
    const { results } = await DB.prepare(
      'SELECT * FROM movies ORDER BY id DESC'
    ).all();

    return Response.json({ result: results });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return Response.json({ 
      error: 'Failed to fetch movies', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

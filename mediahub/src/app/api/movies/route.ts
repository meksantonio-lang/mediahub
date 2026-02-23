import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Try D1 first
    try {
      const DB = (globalThis as any).DB;
      if (DB) {
        const { results } = await DB.prepare(
          'SELECT * FROM movies ORDER BY id DESC'
        ).all();
        return Response.json({ result: results });
      }
    } catch (dbError) {
      console.warn('D1 query failed, falling back to PHP API:', dbError);
    }

    // Fallback to PHP API
    const response = await fetch('https://movieworld.wuaze.com/api.php?action=getMovies');
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return Response.json({ 
      result: [],
      error: 'Failed to fetch movies' 
    }, { status: 500 });
  }
}

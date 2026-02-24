export const runtime = 'edge';

const sampleMovies = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
    release_year: 2010
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: 'Action',
    cover: 'https://images.unsplash.com/photo-1495632066640-f1d475d6b18f?w=500&h=750&fit=crop',
    release_year: 2008
  },
  {
    id: 3,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    release_year: 2014
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    genre: 'Crime',
    cover: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop',
    release_year: 1994
  },
  {
    id: 5,
    title: 'The Matrix',
    genre: 'Sci-Fi',
    cover: 'https://images.unsplash.com/photo-1516573024350-2ea5fec44e47?w=500&h=750&fit=crop',
    release_year: 1999
  },
  {
    id: 6,
    title: 'Forrest Gump',
    genre: 'Drama',
    cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    release_year: 1994
  },
  {
    id: 7,
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    cover: 'https://images.unsplash.com/photo-1489599849228-bed96c3ee647?w=500&h=750&fit=crop',
    release_year: 1994
  },
  {
    id: 8,
    title: 'The Godfather',
    genre: 'Crime',
    cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    release_year: 1972
  },
  {
    id: 9,
    title: 'Avatar',
    genre: 'Sci-Fi',
    cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
    release_year: 2009
  },
  {
    id: 10,
    title: 'Titanic',
    genre: 'Romance',
    cover: 'https://images.unsplash.com/photo-1489599849228-bed96c3ee647?w=500&h=750&fit=crop',
    release_year: 1997
  }
];

export async function GET() {
  const body = JSON.stringify({ result: sampleMovies });
  return new Response(body, {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

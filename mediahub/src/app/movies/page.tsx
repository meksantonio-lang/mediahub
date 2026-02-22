"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Movie {
  id: string | number;
  title: string;
  genre: string;
  cover?: string;
  release_year?: string | number;
}

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies from your D1 database
  useEffect(() => {
    fetch('https://movieworld.wuaze.com/api.php?action=getMovies')
      .then(res => res.json())
      .then(data => {
        const moviesFromDb = data.result || [];
        setMovies(moviesFromDb);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  // Filter movies based on search + genre
  const filteredMovies = movies.filter((movie) => {
    const searchString = `${movie.title} ${movie.genre}`.toLowerCase();
    const matchesSearch = searchString.includes(query.toLowerCase());
    const matchesGenre = genre === "All" || movie.genre === genre;

    return matchesSearch && matchesGenre;
  });

  // Extract unique genres from movies
  const genres = ["All", ...new Set(movies.map(m => m.genre).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">🎬 Movies</h1>

      {/* Search Bar */}
      <div className="relative mb-6 w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-purple-500 transition-all"
        />
      </div>

      {/* Genre Filters */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${
              genre === g
                ? "bg-purple-600 border-purple-600 text-white"
                : "border-zinc-700 text-zinc-400 hover:border-purple-500 hover:text-white"
            } ${g === "18+" && genre !== g ? "hover:border-red-500 hover:text-red-500" : ""}`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="group bg-zinc-900 rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 border border-zinc-800 hover:border-purple-500/50 flex flex-col"
          >
            {/* Poster Section */}
            <div className="relative w-full aspect-[2/3] bg-zinc-800">
              <img
                src={movie.cover || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000"}
                alt={movie.title}
                className="object-cover w-full h-full"
              />
              {movie.genre === "18+" && (
                <div className="absolute top-2 right-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded">
                  18+
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-bold text-lg truncate group-hover:text-purple-400 transition-colors">
                {movie.title}
              </h2>
              <p className="text-xs text-zinc-500 mb-4">
                {movie.genre || 'Unknown'} • {movie.release_year || 'N/A'}
              </p>
              <div className="mt-auto">
                <div className="w-full bg-zinc-800 group-hover:bg-purple-600 text-center py-2 rounded-lg text-sm font-semibold transition-colors">
                  Watch Now
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredMovies.length === 0 && (
          <div className="text-center col-span-full py-20">
            <p className="text-zinc-500 text-lg">
              {movies.length === 0 ? "No movies in your library yet." : `No movies found for "${query}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
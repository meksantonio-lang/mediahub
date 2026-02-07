"use client";

import Link from "next/link";
import { useState } from "react";

const moviesData = [
  { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000" },
  { id: 2, title: "Interstellar", genre: "Sci-Fi", year: 2014, cover: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000" },
  { id: 3, title: "John Wick", genre: "Action", year: 2014, cover: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000" },
  { id: 4, title: "Avengers: Endgame", genre: "Action", year: 2019, cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000" },
  { id: 5, title: "The Godfather", genre: "Crime", year: 1972, cover: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1000" },
  { id: 6, title: "Deadpool & Wolverine", genre: "18+", year: 2024, cover: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1000" },
];

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");

  // Filter movies based on search + genre
  const filteredMovies = moviesData.filter((movie) => {
    const searchString = `${movie.title} ${movie.genre}`.toLowerCase();
    const matchesSearch = searchString.includes(query.toLowerCase());
    const matchesGenre = genre === "All" || movie.genre === genre;

    return matchesSearch && matchesGenre;
  });

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
        {["All", "Action", "Sci-Fi", "Crime", "Horror", "18+"].map((g) => (
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
                src={movie.cover}
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
                {movie.genre} • {movie.year}
              </p><div className="mt-auto">
                <div className="w-full bg-zinc-800 group-hover:bg-purple-600 text-center py-2 rounded-lg text-sm font-semibold transition-colors">
                  Watch Now
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredMovies.length === 0 && (
          <div className="text-center col-span-full py-20">
            <p className="text-zinc-500 text-lg">No movies found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
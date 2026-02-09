"use client";
export const runtime = 'edge';

import Link from "next/link";
import { ArrowLeft, Download, Heart, Play, ShieldCheck, Info } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { use, useState } from "react";

type Movie = {
  id: number;
  title: string;
  genre: string;
  year: number;
  description: string;
  image: string;
  fileUrl: string; // The hidden download path
};

// Updated with Official High-Res Posters
const movies: Movie[] = [
  { 
    id: 1, 
    title: "Inception", 
    genre: "Sci-Fi", 
    year: 2010, 
    description: "A skilled thief enters the world of dreams to steal secrets from deep within the subconscious.", 
    image: "https://image.tmdb.org/t/p/w1280/8IB9SfsvYps2UTq6SdyHhpAlZp9.jpg",
    fileUrl: "/sample-movie.mp4" 
  },
  { 
    id: 2, 
    title: "Interstellar", 
    genre: "Sci-Fi", 
    year: 2014, 
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", 
    image: "https://image.tmdb.org/t/p/w1280/rAiY_pUm9v9qvSUDZasriZdAVf6.jpg",
    fileUrl: "/sample-movie.mp4" 
  },
  { 
    id: 3, 
    title: "John Wick", 
    genre: "Action", 
    year: 2014, 
    description: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.", 
    image: "https://image.tmdb.org/t/p/w1280/h9YpYvY1X3v6S07pbnCbt9vL6f9.jpg",
    fileUrl: "/sample-movie.mp4" 
  },
  { 
    id: 4, 
    title: "Avengers: Endgame", 
    genre: "Action", 
    year: 2019, 
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.", 
    image: "https://image.tmdb.org/t/p/w1280/or06vS3STZAkB6gBr97qy3gYFvB.jpg",
    fileUrl: "/sample-movie.mp4" 
  },
];

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const movie = movies.find((m) => m.id === Number(resolvedParams.id));

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Movie not found
      </div>
    );
  }

  const favoriteStatus = isFavorite(movie.id, "movie");

  // DISGUISED DOWNLOAD LOGIC
  const handleDownload = () => {
    setIsDownloading(true);

    // Simulate "Server Handshake & Encryption"
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = movie.fileUrl;
      link.setAttribute("download", `${movie.title}_MediaHub.mp4`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 2000); // 2 second delay to make it feel "processed"
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Dynamic Background Blur */}
      <div className="absolute inset-0 h-[60vh] opacity-30 z-0">
        <img src={movie.image} alt="" className="w-full h-full object-cover blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      <nav className="relative z-10 p-6 max-w-7xl mx-auto">
        <Link href="/movies" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit">
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Library</span>
        </Link>
      </nav>

      <div className="relative z-10 px-6 md:flex gap-16 max-w-7xl mx-auto mt-4">
        {/* Poster Image */}
        <div className="w-full md:w-[400px] shrink-0 aspect-[2/3] relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
          <img src={movie.image} alt={movie.title} className="object-cover w-full h-full" />
        </div>{/* Content Section */}
        <div className="flex-1 mt-10 md:mt-0 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-purple-500/20">
              {movie.genre}
            </span>
            <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-lg text-xs font-bold border border-zinc-700">
              4K ULTRA HD
            </span>
          </div>
          
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
              {movie.title}
            </h1>
            
            <button 
              onClick={() => toggleFavorite({
                id: movie.id,
                title: movie.title,
                type: "movie",
                link: `/movies/${movie.id}`,
                image: movie.image
              })}
              className={`p-5 rounded-2xl border transition-all active:scale-90 ${
                favoriteStatus 
                ? "bg-rose-600 border-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]" 
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-rose-500 hover:text-rose-500"
              }`}
            >
              <Heart fill={favoriteStatus ? "white" : "none"} size={28} />
            </button>
          </div>

                    <div className="flex items-center gap-6 text-zinc-500 font-bold mt-6 mb-8 uppercase text-sm tracking-widest">
                      <span>{movie.year}</span>
                      <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
                      <span>2h 28m</span>
                      <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
                    </div>
          
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-12">
                      {movie.description}
                    </p>
          
                    <div className="flex gap-4">
                      <button className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-purple-600/50">
                        <Play size={24} fill="white" />
                        Watch Now
                      </button>
                      <button 
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50"
                      >
                        <Download size={24} />
                        {isDownloading ? "Processing..." : "Download"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
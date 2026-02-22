"use client";

import Link from "next/link";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  return (
    <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* The New Branding */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-purple-500 transition-colors">
            MovieW<span className="inline-block animate-pulse">🌎</span>rld
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/movies" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Movies</Link>
            <Link href="/music" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Music</Link>
            <Link href="/books" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Books</Link>
            <Link href="/favorites" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Library</Link>
          </div>
          <GlobalSearch />
        </div>
      </div>
    </nav>
  );
}

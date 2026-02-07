"use client";

import Link from "next/link";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  return (
    <nav className="w-full bg-black/90 backdrop-blur-md border-b border-white/10 z-50 sticky top-0 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-white shrink-0 hover:opacity-80 transition">
          MediaHub
        </Link>

        {/* Navigation */}
        <div className="hidden sm:flex gap-8 text-zinc-400 font-semibold text-sm uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/music" className="hover:text-white transition">Music</Link>
          <Link href="/movies" className="hover:text-white transition">Movies</Link>
          <Link href="/books" className="hover:text-white transition">Books</Link>
          <Link href="/favorites" className="hover:text-white transition text-rose-500">Favorites</Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm flex justify-end">
          <GlobalSearch />
        </div>

      </div>
    </nav>
  );
}
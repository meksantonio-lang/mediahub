"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Heart, BookOpen, CheckCircle } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  fileUrl: string;
};

const books: Book[] = [
  { 
    id: 1, 
    title: "Atomic Habits", 
    author: "James Clear",
    category: "Self-Help", 
    description: "An incredibly practical guide to breaking bad habits and building good ones. James Clear reveals exactly how these microscopic changes can grow into life-altering results.",
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    fileUrl: "/sample.pdf"
  },
  { 
    id: 2, 
    title: "The Alchemist", 
    author: "Paulo Coelho",
    category: "Fiction", 
    description: "A magical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    fileUrl: "/sample.pdf"
  }
];

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isDownloading, setIsDownloading] = useState(false);

  const book = books.find((b) => b.id === Number(resolvedParams.id));

  if (!book) return <div className="text-white text-center mt-20">Book not found</div>;

  const favoriteStatus = isFavorite(book.id, "book");

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = book.fileUrl;
      link.setAttribute("download", `${book.title}_MediaHub.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <nav className="p-8 max-w-7xl mx-auto">
        <Link href="/books" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit">
          <ArrowLeft size={20} />
          <span>Back to Library</span>
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-[350px_1fr] gap-16 mt-4">
        {/* Cover Art */}
        <div className="space-y-6">
          <div className="aspect-[2/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-400">
              <CheckCircle size={16} className="text-green-500" /> PDF + EPUB Available
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-400">
              <CheckCircle size={16} className="text-green-500" /> High Quality Print
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-purple-500 font-bold tracking-widest text-sm uppercase mb-4">{book.category}</span>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{book.title}</h1>
            <button 
              onClick={() => toggleFavorite({ id: book.id, title: book.title, type: "book", link: `/books/${book.id}`, image: book.image })}
              className={`p-4 rounded-xl border transition-all ${favoriteStatus ? "bg-rose-600 border-rose-600" : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-rose-500"}`}>
              <Heart fill={favoriteStatus ? "white" : "none"} size={24} />
            </button>
          </div>
          <p className="text-2xl text-zinc-400 font-medium mb-8">by {book.author}</p>
          
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl italic">
            "{book.description}"
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white text-black font-black py-5 px-10 rounded-2xl hover:bg-purple-600 hover:text-white transition-all min-w-[240px]"
            >
              {isDownloading ? (
                <><div className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin" /> Fetching eBook...</>
              ) : (
                <><Download size={20} /> Download PDF</>
              )}
            </button>
            <button className="flex items-center justify-center gap-3 py-5 px-10 rounded-2xl border border-zinc-800 font-bold hover:bg-zinc-900 transition-colors">
              <BookOpen size={20} /> Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
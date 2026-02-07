"use client";

import Link from "next/link";
import { Book as BookIcon } from "lucide-react";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
};

const books: Book[] = [
  { 
    id: 1, 
    title: "Atomic Habits", 
    author: "James Clear", 
    category: "Self-Help", 
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" 
  },
  { 
    id: 2, 
    title: "The Alchemist", 
    author: "Paulo Coelho", 
    category: "Fiction", 
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg" 
  },
  { 
    id: 3, 
    title: "Deep Work", 
    author: "Cal Newport", 
    category: "Productivity", 
    image: "https://m.media-amazon.com/images/I/417yjF+E5zL._SY445_SX342_.jpg" 
  },
  { 
    id: 4, 
    title: "The Psychology of Money", 
    author: "Morgan Housel", 
    category: "Finance", 
    image: "https://m.media-amazon.com/images/I/71TRu7S+vDL._SY445_SX342_.jpg" 
  }
];

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2">DIGITAL LIBRARY</h1>
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold">Premium eBooks & Resources</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="group">
              <div className="aspect-[2/3] relative rounded-xl overflow-hidden border border-zinc-800 group-hover:border-purple-500 transition-all duration-500 shadow-lg">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold bg-white text-black px-3 py-1 rounded-full flex items-center gap-2">
                    <BookIcon size={12} /> Read Details
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg group-hover:text-purple-500 transition-colors truncate">{book.title}</h3>
                <p className="text-zinc-500 text-sm font-medium">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
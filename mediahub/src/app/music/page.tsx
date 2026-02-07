"use client";

import Link from "next/link";
import { Play } from "lucide-react";

type Track = {
  id: number;
  title: string;
  artist: string;
  category: string;
  image: string;
};

// These are your starting tracks. 
// You can add more to this list following the same format.
const tracks: Track[] = [
  { 
    id: 1, 
    title: "Last Last", 
    artist: "Burna Boy", 
    category: "Afrobeats", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3d/8d/62/3d8d6265-27a9-b3a1-002f-37014490f209/075679737960.jpg/600x600bb.jpg" 
  },
  { 
    id: 2, 
    title: "Calm Down", 
    artist: "Rema", 
    category: "Afrobeats", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/91/92/79/91927977-94e8-8c10-85f0-61d53086780c/22UMGIM22312.rgb.jpg/600x600bb.jpg" 
  },
  { 
    id: 3, 
    title: "Starboy", 
    artist: "The Weeknd", 
    category: "Global Pop", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/80/37/10/8037107c-9b5d-0775-4074-68c1605a2712/16UMGIM62220.rgb.jpg/600x600bb.jpg" 
  },
  { 
    id: 4, 
    title: "Unavailable", 
    artist: "Davido", 
    category: "Afrobeats", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/44/e9/8b/44e98b3a-5829-0797-e81a-6379f82110c1/196589947938.jpg/600x600bb.jpg" 
  }
];

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Music Hub</h1>
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold">Trending Afrobeats & Global Hits</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tracks.map((track) => (
            <Link key={track.id} href={`/music/${track.id}`} className="group">
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-zinc-800 group-hover:border-purple-500 transition-all duration-500 shadow-lg bg-zinc-900">
                <img 
                  src={track.image} 
                  alt={track.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-xl">
                    <Play fill="white" size={20} className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center md:text-left">
                <h3 className="font-bold text-lg group-hover:text-purple-500 transition-colors truncate">{track.title}</h3>
                <p className="text-zinc-500 text-sm font-medium">{track.artist}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
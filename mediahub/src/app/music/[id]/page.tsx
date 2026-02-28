"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Heart, Music2, Disc } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import MusicDetailClient from "@/components/MusicDetailClient";

type Track = {
  id: number;
  title: string;
  artist: string;
  category: string;
  image: string;
  fileUrl: string;
};

const tracks: Track[] = [
  { 
    id: 1, 
    title: "Last Last", 
    artist: "Burna Boy",
    category: "Afrobeats", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3d/8d/62/3d8d6265-27a9-b3a1-002f-37014490f209/075679737960.jpg/600x600bb.jpg",
    fileUrl: "PASTE_YOUR_LINK_HERE" 
  },
  { 
    id: 2, 
    title: "Calm Down", 
    artist: "Rema",
    category: "Afrobeats", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/91/92/79/91927977-94e8-8c10-85f0-61d53086780c/22UMGIM22312.rgb.jpg/600x600bb.jpg",
    fileUrl: "PASTE_YOUR_LINK_HERE"
  },
  { 
    id: 3, 
    title: "Starboy", 
    artist: "The Weeknd",
    category: "Global Pop", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/80/37/10/8037107c-9b5d-0775-4074-68c1605a2712/16UMGIM62220.rgb.jpg/600x600bb.jpg",
    fileUrl: "PASTE_YOUR_LINK_HERE"
  },
  { 
    id: 4, 
    title: "Unavailable", 
    artist: "Davido",
    category: "Afrobeats", 
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/44/e9/8b/44e98b3a-5829-0797-e81a-6379f82110c1/196589947938.jpg/600x600bb.jpg",
    fileUrl: "PASTE_YOUR_LINK_HERE"
  }
];

export const runtime = 'edge';

export default function MusicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const track = tracks.find((t) => t.id === Number(resolvedParams.id));

  if (!track) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Track not found
      </div>
    );
  }

  return <MusicDetailClient track={track} />;
}
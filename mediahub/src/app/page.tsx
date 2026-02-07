import Hero from "@/components/Hero";
import MediaCard from "@/components/MediaCard";

export default function Home() {
  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <Hero />
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Trending Now 🔥</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <MediaCard title="Top Afrobeat Hits" category="Music" image="/images/music.jpg" />
          <MediaCard title="Action Blockbusters" category="Movies" image="/images/movies.jpg" />
          <MediaCard title="Best-Selling Novels" category="Books" image="/images/books.jpg" />
          <MediaCard title="New Movie Releases" category="Movies" image="/images/movies.jpg" />
        </div>
      </section>
    </main>
  );
}
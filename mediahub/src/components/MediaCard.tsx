import Image from "next/image";

type MediaCardProps = {
  title: string;
  category: string;
  image: string;
};

export default function MediaCard({ title, category, image }: MediaCardProps) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition cursor-pointer">
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="object-cover w-full"
      />
      <div className="p-4">
        <h3 className="font-semibold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400">{category}</p>
      </div>
    </div>
  );
}
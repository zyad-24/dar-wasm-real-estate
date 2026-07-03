import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
  id: number;
  type: string;
  title: string;
  images?: string[] | null;
  operations?: string[] | null;
};

export default function PropertyCard({
  id,
  type,
  title,
  images,
  operations,
}: PropertyCardProps) {
  const validImages = Array.isArray(images) ? images : [];
  const coverImage = validImages[0] || null;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#d6a642]/30 bg-white/5 shadow-2xl backdrop-blur">
      <h2 className="px-5 pt-5 text-center text-2xl font-bold text-[#d6a642]">
        {title}
      </h2>

      <div className="mt-3 flex justify-center gap-2">
        <span className="rounded-full border border-[#d6a642] px-4 py-1 text-sm text-[#d6a642]">
          {type}
        </span>

        {operations?.map((operation) => (
          <span
            key={operation}
            className="rounded-full bg-[#d6a642] px-3 py-1 text-sm font-bold text-[#061d26]"
          >
            {operation}
          </span>
        ))}
      </div>

      <div className="relative mx-5 my-5 h-56 overflow-hidden rounded-2xl bg-black/30">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width:768px)100vw,400px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/40">
            لا توجد صورة
          </div>
        )}
      </div>

      <div className="p-5 pt-0">
        <Link
          href={`/property/${id}`}
          className="block rounded-2xl bg-[#d6a642] py-4 text-center text-lg font-bold text-[#061d26]"
        >
          عرض الإعلان
        </Link>
      </div>
    </div>
  );
}
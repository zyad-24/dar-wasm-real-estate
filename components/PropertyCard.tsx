import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
  id: number;
  type: string;
  title: string;
  images?: string[] | null;
  operations?: string[] | null;
};

function isVideo(url: string) {
  return /\.(mp4|mov|webm|m4v)$/i.test(url.split("?")[0]);
}

export default function PropertyCard({
  id,
  type,
  title,
  images,
  operations,
}: PropertyCardProps) {
  const validImages = Array.isArray(images) ? images : [];
  const coverMedia = validImages[0] || null;
  const coverIsVideo = coverMedia ? isVideo(coverMedia) : false;
  const adNumber = `DW-${1000 + id}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#d6a642]/30 bg-white/5 shadow-2xl backdrop-blur">
      <h2 className="px-5 pt-5 text-center text-2xl font-bold text-[#d6a642]">
        {title}
      </h2>

      <p className="mt-2 text-center text-sm font-bold text-white/50">
        رقم الإعلان: {adNumber}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2 px-4">
        <span className="rounded-full border border-[#d6a642]/60 bg-transparent px-4 py-1 text-sm font-bold text-[#d6a642]">
          {type}
        </span>

        {operations?.map((operation) => (
          <span
            key={operation}
            className="rounded-full border border-[#d6a642]/60 bg-transparent px-4 py-1 text-sm font-bold text-[#d6a642]"
          >
            {operation}
          </span>
        ))}
      </div>

      <div className="relative mx-5 my-5 h-56 overflow-hidden rounded-2xl bg-black/30">
        {coverMedia ? (
          coverIsVideo ? (
            <video
              src={coverMedia}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={coverMedia}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-white/40">
            لا توجد مرفقات
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <Link
          href={`/property/${id}`}
          className="mx-auto block max-w-[240px] rounded-2xl bg-[#d6a642] py-3 text-center text-base font-bold text-[#061d26]"
        >
          عرض الإعلان
        </Link>
      </div>
    </div>
  );
}
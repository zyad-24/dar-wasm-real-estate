import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import PropertyActions from "@/components/PropertyActions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetails({ params }: PageProps) {
  const { id } = await params;

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) notFound();

  const images = property.images || [];
  const adNumber = `DW-${1000 + Number(id)}`;

  // رابط الإعلان المباشر
  const adUrl = `https://dar-wasm-real-estate.vercel.app/property/${id}`;

  return (
    <main dir="rtl" className="min-h-screen bg-[#061d26] px-5 py-8 text-white">
      <div className="mx-auto mb-8 flex max-w-md items-center justify-between">
        <Link
          href="/properties"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6a642]/40 bg-white/5 text-xl text-[#d6a642]"
        >
          ←
        </Link>

        <h1 className="text-2xl font-bold text-[#d6a642]">
          تفاصيل الإعلان
        </h1>

        <div className="w-11"></div>
      </div>

      <div className="mx-auto max-w-md">
        <ImageGallery images={images} title={property.title} />

        <span className="rounded-full border border-[#d6a642] px-4 py-1 text-sm text-[#d6a642]">
          {property.type}
        </span>

        <p className="mt-3 text-sm font-bold text-white/50">
          رقم الإعلان: {adNumber}
        </p>

        <h2 className="mt-4 text-3xl font-bold text-[#d6a642]">
          {property.title}
        </h2>

        <div className="mt-6 whitespace-pre-line rounded-3xl bg-white/5 p-5 leading-8 text-white/80">
          {property.description || "لا توجد تفاصيل إضافية"}
        </div>

        <PropertyActions
          title={property.title}
          adNumber={adNumber}
          adUrl={adUrl}
        />
      </div>
    </main>
  );
}
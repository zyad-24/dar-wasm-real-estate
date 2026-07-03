import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PropertiesSearch from "@/components/PropertiesSearch";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .eq("hidden", false)
    .order("created_at", { ascending: false });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#061d26] px-5 py-8 text-white"
    >
      <div className="mx-auto mb-8 flex max-w-md items-center justify-between">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6a642]/40 bg-white/5 text-xl text-[#d6a642]"
        >
          ←
        </Link>

        <h1 className="text-3xl font-bold text-[#d6a642]">
          جميع الإعلانات
        </h1>

        <div className="w-11"></div>
      </div>

      {error && (
        <p className="text-center text-red-300">
          حدث خطأ أثناء جلب الإعلانات
        </p>
      )}

      <div className="mx-auto max-w-md">
        <PropertiesSearch properties={properties || []} />
      </div>
    </main>
  );
}
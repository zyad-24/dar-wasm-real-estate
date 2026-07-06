import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import { ArrowUpRight, MapPinned, Navigation } from "lucide-react";

export default function LocationPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#061d26] px-5 py-8 text-white"
    >
      <SideMenu />

      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6a642]/40 bg-white/5 text-xl text-[#d6a642]"
          >
            ←
          </Link>

          <h1 className="text-3xl font-bold text-[#d6a642]">موقعنا</h1>

          <div className="w-11" />
        </div>

        <div className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-6 backdrop-blur">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d6a642]/40 bg-[#d6a642]/10">
              <MapPinned
                size={42}
                className="text-[#d6a642]"
                strokeWidth={1.8}
              />
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-[#d6a642]">
            دار وسم العقارية
          </h2>

          <p className="mt-4 text-center leading-8 text-white/75">
            يسعدنا استقبالكم في المكتب، ويمكنكم الوصول إلينا بسهولة عبر خرائط
            Google باستخدام الزر بالأسفل.
          </p>

          <a
            href="https://maps.app.goo.gl/MdmkxxbzP2DgJG6N8?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#d6a642] py-4 text-lg font-bold text-[#061d26] transition hover:opacity-90 active:scale-[0.98]"
          >
            <Navigation size={22} />
            الذهاب إلى المكتب
          </a>
        </div>
      </div>
    </main>
  );
}
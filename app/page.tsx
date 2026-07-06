import Image from "next/image";
import Link from "next/link";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#061d26] text-white"
    >
      <SideMenu />

      <Image
        src="/assets/hero-bg.png"
        alt="خلفية دار وسم العقارية"
        fill
        priority
        className="object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#061d26]/70 via-[#061d26]/60 to-[#061d26]" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <Image
          src="/assets/logo.png"
          alt="دار وسم العقارية"
          width={230}
          height={230}
          priority
          className="mb-8"
        />

        <h1 className="mb-3 text-4xl font-bold text-[#d6a642]">
          دار وسم العقارية
        </h1>

        <p className="mb-10 max-w-sm text-lg leading-8 text-white/85">
          خبرة سنين في المجال العقاري
        </p>

        <Link
          href="/properties"
          className="w-full max-w-xs rounded-2xl bg-[#d6a642] py-4 text-lg font-bold text-[#061d26] shadow-lg transition active:scale-[0.98]"
        >
          تصفح العقارات
        </Link>
      </section>
    </main>
  );
}
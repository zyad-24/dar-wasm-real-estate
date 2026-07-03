import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#061d26] text-white"
    >
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

        <p className="mb-8 max-w-sm text-lg leading-8 text-white/85">
          نساعدك في الوصول للعقار المناسب بكل سهولة واحترافية
        </p>

        <div className="flex w-full max-w-xs flex-col gap-4">
          <Link
            href="/properties"
            className="rounded-2xl bg-[#d6a642] py-4 text-lg font-bold text-[#061d26] shadow-lg"
          >
            تصفح العقارات
          </Link>

          <a
            href="https://wa.me/966504884434"
            className="rounded-2xl border border-[#d6a642] bg-white/5 py-4 text-lg font-bold text-[#d6a642] backdrop-blur"
          >
            تواصل واتساب
          </a>
        </div>
      </section>
      <nav className="fixed bottom-4 left-1/2 z-20 flex w-[90%] max-w-sm -translate-x-1/2 items-center justify-around rounded-3xl border border-[#d6a642]/30 bg-[#061d26]/80 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur">
  <Link href="/" className="text-[#d6a642]">
    الرئيسية
  </Link>

  <Link href="/properties" className="text-white/80">
    العقارات
  </Link>

  <a href="https://wa.me/966504884434" className="text-white/80">
    واتساب
  </a>
</nav>
    </main>
  );
}
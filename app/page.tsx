import Image from "next/image";
import Link from "next/link";

const services = [
  "تسويق الأراضي",
  "بيع وشراء العقارات",
  "العقود الإلكترونية",
  "الاستشارات العقارية",
];

const features = [
  "تسويق احترافي للعقار",
  "وضوح في العروض",
  "سرعة في التواصل",
  "متابعة حتى إتمام العملية",
];

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

      <section className="relative z-10 flex flex-col items-center px-6 py-16 text-center">
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
          خبرة سنين في المجال العقاري
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

        <div className="mt-14 w-full max-w-md">
          <h2 className="mb-5 text-2xl font-bold text-[#d6a642]">خدماتنا</h2>

          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-[#d6a642]/25 bg-white/5 p-5 text-sm font-bold backdrop-blur"
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 w-full max-w-md">
          <h2 className="mb-5 text-2xl font-bold text-[#d6a642]">
            لماذا دار وسم؟
          </h2>

          <div className="space-y-3 text-right">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/85 backdrop-blur"
              >
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://wa.me/966504884434"
          className="mt-12 w-full max-w-xs rounded-2xl bg-[#d6a642] py-4 text-lg font-bold text-[#061d26] shadow-lg"
        >
          ابدأ رحلتك العقارية معنا
        </a>

        <p className="mt-10 text-sm text-white/40">© دار وسم العقارية</p>
      </section>
    </main>
  );
}
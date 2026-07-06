import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import {
  BadgeCheck,
  Building2,
  FileText,
  Handshake,
} from "lucide-react";

const services = [
  {
    title: "تسويق العقارات",
    description: "نحول الفرص الى صفقات ناجحة.",
    icon: Building2,
  },
  {
    title: "استشارات عقارية",
    description: "مساعدتك في اتخاذ القرار العقاري المناسب.",
    icon: BadgeCheck,
  },
  {
    title: "عقود إلكترونية",
    description: "عقود منصة إيجار للافراد والموؤسسات.",
    icon: FileText,
  },
  {
    title: "بيع وشراء وتأجير",
    description: "خدمات عقارية متكاملة للبيع والشراء والتأجير.",
    icon: Handshake,
  },
];

export default function ServicesPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#061d26] px-5 py-8 text-white">
      <SideMenu />

      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6a642]/40 bg-white/5 text-xl text-[#d6a642]"
          >
            ←
          </Link>

          <h1 className="text-3xl font-bold text-[#d6a642]">خدماتنا</h1>
          <div className="w-11" />
        </div>

        <div className="space-y-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5 backdrop-blur"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6a642]/40 bg-[#d6a642]/10">
                  <Icon className="text-[#d6a642]" size={30} strokeWidth={1.8} />
                </div>

                <h2 className="mb-2 text-xl font-bold text-[#d6a642]">
                  {service.title}
                </h2>

                <p className="leading-7 text-white/75">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
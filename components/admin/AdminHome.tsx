import Link from "next/link";
import {
  BarChart3,
  Building2,
  Eye,
  Star,
  StarHalf,
  UserRoundCheck,
} from "lucide-react";

type AdminHomeProps = {
  totalProperties: number;
  hiddenProperties: number;
  totalReviews: number;
  averageRating: string;
  totalViews: number;
};

const cards = [
  {
    key: "properties",
    title: "إجمالي الإعلانات",
    href: "/admin/properties",
    icon: Building2,
  },
  {
    key: "hidden",
    title: "الإعلانات المخفية",
    href: "/admin/properties",
    icon: Eye,
  },
  {
    key: "reviews",
    title: "إجمالي التقييمات",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    key: "average",
    title: "متوسط التقييم",
    href: "/admin/reviews",
    icon: StarHalf,
  },
  {
    key: "views",
    title: "إجمالي المشاهدات",
    href: "/admin/stats",
    icon: BarChart3,
  },
];

export default function AdminHome({
  totalProperties,
  hiddenProperties,
  totalReviews,
  averageRating,
  totalViews,
}: AdminHomeProps) {
  const values: Record<string, string | number> = {
    properties: totalProperties,
    hidden: hiddenProperties,
    reviews: totalReviews,
    average: averageRating,
    views: totalViews,
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6a642]/40 bg-[#d6a642]/10">
            <UserRoundCheck
              className="text-[#d6a642]"
              size={30}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#d6a642]">مرحباً بك</h2>
            <p className="mt-1 text-sm text-white/60">
              نظرة عامة على نشاط الموقع
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.key}
              href={card.href}
              className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-4 transition hover:border-[#d6a642]/50 active:scale-[0.98]"
            >
              <Icon
                className="mb-4 text-[#d6a642]"
                size={28}
                strokeWidth={1.8}
              />

              <p className="text-3xl font-bold text-white">
                {values[card.key]}
              </p>

              <p className="mt-2 text-sm font-bold text-white/55">
                {card.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
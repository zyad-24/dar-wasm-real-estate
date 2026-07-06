import { Building2, EyeOff, Home, Landmark, Map, Warehouse } from "lucide-react";
import type { Property } from "./types";

type FilterType = "all" | "أرض" | "شقة" | "فيلا" | "عمارة" | "hidden";

type Props = {
  properties: Property[];
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function PropertyStats({
  properties,
  activeFilter,
  onFilterChange,
}: Props) {
  const visibleProperties = properties.filter((p) => !p.hidden);
  const hiddenProperties = properties.filter((p) => p.hidden);

  const stats = [
    { title: "كل الإعلانات", value: visibleProperties.length, icon: Building2, filter: "all" as const },
    { title: "الأراضي", value: visibleProperties.filter((p) => p.type === "أرض").length, icon: Map, filter: "أرض" as const },
    { title: "الشقق", value: visibleProperties.filter((p) => p.type === "شقة").length, icon: Home, filter: "شقة" as const },
    { title: "الفلل", value: visibleProperties.filter((p) => p.type === "فيلا").length, icon: Landmark, filter: "فيلا" as const },
    { title: "العمائر", value: visibleProperties.filter((p) => p.type === "عمارة").length, icon: Warehouse, filter: "عمارة" as const },
    { title: "المخفي", value: hiddenProperties.length, icon: EyeOff, filter: "hidden" as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;
        const active = activeFilter === item.filter;

        return (
          <button
            key={item.title}
            type="button"
            onClick={() => onFilterChange(item.filter)}
            className={`rounded-3xl border p-4 text-right transition active:scale-[0.98] ${
              active
                ? "border-[#d6a642] bg-[#d6a642] text-[#061d26]"
                : "border-[#d6a642]/20 bg-white/5 text-white"
            }`}
          >
            <Icon
              className={`mb-3 ${active ? "text-[#061d26]" : "text-[#d6a642]"}`}
              size={26}
              strokeWidth={1.8}
            />
            <p className="text-3xl font-bold">{item.value}</p>
            <p className={`mt-1 text-sm font-bold ${active ? "text-[#061d26]/70" : "text-white/55"}`}>
              {item.title}
            </p>
          </button>
        );
      })}
    </div>
  );
}
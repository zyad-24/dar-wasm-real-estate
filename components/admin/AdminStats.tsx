"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Eye,
  EyeOff,
  Home,
  Landmark,
  Map,
  Star,
  Warehouse,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Property = {
  id: number;
  type: string;
  hidden: boolean;
};

type Review = {
  id: number;
  rating: number;
};

export default function AdminStats() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("id, type, hidden");

    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("id, rating");

    setProperties(propertiesData || []);
    setReviews(reviewsData || []);
  }

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const totalViews = 0;

  const stats = [
    { title: "كل الإعلانات", value: properties.length, icon: Building2 },
    {
      title: "الأراضي",
      value: properties.filter((p) => p.type === "أرض").length,
      icon: Map,
    },
    {
      title: "الشقق",
      value: properties.filter((p) => p.type === "شقة").length,
      icon: Home,
    },
    {
      title: "الفلل",
      value: properties.filter((p) => p.type === "فيلا").length,
      icon: Landmark,
    },
    {
      title: "العمائر",
      value: properties.filter((p) => p.type === "عمارة").length,
      icon: Warehouse,
    },
    {
      title: "المخفي",
      value: properties.filter((p) => p.hidden).length,
      icon: EyeOff,
    },
    { title: "التقييمات", value: reviews.length, icon: Star },
    { title: "متوسط التقييم", value: averageRating, icon: Star },
    { title: "المشاهدات", value: totalViews, icon: Eye },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5"
          >
            <Icon className="mb-3 text-[#d6a642]" size={28} strokeWidth={1.8} />
            <p className="text-3xl font-bold text-white">{item.value}</p>
            <p className="mt-2 text-sm font-bold text-white/55">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
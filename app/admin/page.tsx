"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHome from "@/components/admin/AdminHome";

type Property = {
  id: number;
  hidden: boolean;
};

type Review = {
  id: number;
  rating: number;
};

export default function AdminPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("id, hidden");

    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("id, rating");

    setProperties(propertiesData || []);
    setReviews(reviewsData || []);
  }

  const hiddenProperties = properties.filter((item) => item.hidden).length;

  const totalViews = 0;

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <AdminLayout
      title="الرئيسية"
      subtitle="اضغط على أي بطاقة للانتقال إلى القسم الخاص بها"
    >
      <AdminHome
        totalProperties={properties.length}
        hiddenProperties={hiddenProperties}
        totalReviews={reviews.length}
        averageRating={averageRating}
        totalViews={totalViews}
      />
    </AdminLayout>
  );
}
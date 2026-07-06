"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, Trash2, UserRound } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Review = {
  id: number;
  show_name: boolean;
  name: string | null;
  phone: string;
  rating: number;
  comment: string | null;
  is_visible: boolean;
  created_at: string;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setReviews(data || []);
  }

  async function deleteReview(id: number) {
    if (!confirm("متأكد من حذف التقييم؟")) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) return alert(error.message);

    fetchReviews();
  }

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5">
          <Star className="mb-3 text-[#d6a642]" size={28} fill="currentColor" />
          <p className="text-3xl font-bold">{averageRating}</p>
          <p className="mt-1 text-sm text-white/55">متوسط التقييم</p>
        </div>

        <div className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5">
          <UserRound className="mb-3 text-[#d6a642]" size={28} />
          <p className="text-3xl font-bold">{reviews.length}</p>
          <p className="mt-1 text-sm text-white/55">عدد التقييمات</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5"
            >
              <div className="mb-3 flex gap-1 text-[#d6a642]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    fill={star <= review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p className="font-bold text-white">
                {review.show_name && review.name ? review.name : "عميل دار وسم"}
              </p>

              <p dir="ltr" className="mt-1 text-right text-sm text-white/50">
                {review.phone}
              </p>

              {review.comment && (
                <p className="mt-3 leading-8 text-white/75">{review.comment}</p>
              )}

              <button
                onClick={() => deleteReview(review.id)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500/80 py-3 font-bold text-white"
              >
                <Trash2 size={20} />
                حذف التقييم
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/60">
            لا توجد تقييمات حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
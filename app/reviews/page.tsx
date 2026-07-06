"use client";

import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import { supabase } from "@/lib/supabase";
import { MessageSquarePlus, Star, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

const quickComments = [
  "ممتاز",
  "خدمة سريعة",
  "تعامل راقٍ",
  "احترافية",
  "أنصح بالتعامل",
  "سرعة في الإنجاز",
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    setReviews(data || []);
  }

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  function toggleShowName() {
    setShowName((prev) => {
      if (prev) setName("");
      return !prev;
    });
  }

  function addQuickComment(text: string) {
    setComment((prev) => {
      if (!prev.trim()) return text;
      return `${prev}، ${text}`;
    });
  }

  async function submitReview() {
    setError("");

    const cleanPhone = phone.replace(/\s/g, "");

    if (showName && !name.trim()) {
      setError("يرجى كتابة الاسم أو إيقاف خيار إظهار الاسم.");
      return;
    }

    if (!cleanPhone) {
      setError("يرجى إدخال رقم الجوال.");
      return;
    }

    if (!/^05\d{8}$/.test(cleanPhone)) {
      setError("رقم الجوال يجب أن يكون 10 أرقام ويبدأ بـ 05.");
      return;
    }

    if (rating === 0) {
      setError("يرجى اختيار التقييم بالنجوم.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("reviews").insert({
      show_name: showName,
      name: showName ? name.trim() : null,
      phone: cleanPhone,
      rating,
      comment: comment.trim() || null,
      is_visible: true,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setOpenForm(false);
    setShowName(false);
    setName("");
    setPhone("");
    setRating(0);
    setComment("");
    fetchReviews();
  }

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

          <h1 className="text-3xl font-bold text-[#d6a642]">آراء العملاء</h1>
          <div className="w-11" />
        </div>

        <div className="mb-5 rounded-3xl border border-[#d6a642]/20 bg-white/5 p-6 text-center">
          <div className="mb-3 flex justify-center gap-1 text-[#d6a642]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} fill="currentColor" />
            ))}
          </div>

          <p className="text-4xl font-bold text-[#d6a642]">{averageRating}</p>
          <p className="mt-2 text-white/60">بناءً على {reviews.length} تقييم</p>
        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d6a642] py-4 text-lg font-bold text-[#061d26] transition active:scale-[0.98]"
        >
          <MessageSquarePlus size={22} />
          إضافة تقييم
        </button>

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

                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6a642]/10 text-[#d6a642]">
                    <UserRound size={22} />
                  </div>

                  <p className="font-bold text-white">
                    {review.show_name && review.name
                      ? review.name
                      : "عميل دار وسم"}
                  </p>
                </div>

                {review.comment && (
                  <p className="leading-8 text-white/75">{review.comment}</p>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/60">
              لا توجد تقييمات حتى الآن.
            </div>
          )}
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 px-5 py-8 backdrop-blur">
          <div className="mx-auto max-w-md rounded-3xl border border-[#d6a642]/20 bg-[#061d26] p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#d6a642]">
                إضافة تقييم
              </h2>

              <button
                onClick={() => setOpenForm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <p className="font-bold">إظهار اسمي للعامة</p>

                <button
                  type="button"
                  onClick={toggleShowName}
                  className={`h-8 w-14 rounded-full p-1 transition ${
                    showName ? "bg-[#d6a642]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white transition ${
                      showName ? "translate-x-[-24px]" : ""
                    }`}
                  />
                </button>
              </div>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!showName}
                placeholder="الاسم"
                className="w-full rounded-2xl bg-[#0d2b36] p-4 disabled:opacity-40"
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="رقم الجوال"
                inputMode="numeric"
                maxLength={10}
                className="w-full rounded-2xl bg-[#0d2b36] p-4"
              />

              <div>
                <p className="mb-3 font-bold text-[#d6a642]">التقييم</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-[#d6a642]"
                    >
                      <Star
                        size={36}
                        fill={star <= rating ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 300))}
                placeholder="ملاحظاتك"
                rows={5}
                className="w-full rounded-2xl bg-[#0d2b36] p-4"
              />

              <div className="flex flex-wrap gap-2">
                {quickComments.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => addQuickComment(item)}
                    className="rounded-full border border-[#d6a642]/40 px-4 py-2 text-sm text-[#d6a642]"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {error && (
                <p className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                onClick={submitReview}
                disabled={loading}
                className="w-full rounded-2xl bg-[#d6a642] py-4 font-bold text-[#061d26] disabled:opacity-60"
              >
                {loading ? "جاري إرسال التقييم..." : "إرسال التقييم"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
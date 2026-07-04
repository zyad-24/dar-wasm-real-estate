"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Property = {
  id: number;
  type: string;
  title: string;
  description: string | null;
  images: string[] | null;
  operations: string[] | null;
  hidden: boolean;
};

type PreviewFile = {
  file: File;
  url: string;
};

const operationOptions = ["بيع", "إيجار", "استثمار"];

export default function AdminPage() {
  const [tab, setTab] = useState<"add" | "manage">("add");
  const [properties, setProperties] = useState<Property[]>([]);
  const [type, setType] = useState("أرض");
  const [operations, setOperations] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    setProperties(data || []);
  }

  function toggleOperation(operation: string) {
    setOperations((prev) =>
      prev.includes(operation)
        ? prev.filter((item) => item !== operation)
        : [...prev, operation]
    );
  }

  function addFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeNewImage(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function removeExistingImage(index: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadImages() {
    if (files.length === 0) return [];

    const urls: string[] = [];

    for (const item of files) {
      const file = item.file;
      const fileExt = file.name.split(".").pop();
      const filePath = `properties/${Date.now()}-${Math.random()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("property-images")
        .upload(filePath, file);

      if (error) {
        alert("خطأ في رفع الصورة: " + error.message);
        return [];
      }

      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

      urls.push(data.publicUrl);
    }

    return urls;
  }

  async function saveProperty() {
    if (!title.trim()) return alert("اكتب عنوان الإعلان");

    setLoading(true);

    const uploadedImages = await uploadImages();
    const finalImages = [...existingImages, ...uploadedImages];

    const payload = {
      type,
      title,
      description,
      images: finalImages,
      operations,
    };

    const { error } = editingId
      ? await supabase.from("properties").update(payload).eq("id", editingId)
      : await supabase.from("properties").insert({
          ...payload,
          hidden: false,
        });

    setLoading(false);

    if (error) return alert(error.message);

    resetForm();
    fetchProperties();
    setTab("manage");
    alert(editingId ? "تم تعديل الإعلان" : "تم نشر الإعلان");
  }

  function resetForm() {
    setType("أرض");
    setOperations([]);
    setTitle("");
    setDescription("");
    setFiles([]);
    setExistingImages([]);
    setEditingId(null);
  }

  function startEdit(property: Property) {
    setEditingId(property.id);
    setType(property.type);
    setOperations(property.operations || []);
    setTitle(property.title);
    setDescription(property.description || "");
    setExistingImages(property.images || []);
    setFiles([]);
    setTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function toggleHidden(property: Property) {
    const { error } = await supabase
      .from("properties")
      .update({ hidden: !property.hidden })
      .eq("id", property.id);

    if (error) return alert(error.message);
    fetchProperties();
  }

  async function deleteProperty(id: number) {
    if (!confirm("متأكد من حذف الإعلان؟")) return;

    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) return alert(error.message);
    fetchProperties();
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#061d26] px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6a642]/40 bg-white/5 text-xl text-[#d6a642]"
          >
            ←
          </Link>

          <h1 className="text-3xl font-bold text-[#d6a642]">لوحة التحكم</h1>
          <div className="w-11" />
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-2xl bg-white/5 p-1">
          <button
            onClick={() => setTab("add")}
            className={`rounded-xl py-3 font-bold ${
              tab === "add" ? "bg-[#d6a642] text-[#061d26]" : "text-white/70"
            }`}
          >
            إضافة إعلان
          </button>

          <button
            onClick={() => setTab("manage")}
            className={`rounded-xl py-3 font-bold ${
              tab === "manage" ? "bg-[#d6a642] text-[#061d26]" : "text-white/70"
            }`}
          >
            إدارة الإعلانات
          </button>
        </div>

        {tab === "add" && (
          <div className="space-y-5 rounded-3xl border border-[#d6a642]/20 bg-white/5 p-6">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-2xl bg-[#0d2b36] p-4"
            >
              <option>أرض</option>
              <option>شقة</option>
              <option>فيلا</option>
              <option>عمارة</option>
            </select>

            <div>
              <p className="mb-3 font-bold text-[#d6a642]">نوع العملية</p>

              <div className="grid grid-cols-3 gap-3">
                {operationOptions.map((operation) => {
                  const isSelected = operations.includes(operation);

                  return (
                    <button
                      key={operation}
                      type="button"
                      onClick={() => toggleOperation(operation)}
                      className={`rounded-2xl border py-4 font-bold transition ${
                        isSelected
                          ? "border-[#d6a642] bg-[#d6a642] text-[#061d26]"
                          : "border-[#d6a642]/30 bg-[#0d2b36] text-white/70"
                      }`}
                    >
                      {operation}
                    </button>
                  );
                })}
              </div>
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان الإعلان"
              className="w-full rounded-2xl bg-[#0d2b36] p-4"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={7}
              placeholder="التفاصيل"
              className="w-full rounded-2xl bg-[#0d2b36] p-4"
            />

            <div>
              <p className="mb-3 font-bold text-[#d6a642]">مرفقات الإعلان</p>

              <div className="grid grid-cols-3 gap-3">
                {existingImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-24 rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <button
                      onClick={() => removeExistingImage(index)}
                      className="absolute right-1 top-1 rounded-full bg-red-500 px-2 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {files.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-24 rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.url})` }}
                  >
                    <button
                      onClick={() => removeNewImage(index)}
                      className="absolute right-1 top-1 rounded-full bg-red-500 px-2 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <label className="flex h-24 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#d6a642]/60 bg-[#0d2b36] text-center text-sm text-[#d6a642]">
                  + إضافة مرفقات
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => addFiles(e.target.files)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={saveProperty}
              disabled={loading}
              className="w-full rounded-2xl bg-[#d6a642] py-4 font-bold text-[#061d26]"
            >
              {editingId ? "حفظ التعديل" : loading ? "جاري النشر..." : "نشر الإعلان"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="w-full rounded-2xl bg-white/10 py-4 font-bold text-white"
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        )}

        {tab === "manage" && (
          <div className="space-y-4">
            {properties.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-[#d6a642]/20 bg-white/5 p-4"
              >
                <div
                  className="mb-3 h-32 rounded-2xl bg-black/30 bg-cover bg-center"
                  style={{
                    backgroundImage: p.images?.[0] ? `url(${p.images[0]})` : "",
                  }}
                />

                <p className="text-sm text-[#d6a642]">{p.type}</p>

                {p.operations && p.operations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.operations.map((operation) => (
                      <span
                        key={operation}
                        className="rounded-full bg-[#d6a642]/20 px-3 py-1 text-xs text-[#d6a642]"
                      >
                        {operation}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="mt-2 font-bold">{p.title}</h3>

                <p className="mt-1 text-sm text-white/50">
                  {p.hidden ? "مخفي" : "ظاهر"}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="rounded-xl bg-white/10 py-3"
                  >
                    تعديل
                  </button>

                  <button
                    onClick={() => toggleHidden(p)}
                    className="rounded-xl bg-[#d6a642] py-3 text-[#061d26]"
                  >
                    {p.hidden ? "إظهار" : "إخفاء"}
                  </button>

                  <button
                    onClick={() => deleteProperty(p.id)}
                    className="rounded-xl bg-red-500/80 py-3"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
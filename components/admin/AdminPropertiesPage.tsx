"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import PropertyForm from "@/components/admin/properties/PropertyForm";
import PropertyList from "@/components/admin/properties/PropertyList";
import PropertyStats from "@/components/admin/properties/PropertyStats";
import type { PreviewFile, Property } from "@/components/admin/properties/types";

type FilterType = "all" | "أرض" | "شقة" | "فيلا" | "عمارة" | "hidden";

export default function AdminPropertiesPage() {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
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

    const newFiles: PreviewFile[] = Array.from(selectedFiles).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeNewImage(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function reorderNewFiles(
    items: { id: string; url: string; type?: "image" | "video" }[]
  ) {
    setFiles((prev) =>
      items
        .map((item) => prev.find((file) => file.id === item.id))
        .filter(Boolean) as PreviewFile[]
    );
  }

  function reorderExistingImages(
    items: { id: string; url: string; type?: "image" | "video" }[]
  ) {
    setExistingImages(items.map((item) => item.url));
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
        alert("خطأ في رفع المرفق: " + error.message);
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
    setMode("list");
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
    setMode("list");
  }

  function startCreate() {
    resetForm();
    setMode("form");
  }

  function startEdit(property: Property) {
    setEditingId(property.id);
    setType(property.type);
    setOperations(property.operations || []);
    setTitle(property.title);
    setDescription(property.description || "");
    setExistingImages(property.images || []);
    setFiles([]);
    setMode("form");
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

  const filteredProperties = properties.filter((property) => {
    if (activeFilter === "hidden") return property.hidden;
    if (activeFilter === "all") return !property.hidden;
    return !property.hidden && property.type === activeFilter;
  });

  return (
    <AdminLayout
      title="إدارة إعلاناتي"
      subtitle="إضافة وتعديل وإدارة الإعلانات العقارية"
    >
      <div className="space-y-6">
        {mode === "list" && (
          <>
            <PropertyStats
              properties={properties}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            <button
              type="button"
              onClick={startCreate}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d6a642] py-4 text-lg font-bold text-[#061d26] transition active:scale-[0.98]"
            >
              <Plus size={22} />
              إضافة إعلان
            </button>

            <PropertyList
              properties={filteredProperties}
              onEdit={startEdit}
              onToggleHidden={toggleHidden}
              onDelete={deleteProperty}
            />
          </>
        )}

        {mode === "form" && (
          <PropertyForm
            type={type}
            setType={setType}
            operations={operations}
            toggleOperation={toggleOperation}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            files={files}
            existingImages={existingImages}
            addFiles={addFiles}
            removeExistingImage={removeExistingImage}
            removeNewImage={removeNewImage}
            reorderExistingImages={reorderExistingImages}
            reorderNewFiles={reorderNewFiles}
            saveProperty={saveProperty}
            resetForm={resetForm}
            editingId={editingId}
            loading={loading}
          />
        )}
      </div>
    </AdminLayout>
  );
}
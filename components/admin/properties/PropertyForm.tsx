"use client";

import PropertyMediaManager from "./PropertyMediaManager";
import PropertyOperations from "./PropertyOperations";
import type { PreviewFile } from "./types";

type Props = {
  type: string;
  setType: (value: string) => void;
  operations: string[];
  toggleOperation: (operation: string) => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  files: PreviewFile[];
  existingImages: string[];
  addFiles: (files: FileList | null) => void;
  removeExistingImage: (index: number) => void;
  removeNewImage: (index: number) => void;
  reorderExistingImages: (
    items: { id: string; url: string; type?: "image" | "video" }[]
  ) => void;
  reorderNewFiles: (
    items: { id: string; url: string; type?: "image" | "video" }[]
  ) => void;
  saveProperty: () => void;
  resetForm: () => void;
  editingId: number | null;
  loading: boolean;
};

export default function PropertyForm({
  type,
  setType,
  operations,
  toggleOperation,
  title,
  setTitle,
  description,
  setDescription,
  files,
  existingImages,
  addFiles,
  removeExistingImage,
  removeNewImage,
  reorderExistingImages,
  reorderNewFiles,
  saveProperty,
  resetForm,
  editingId,
  loading,
}: Props) {
  return (
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

      <PropertyOperations
        operations={operations}
        toggleOperation={toggleOperation}
      />

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

      <PropertyMediaManager
        existingImages={existingImages}
        files={files}
        addFiles={addFiles}
        removeExistingImage={removeExistingImage}
        removeNewImage={removeNewImage}
        reorderExistingImages={reorderExistingImages}
        reorderNewFiles={reorderNewFiles}
      />

      <button
        onClick={saveProperty}
        disabled={loading}
        className="w-full rounded-2xl bg-[#d6a642] py-4 font-bold text-[#061d26] disabled:opacity-60"
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
  );
}
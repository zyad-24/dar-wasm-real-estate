"use client";

import { Info } from "lucide-react";
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
  contactPhone: string;
  setContactPhone: (value: string) => void;
  propertyLocationUrl: string;
  setPropertyLocationUrl: (value: string) => void;
  showLocationButton: boolean;
  setShowLocationButton: (value: boolean) => void;
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
  contactPhone,
  setContactPhone,
  propertyLocationUrl,
  setPropertyLocationUrl,
  showLocationButton,
  setShowLocationButton,
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

      <div>
        <input
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="رقم التواصل"
          inputMode="numeric"
          maxLength={10}
          className="w-full rounded-2xl bg-[#0d2b36] p-4"
        />

        <div className="mt-2 flex gap-2 text-sm leading-6 text-white/55">
          <Info size={18} className="mt-1 text-[#d6a642]" />
          <p>
            اكتب الرقم بدون مسافات أو رموز، ويجب أن يبدأ بـ 05. مثال:
            0504884434
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#d6a642]">إظهار زر موقع العقار</p>
            <p className="mt-1 text-sm text-white/50">
              إذا كان مغلقًا لن يظهر زر الذهاب للعقار للعميل.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowLocationButton(!showLocationButton)}
            className={`h-8 w-14 rounded-full p-1 transition ${
              showLocationButton ? "bg-[#d6a642]" : "bg-white/20"
            }`}
          >
            <span
              className={`block h-6 w-6 rounded-full bg-white transition ${
                showLocationButton ? "translate-x-[-24px]" : ""
              }`}
            />
          </button>
        </div>

        <input
          value={propertyLocationUrl}
          onChange={(e) => setPropertyLocationUrl(e.target.value)}
          disabled={!showLocationButton}
          placeholder="رابط موقع العقار"
          className="w-full rounded-2xl bg-[#0d2b36] p-4 disabled:opacity-40"
        />

        <div className="mt-2 flex gap-2 text-sm leading-6 text-white/55">
          <Info size={18} className="mt-1 text-[#d6a642]" />
          <p>الصق رابط خرائط Google كما هو، بدون مسافات.</p>
        </div>
      </div>

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
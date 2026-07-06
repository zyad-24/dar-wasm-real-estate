import SortableMedia from "@/components/admin/SortableMedia";
import type { PreviewFile } from "./types";

type Props = {
  existingImages: string[];
  files: PreviewFile[];
  addFiles: (files: FileList | null) => void;
  removeExistingImage: (index: number) => void;
  removeNewImage: (index: number) => void;
  reorderExistingImages: (
    items: { id: string; url: string; type?: "image" | "video" }[]
  ) => void;
  reorderNewFiles: (
    items: { id: string; url: string; type?: "image" | "video" }[]
  ) => void;
};

export default function PropertyMediaManager({
  existingImages,
  files,
  addFiles,
  removeExistingImage,
  removeNewImage,
  reorderExistingImages,
  reorderNewFiles,
}: Props) {
  return (
    <div>
      <p className="mb-3 font-bold text-[#d6a642]">مرفقات الإعلان</p>

      {existingImages.length > 0 && (
        <SortableMedia
          items={existingImages.map((image) => ({
            id: image,
            url: image,
            type: image.match(/\.(mp4|mov|webm|m4v)$/i) ? "video" : "image",
          }))}
          onChange={reorderExistingImages}
          onRemove={removeExistingImage}
        />
      )}

      <div className="mt-4 grid grid-cols-3 gap-3">
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

      {files.length > 0 && (
        <div className="mt-4">
          <SortableMedia
            items={files.map((item) => ({
              id: item.id,
              url: item.url,
              type: item.type,
            }))}
            onChange={reorderNewFiles}
            onRemove={removeNewImage}
          />
        </div>
      )}
    </div>
  );
}
"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div className="mb-6 flex h-72 items-center justify-center rounded-3xl bg-black/30 text-white/40">
        لا توجد صورة
      </div>
    );
  }

  function nextImage() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div className="mb-6">
      <div className="relative h-72 overflow-hidden rounded-3xl bg-black/30">
        <Image
          src={images[current]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-white transition hover:bg-black/70"
            >
              ❯
            </button>

            <button
              onClick={nextImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-white transition hover:bg-black/70"
            >
              ❮
            </button>
          </>
        )}
      </div>

      <p className="mt-3 text-center text-sm text-white/60">
        {current + 1} / {images.length}
      </p>
    </div>
  );
}
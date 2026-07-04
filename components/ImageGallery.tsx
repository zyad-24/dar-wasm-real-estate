"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative h-72 w-full overflow-hidden rounded-3xl bg-black/30"
      >
        <Image
          src={images[current]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          priority
        />
      </button>

      {images.length > 1 && (
        <>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrent(index)}
                className={`relative h-16 min-w-20 overflow-hidden rounded-xl border ${
                  current === index
                    ? "border-[#d6a642]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <p className="mt-2 text-center text-sm text-white/60">
            {current + 1} / {images.length}
          </p>
        </>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/20 px-5 py-2 text-white"
            >
              إغلاق
            </button>

            <p className="text-sm text-white/60">
              {current + 1} / {images.length}
            </p>
          </div>

          <div className="relative flex-1 overflow-hidden rounded-3xl">
            <Image
              src={images[current]}
              alt={title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-5 py-4 text-2xl text-white"
                >
                  ›
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-5 py-4 text-2xl text-white"
                >
                  ‹
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
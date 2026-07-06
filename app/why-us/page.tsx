"use client";

import Image from "next/image";
import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import { Award, Handshake, ShieldCheck, X, FileCheck2 } from "lucide-react";
import { useState } from "react";

const reasons = [
  {
    title: "خبرة تمتد لسنوات",
    description: "معرفة عملية بالسوق العقاري واحتياجات العملاء.",
    icon: Award,
  },
  {
    title: "جودة في الخدمة",
    description: "نهتم بالتفاصيل من بداية التواصل حتى إتمام العملية.",
    icon: ShieldCheck,
  },
  {
    title: "ثقة في التعامل",
    description: "وضوح وشفافية في عرض الخيارات العقارية.",
    icon: Handshake,
  },
];

const certificates = [
  {
    title: "شهادة المعهد السعودي العقاري",
    image: "/assets/certificates/srei-certificate.jpeg",
  },
  {
    title: "رخصة فال العقارية",
    image: "/assets/certificates/fal-license.jpeg",
  },
];

export default function WhyUsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

          <h1 className="text-3xl font-bold text-[#d6a642]">لماذا دار وسم</h1>
          <div className="w-11" />
        </div>

        <div className="space-y-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5 backdrop-blur"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6a642]/40 bg-[#d6a642]/10">
                  <Icon className="text-[#d6a642]" size={30} strokeWidth={1.8} />
                </div>

                <h2 className="mb-2 text-xl font-bold text-[#d6a642]">
                  {reason.title}
                </h2>

                <p className="leading-7 text-white/75">{reason.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d6a642]/40 bg-[#d6a642]/10">
              <FileCheck2 className="text-[#d6a642]" size={26} strokeWidth={1.8} />
            </div>

            <h2 className="text-2xl font-bold text-[#d6a642]">
              شهاداتنا واعتماداتنا
            </h2>
          </div>

          <div className="space-y-5">
            {certificates.map((certificate) => (
              <button
                key={certificate.title}
                type="button"
                onClick={() => setSelectedImage(certificate.image)}
                className="w-full overflow-hidden rounded-3xl border border-[#d6a642]/25 bg-white/5 p-3 text-right backdrop-blur transition active:scale-[0.98]"
              >
                <div className="relative h-64 overflow-hidden rounded-2xl bg-black/30">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                  />
                </div>

                <p className="mt-4 text-center text-lg font-bold text-[#d6a642]">
                  {certificate.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4">
          <div className="mb-4 flex justify-start">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden rounded-3xl">
            <Image
              src={selectedImage}
              alt="وثيقة دار وسم العقارية"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
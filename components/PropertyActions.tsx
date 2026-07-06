"use client";

import { MapPinned, Send, Share2 } from "lucide-react";

type PropertyActionsProps = {
  title: string;
  adNumber: string;
  adUrl: string;
  contactPhone: string;
  propertyLocationUrl?: string | null;
  showLocationButton?: boolean;
};

export default function PropertyActions({
  title,
  adNumber,
  adUrl,
  contactPhone,
  propertyLocationUrl,
  showLocationButton,
}: PropertyActionsProps) {
  async function shareAd() {
    const shareText = `دار وسم العقارية

${title}

رقم الإعلان: ${adNumber}`;

    if (navigator.share) {
      await navigator.share({
        title,
        text: `${shareText}

${adUrl}`,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText}

${adUrl}`);
      alert("تم نسخ رابط الإعلان");
    }
  }

  const whatsappNumber = contactPhone.startsWith("05")
    ? `966${contactPhone.substring(1)}`
    : contactPhone;

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أستفسر عن الإعلان هذا:

رقم الإعلان: ${adNumber}
عنوان الإعلان: ${title}
رابط الإعلان: ${adUrl}`
  );

  return (
    <div className="mt-8 space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={shareAd}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6a642]/50 bg-white/5 text-[#d6a642] backdrop-blur transition active:scale-[0.95]"
          aria-label="مشاركة الإعلان"
        >
          <Share2 size={22} strokeWidth={2} />
        </button>
      </div>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        className="flex items-center justify-center gap-2 rounded-2xl bg-[#d6a642] py-4 text-center text-lg font-bold text-[#061d26]"
      >
        <Send size={21} />
        استفسر عن الإعلان
      </a>

      {showLocationButton && propertyLocationUrl && (
        <a
          href={propertyLocationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-[#d6a642] bg-white/5 py-4 text-center text-lg font-bold text-[#d6a642]"
        >
          <MapPinned size={22} />
          الذهاب للعقار
        </a>
      )}
    </div>
  );
}
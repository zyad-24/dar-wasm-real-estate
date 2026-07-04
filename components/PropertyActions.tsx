"use client";

type PropertyActionsProps = {
  title: string;
  adNumber: string;
};

export default function PropertyActions({ title, adNumber }: PropertyActionsProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  async function shareAd() {
    const shareText = `${title}\nرقم الإعلان: ${adNumber}\n${url}`;

    if (navigator.share) {
      await navigator.share({
        title,
        text: shareText,
        url,
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("تم نسخ رابط الإعلان");
    }
  }

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أستفسر عن الإعلان هذا:\n\nرقم الإعلان: ${adNumber}\nعنوان الإعلان: ${title}\nرابط الإعلان: ${url}`
  );

  return (
    <div className="mt-8 grid grid-cols-1 gap-3">
      <button
        onClick={shareAd}
        className="rounded-2xl border border-[#d6a642] bg-white/5 py-4 text-center text-lg font-bold text-[#d6a642]"
      >
        مشاركة الإعلان
      </button>

      <a
        href={`https://wa.me/966504884434?text=${whatsappMessage}`}
        className="rounded-2xl bg-[#d6a642] py-4 text-center text-lg font-bold text-[#061d26]"
      >
        استفسر عن الإعلان
      </a>
    </div>
  );
}
"use client";

type PropertyActionsProps = {
  title: string;
  adNumber: string;
  adUrl: string;
};

export default function PropertyActions({
  title,
  adNumber,
  adUrl,
}: PropertyActionsProps) {
  async function shareAd() {
    const shareText = `دار وسم العقارية

${title}

رقم الإعلان: ${adNumber}`;

    if (navigator.share) {
      await navigator.share({
        title,
        text: shareText,
        url: adUrl,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText}

${adUrl}`);
      alert("تم نسخ رابط الإعلان");
    }
  }

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أستفسر عن الإعلان هذا:

رقم الإعلان: ${adNumber}
عنوان الإعلان: ${title}
رابط الإعلان: ${adUrl}`
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
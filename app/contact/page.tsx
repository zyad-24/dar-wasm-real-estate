import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import { PhoneCall } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa6";

const contacts = [
  {
    title: "رقم التواصل الأول",
    displayNumber: "053 4300 343",
    phoneNumber: "0534300343",
    whatsappNumber: "966534300343",
  },
  {
    title: "رقم التواصل الثاني",
    displayNumber: "050 488 4434",
    phoneNumber: "0504884434",
    whatsappNumber: "966504884434",
  },
];

const tiktokUrl = "https://www.tiktok.com/@dar_wasm?_r=1&_t=ZS-97m8h0feyro";

export default function ContactPage() {
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

          <h1 className="text-3xl font-bold text-[#d6a642]">تواصل معنا</h1>
          <div className="w-11" />
        </div>

        <div className="space-y-5">
          {contacts.map((contact) => (
            <div
              key={contact.phoneNumber}
              className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5 backdrop-blur"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6a642]/40 bg-[#d6a642]/10">
                  <PhoneCall
                    className="text-[#d6a642]"
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-white/50">
                    {contact.title}
                  </p>
                  <p
                    dir="ltr"
                    className="mt-1 text-right text-2xl font-bold tracking-wide text-white"
                  >
                    {contact.displayNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 font-bold text-white transition active:scale-[0.98]"
                >
                  <FaWhatsapp size={22} />
                  واتساب
                </a>

                <a
                  href={`tel:${contact.phoneNumber}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#d6a642] py-4 font-bold text-[#061d26] transition active:scale-[0.98]"
                >
                  <PhoneCall size={20} strokeWidth={2.2} />
                  اتصال
                </a>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-[#d6a642]/20 bg-white/5 p-5 backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6a642]/40 bg-black">
                <FaTiktok className="text-white" size={28} />
              </div>

              <div>
                <p className="text-sm font-bold text-white/50">
                  حسابنا في تيك توك
                </p>
                <p
                  dir="ltr"
                  className="mt-1 text-left text-2xl font-bold tracking-wide text-white"
                >
                  @dar_wasm
                </p>
              </div>
            </div>

            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-black py-4 font-bold text-white transition active:scale-[0.98]"
            >
              <FaTiktok size={22} />
              زيارة الحساب
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
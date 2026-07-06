"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Home,
  LayoutDashboard,
  MapPinned,
  Menu,
  MessageSquareQuote,
  PhoneCall,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { title: "الرئيسية", href: "/", icon: Home },
  { title: "خدماتنا", href: "/services", icon: BriefcaseBusiness },
  { title: "لماذا دار وسم", href: "/why-us", icon: ShieldCheck },
  { title: "آراء العملاء", href: "/reviews", icon: MessageSquareQuote },
  { title: "تواصل معنا", href: "/contact", icon: PhoneCall },
  { title: "موقعنا", href: "/location", icon: MapPinned },
];

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-5 top-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#d6a642]/50 bg-[#061d26]/80 text-[#d6a642] shadow-lg backdrop-blur"
      >
        <Menu size={26} />
      </button>

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        />
      )}

      <aside
        dir="rtl"
        className={`fixed left-0 top-0 z-50 h-screen w-[82%] max-w-sm overflow-y-auto border-r border-[#d6a642]/25 bg-[#111]/95 px-5 py-4 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mb-5 flex flex-col items-center text-center">
          <Image
            src="/assets/logo.png"
            alt="دار وسم العقارية"
            width={95}
            height={95}
            className="mb-2"
          />

          <h2 className="text-2xl font-bold text-white">دار وسم</h2>
          <p className="text-sm font-bold text-[#d6a642]">العقارية</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-lg font-bold text-white transition hover:border-[#d6a642]/40 hover:bg-white/[0.05] active:scale-[0.98]"
              >
                <Icon
                  className="text-[#d6a642]"
                  size={28}
                  strokeWidth={1.8}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6">
          <div className="mx-auto mb-4 h-px w-32 bg-[#d6a642]/30" />

          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-3 rounded-2xl border border-[#d6a642]/35 bg-[#d6a642]/10 px-4 py-3 text-base font-bold text-[#d6a642] transition hover:bg-[#d6a642]/20 active:scale-[0.98]"
          >
            <LayoutDashboard size={22} strokeWidth={2} />
            <span>الإدارة</span>
          </Link>
        </div>

        <div className="mt-6 pb-4 text-center text-xs text-white/45">
          <div className="mx-auto mb-3 h-px w-32 bg-[#d6a642]/30" />
          <p>الإصدار 2.0</p>
          <p className="mt-1">© دار وسم العقارية</p>
        </div>
      </aside>
    </>
  );
}
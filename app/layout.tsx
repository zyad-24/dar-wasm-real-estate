import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "دار وسم العقارية",
  description:
    "تسويق الأراضي • بيع وشراء • عقود إلكترونية • استشارات عقارية",

  openGraph: {
    title: "دار وسم العقارية",
    description:
      "تسويق الأراضي • بيع وشراء • عقود إلكترونية • استشارات عقارية",
    images: ["/assets/og-image.png"],
    type: "website",
    locale: "ar_SA",
  },

  twitter: {
    card: "summary_large_image",
    title: "دار وسم العقارية",
    description:
      "تسويق الأراضي • بيع وشراء • عقود إلكترونية • استشارات عقارية",
    images: ["/assets/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
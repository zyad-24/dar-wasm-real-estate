import AdminMenu from "@/components/admin/AdminMenu";

type AdminLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AdminLayout({
  title,
  subtitle,
  children,
}: AdminLayoutProps) {
  return (
    <main dir="rtl" className="min-h-screen bg-[#061d26] px-5 py-8 text-white">
      <AdminMenu />

      <div className="mx-auto max-w-5xl">
        <div className="mb-8 pt-14 text-center">
          <h1 className="text-3xl font-bold text-[#d6a642]">{title}</h1>

          {subtitle && (
            <p className="mt-3 text-sm leading-7 text-white/60">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </main>
  );
}
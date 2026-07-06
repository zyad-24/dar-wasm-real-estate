import AdminLayout from "@/components/admin/AdminLayout";
import AdminStats from "@/components/admin/AdminStats";

export default function AdminStatsRoute() {
  return (
    <AdminLayout
      title="الإحصائيات"
      subtitle="نظرة عامة على أرقام الإعلانات والتقييمات"
    >
      <AdminStats />
    </AdminLayout>
  );
}
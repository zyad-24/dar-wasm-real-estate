import AdminLayout from "@/components/admin/AdminLayout";
import AdminReviews from "@/components/admin/AdminReviews";

export default function AdminReviewsRoute() {
  return (
    <AdminLayout
      title="مراجعة التقييمات"
      subtitle="عرض تقييمات العملاء وحذف غير المناسب منها"
    >
      <AdminReviews />
    </AdminLayout>
  );
}
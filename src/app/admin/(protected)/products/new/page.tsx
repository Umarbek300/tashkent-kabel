import { prisma } from "@/lib/prisma";
import { AdminProductForm } from "@/components/AdminProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, nameUz: true },
  });
  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Yangi mahsulot</h1>
      <AdminProductForm categories={categories} />
    </div>
  );
}

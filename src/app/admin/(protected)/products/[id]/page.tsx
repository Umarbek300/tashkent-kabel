import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminProductForm } from "@/components/AdminProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, nameUz: true } }),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Mahsulotni tahrirlash</h1>
      <AdminProductForm product={product} categories={categories} />
    </div>
  );
}

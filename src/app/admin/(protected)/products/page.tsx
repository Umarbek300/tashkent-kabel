import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { unitLabel } from "@/i18n";
import { ProductImage } from "@/components/ProductImage";
import { ConfirmButton } from "@/components/ConfirmButton";
import { deleteProductAction, toggleProductActiveAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminProducts({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q = "", cat = "" } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, nameUz: true } }),
    prisma.product.findMany({
      where: {
        ...(cat ? { categoryId: cat } : {}),
        ...(q
          ? {
              OR: [
                { nameUz: { contains: q, mode: "insensitive" as const } },
                { nameRu: { contains: q, mode: "insensitive" as const } },
                { nameEn: { contains: q, mode: "insensitive" as const } },
                { brand: { contains: q, mode: "insensitive" as const } },
                { sku: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {}),
      },
      orderBy: [{ categoryId: "asc" }, { sortOrder: "asc" }],
      take: 300,
      include: { category: { select: { nameUz: true, icon: true } } },
    }),
  ]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <form className="flex flex-1 gap-2" action="/admin/products">
          <input name="q" defaultValue={q} className="field flex-1" placeholder="Nomi, brend yoki artikul…" />
          {cat && <input type="hidden" name="cat" value={cat} />}
          <button type="submit" className="btn-ghost px-4 py-2.5 text-sm">Qidirish</button>
        </form>
        <Link href="/admin/products/new" className="btn-primary px-4 py-2.5 text-sm">+ Yangi mahsulot</Link>
      </div>

      <div className="no-scrollbar -mx-3 mb-3 flex gap-2 overflow-x-auto px-3">
        <Link
          href="/admin/products"
          className={`shrink-0 rounded-full border px-3.5 py-2 text-xs ${!cat ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]" : ""}`}
          style={!cat ? undefined : { borderColor: "var(--border)", background: "var(--surface)" }}
        >
          Hammasi
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/admin/products?cat=${c.id}`}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-xs ${cat === c.id ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]" : ""}`}
            style={cat === c.id ? undefined : { borderColor: "var(--border)", background: "var(--surface)" }}
          >
            {c.nameUz}
          </Link>
        ))}
      </div>

      <div className="mb-2 text-xs muted">{products.length} ta mahsulot</div>

      <div className="flex flex-col gap-2">
        {products.map((p) => (
          <div key={p.id} className="card flex items-center gap-3 p-2.5">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <ProductImage src={p.image} alt={p.nameUz} seed={p.slug} icon={p.category.icon} rounded="rounded-none" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="line-1 text-sm font-semibold">{p.nameUz}</div>
              <div className="line-1 text-xs muted">
                {p.category.nameUz}
                {p.brand ? ` · ${p.brand}` : ""} · {p.stock} {unitLabel(p.unit, "uz")}
              </div>
              <div className="text-xs font-bold">
                {formatPrice(p.price)} so'm
                {!p.isActive && <span className="ml-2 font-medium text-red-500">yashirilgan</span>}
                {p.isFeatured && <span className="ml-2 font-medium text-amber-600">⭐</span>}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <form action={toggleProductActiveAction}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" title={p.isActive ? "Yashirish" : "Ko'rsatish"} className="btn-ghost px-2.5 py-2 text-xs">
                  {p.isActive ? "👁" : "🙈"}
                </button>
              </form>
              <Link href={`/admin/products/${p.id}`} className="btn-ghost px-2.5 py-2 text-xs">✏️</Link>
              <form action={deleteProductAction}>
                <input type="hidden" name="id" value={p.id} />
                <ConfirmButton
                  className="btn-ghost px-2.5 py-2 text-xs !text-red-500"
                  message={`"${p.nameUz}" o'chirilsinmi?`}
                >
                  🗑
                </ConfirmButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

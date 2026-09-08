import { prisma } from "@/lib/prisma";
import { ProductImage } from "@/components/ProductImage";
import { ConfirmButton } from "@/components/ConfirmButton";
import { ImageField } from "@/components/ImageField";
import { deleteCategoryAction, saveCategoryAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <details className="card mb-4 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Yangi kategoriya qo'shish</summary>
        <form action={saveCategoryAction} className="mt-4 grid gap-3 md:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-xs muted">Nomi (o'zbekcha) *</span>
            <input name="nameUz" className="field" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Ruscha</span>
            <input name="nameRu" className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Inglizcha</span>
            <input name="nameEn" className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Emoji</span>
            <input name="icon" className="field" placeholder="🧱" />
          </label>
          <div className="md:col-span-2">
            <ImageField name="image" label="Kategoriya rasmi" />
          </div>
          <label className="block">
            <span className="mb-1 block text-xs muted">Tartib</span>
            <input name="sortOrder" type="number" className="field" defaultValue={categories.length} />
          </label>
          <label className="flex items-center gap-2 text-sm md:col-span-3">
            <input type="checkbox" name="isActive" defaultChecked className="h-4 w-4" />
            Saytda ko'rinsin
          </label>
          <button type="submit" className="btn-primary py-3 text-sm md:col-span-3">Qo'shish</button>
        </form>
      </details>

      <div className="flex flex-col gap-2">
        {categories.map((c) => (
          <details key={c.id} className="card p-2.5">
            <summary className="flex cursor-pointer items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <ProductImage src={c.image} alt={c.nameUz} seed={c.slug} icon={c.icon} rounded="rounded-none" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="line-1 text-sm font-semibold">{c.nameUz}</div>
                <div className="text-xs muted">
                  {c._count.products} ta mahsulot
                  {!c.isActive && <span className="ml-2 text-red-500">yashirilgan</span>}
                </div>
              </div>
              <span className="pr-1 text-xs muted">tahrirlash ▾</span>
            </summary>

            <form action={saveCategoryAction} className="mt-3 grid gap-3 border-t pt-3 md:grid-cols-3" style={{ borderColor: "var(--border)" }}>
              <input type="hidden" name="id" value={c.id} />
              <label className="block">
                <span className="mb-1 block text-xs muted">Nomi (o'zbekcha)</span>
                <input name="nameUz" className="field" defaultValue={c.nameUz} required />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs muted">Ruscha</span>
                <input name="nameRu" className="field" defaultValue={c.nameRu} />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs muted">Inglizcha</span>
                <input name="nameEn" className="field" defaultValue={c.nameEn} />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs muted">Emoji</span>
                <input name="icon" className="field" defaultValue={c.icon ?? ""} />
              </label>
              <div className="md:col-span-2">
                <ImageField name="image" defaultValue={c.image} label="Kategoriya rasmi" />
              </div>
              <label className="block">
                <span className="mb-1 block text-xs muted">Tartib</span>
                <input name="sortOrder" type="number" className="field" defaultValue={c.sortOrder} />
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-3">
                <input type="checkbox" name="isActive" defaultChecked={c.isActive} className="h-4 w-4" />
                Saytda ko'rinsin
              </label>
              <div className="flex gap-2 md:col-span-3">
                <button type="submit" className="btn-primary flex-1 py-2.5 text-sm">Saqlash</button>
              </div>
            </form>

            <form action={deleteCategoryAction} className="mt-2">
              <input type="hidden" name="id" value={c.id} />
              <ConfirmButton
                className="btn-ghost w-full py-2.5 text-sm !text-red-500"
                message={`"${c.nameUz}" va uning ${c._count.products} ta mahsuloti o'chiriladi. Davom etilsinmi?`}
              >
                🗑 Kategoriyani o'chirish
              </ConfirmButton>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}

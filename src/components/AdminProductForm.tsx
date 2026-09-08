import Link from "next/link";
import { saveProductAction } from "@/app/admin/actions";

const UNITS = [
  ["piece", "dona"],
  ["kg", "kg"],
  ["ton", "tonna"],
  ["m2", "m²"],
  ["m3", "m³"],
  ["m", "metr"],
  ["liter", "litr"],
  ["bag", "qop"],
  ["roll", "rulon"],
  ["pack", "upakovka"],
  ["set", "komplekt"],
];

type Product = {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  descUz: string | null;
  descRu: string | null;
  descEn: string | null;
  sku: string | null;
  brand: string | null;
  price: number;
  oldPrice: number | null;
  unit: string;
  stock: number;
  image: string | null;
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
};

export function AdminProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: { id: string; nameUz: string }[];
}) {
  const p = product;

  return (
    <form action={saveProductAction} className="flex flex-col gap-3">
      {p && <input type="hidden" name="id" value={p.id} />}

      <div className="card p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide muted">Nomi</div>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-xs muted">O'zbekcha *</span>
            <input name="nameUz" className="field" defaultValue={p?.nameUz ?? ""} required />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Ruscha</span>
            <input name="nameRu" className="field" defaultValue={p?.nameRu ?? ""} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Inglizcha</span>
            <input name="nameEn" className="field" defaultValue={p?.nameEn ?? ""} />
          </label>
        </div>

        <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide muted">Tavsif</div>
        <div className="grid gap-3 md:grid-cols-3">
          <textarea name="descUz" className="field min-h-24 resize-none" placeholder="O'zbekcha" defaultValue={p?.descUz ?? ""} />
          <textarea name="descRu" className="field min-h-24 resize-none" placeholder="Ruscha" defaultValue={p?.descRu ?? ""} />
          <textarea name="descEn" className="field min-h-24 resize-none" placeholder="Inglizcha" defaultValue={p?.descEn ?? ""} />
        </div>
      </div>

      <div className="card p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-xs muted">Kategoriya *</span>
            <select name="categoryId" className="field" defaultValue={p?.categoryId ?? ""} required>
              <option value="" disabled>Tanlang…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nameUz}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Brend</span>
            <input name="brand" className="field" defaultValue={p?.brand ?? ""} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Artikul (SKU)</span>
            <input name="sku" className="field" defaultValue={p?.sku ?? ""} />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs muted">Narx (so'm) *</span>
            <input name="price" type="number" min="0" className="field" defaultValue={p?.price ?? 0} required />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Eski narx (chegirma uchun)</span>
            <input name="oldPrice" type="number" min="0" className="field" defaultValue={p?.oldPrice ?? ""} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">O'lchov birligi</span>
            <select name="unit" className="field" defaultValue={p?.unit ?? "piece"}>
              {UNITS.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs muted">Ombordagi soni</span>
            <input name="stock" type="number" min="0" className="field" defaultValue={p?.stock ?? 0} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs muted">Tartib raqami</span>
            <input name="sortOrder" type="number" className="field" defaultValue={p?.sortOrder ?? 0} />
          </label>
          <label className="block md:col-span-1">
            <span className="mb-1 block text-xs muted">Rasm havolasi (URL)</span>
            <input name="image" className="field" placeholder="https://…" defaultValue={p?.image ?? ""} />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked={p ? p.isActive : true} className="h-4 w-4" />
            Saytda ko'rinsin
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isFeatured" defaultChecked={p?.isFeatured ?? false} className="h-4 w-4" />
            Tavsiya etilganlar ro'yxatida
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1 py-3 text-sm">Saqlash</button>
        <Link href="/admin/products" className="btn-ghost px-5 py-3 text-center text-sm">Bekor qilish</Link>
      </div>
    </form>
  );
}

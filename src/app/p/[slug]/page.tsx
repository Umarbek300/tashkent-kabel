import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale } from "@/lib/locale-server";
import { getProductBySlug, getRelated } from "@/lib/catalog";
import { t, unitLabel } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/ProductImage";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { ProductRow } from "@/components/ProductRow";
import { FavButton } from "@/components/FavButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const p = await getProductBySlug(slug, locale);
  return {
    title: p ? `${p.name} — Tashkent Kabel` : "Tashkent Kabel",
    description: p?.desc || undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const d = t(locale);

  const p = await getProductBySlug(slug, locale);
  if (!p) notFound();

  const related = await getRelated(p.category.id, p.id, locale, 10);

  const line = {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    unit: p.unit,
    image: p.image,
    icon: p.icon,
  };

  const discount =
    p.oldPrice && p.oldPrice > p.price
      ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
      : 0;

  return (
    <div className="pb-4">
      <div className="mb-3 mt-1 flex items-center gap-2">
        <Link
          href={`/c/${p.category.slug}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          aria-label={d.back}
        >
          ‹
        </Link>
        <span className="line-1 text-sm muted">{p.category.name}</span>
      </div>

      <div className="card relative overflow-hidden">
        <div className="aspect-square w-full">
          <ProductImage src={p.image} alt={p.name} seed={p.slug} icon={p.icon} rounded="rounded-none" />
        </div>
        <div className="absolute right-3 top-3">
          <FavButton item={line} />
        </div>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
            −{discount}%
          </span>
        )}
      </div>

      <div className="mt-4 px-0.5">
        {p.brand && (
          <div className="text-xs font-semibold uppercase tracking-wide muted">{p.brand}</div>
        )}
        <h1 className="mt-1 text-[22px] font-bold leading-tight">{p.name}</h1>

        <div className="mt-3 flex items-end gap-2">
          <div className="text-[26px] font-extrabold leading-none">
            {formatPrice(p.price)}{" "}
            <span className="text-sm font-semibold muted">
              {d.som}/{unitLabel(p.unit, locale)}
            </span>
          </div>
          {discount > 0 && (
            <div className="pb-1 text-sm line-through muted">{formatPrice(p.oldPrice!)}</div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span
            className={`rounded-full px-2.5 py-1 font-semibold ${
              p.stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
          >
            {p.stock > 0 ? `${d.inStock} · ${p.stock}` : d.outOfStock}
          </span>
          {p.sku && (
            <span className="rounded-full px-2.5 py-1 muted" style={{ background: "var(--surface-2)" }}>
              {d.sku}: {p.sku}
            </span>
          )}
        </div>

      </div>

      <ProductBuyBox line={line} stock={p.stock} />

      {p.desc && (
        <div className="card mt-4 p-4">
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide muted">
            {d.description}
          </div>
          <p className="text-sm leading-relaxed">{p.desc}</p>
        </div>
      )}

      <ProductRow
        title={p.category.name}
        icon={p.category.icon}
        href={`/c/${p.category.slug}`}
        seeAllLabel={d.seeAll}
        products={related}
      />
    </div>
  );
}

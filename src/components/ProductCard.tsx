"use client";

import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { QtyButton } from "./QtyButton";
import { FavButton } from "./FavButton";
import { useLocale } from "./providers";
import { formatPrice } from "@/lib/format";
import { unitLabel } from "@/i18n";

export type CardProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice: number | null;
  unit: string;
  image: string | null;
  icon: string | null;
  stock: number;
  brand: string | null;
};

export function ProductCard({ p }: { p: CardProduct }) {
  const { locale, t } = useLocale();
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
    <Link
      href={`/p/${p.slug}`}
      className="card group flex flex-col overflow-hidden transition active:scale-[0.985]"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <ProductImage src={p.image} alt={p.name} seed={p.slug} icon={p.icon} rounded="rounded-none" />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-semibold text-white">
              −{discount}%
            </span>
          )}
          {p.stock <= 0 && (
            <span className="rounded-full bg-[var(--color-ink-700)] px-2 py-0.5 text-[11px] font-medium text-white">
              {t.outOfStock}
            </span>
          )}
        </div>
        <div className="absolute right-2 top-2">
          <FavButton item={line} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        {p.brand && (
          <span className="text-[11px] font-medium uppercase tracking-wide muted">{p.brand}</span>
        )}
        <h3 className="line-2 text-[13px] font-medium leading-snug">{p.name}</h3>

        <div className="mt-auto pt-2">
          {discount > 0 && (
            <div className="text-[11px] line-through muted">{formatPrice(p.oldPrice!)}</div>
          )}
          <div className="whitespace-nowrap text-[15px] font-bold leading-tight">
            {formatPrice(p.price)}
          </div>
          <div className="text-[11px] font-medium leading-tight muted">
            {t.som}/{unitLabel(p.unit, locale)}
          </div>
          <div className="mt-2 flex justify-end">
            <QtyButton line={line} />
          </div>
        </div>
      </div>
    </Link>
  );
}

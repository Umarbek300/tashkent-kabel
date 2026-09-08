import Link from "next/link";
import { ProductCard, type CardProduct } from "./ProductCard";

/** Sarlavha + gorizontal siljiydigan mahsulotlar qatori. */
export function ProductRow({
  title,
  icon,
  href,
  seeAllLabel,
  products,
}: {
  title: string;
  icon?: string | null;
  href?: string;
  seeAllLabel: string;
  products: CardProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="mt-6">
      <div className="mb-2.5 flex items-center justify-between gap-3 px-0.5">
        <h2 className="flex items-center gap-2 text-[17px] font-bold leading-tight">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="line-1">{title}</span>
        </h2>
        {href && (
          <Link
            href={href}
            className="shrink-0 rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-700)]"
          >
            {seeAllLabel} →
          </Link>
        )}
      </div>

      <div className="no-scrollbar -mx-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-3 pb-1">
        {products.map((p) => (
          <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[23%]">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

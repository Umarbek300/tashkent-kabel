import { getLocale } from "@/lib/locale-server";
import { searchProducts, getCategories } from "@/lib/catalog";
import { t, productsCount } from "@/i18n";
import { ProductGrid } from "@/components/ProductGrid";
import { EmptyState } from "@/components/EmptyState";
import { CategoryTile } from "@/components/CategoryTile";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const locale = await getLocale();
  const d = t(locale);

  if (!q.trim()) {
    const categories = await getCategories(locale);
    return (
      <div className="pb-4">
        <h1 className="mb-3 mt-1 px-0.5 text-xl font-bold">{d.search}</h1>
        <p className="mb-3 px-0.5 text-sm muted">{d.searchPlaceholder}</p>
        <div className="columns-2 gap-2.5 sm:columns-3 md:columns-4">
          {categories.map((c) => (
            <div key={c.id} className="mb-2.5 break-inside-avoid">
              <CategoryTile c={c} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const products = await searchProducts(q, locale);

  return (
    <div className="pb-4">
      <h1 className="mb-1 mt-1 px-0.5 text-xl font-bold">
        {d.search}: <span className="text-[var(--color-brand-600)]">{q}</span>
      </h1>
      {products.length === 0 ? (
        <EmptyState
          icon="🔍"
          title={d.nothingFound}
          hint={d.searchPlaceholder}
          actionHref="/catalog"
          actionLabel={d.goShopping}
        />
      ) : (
        <>
          <div className="mb-3 px-0.5 text-xs muted">{productsCount(products.length, locale)}</div>
          <ProductGrid products={products} />
        </>
      )}
    </div>
  );
}

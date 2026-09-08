import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getLocale } from "@/lib/locale-server";
import {
  getCategoryBrands,
  getCategoryBySlug,
  getCategoryPriceRange,
  getCategoryProducts,
  type SortKey,
} from "@/lib/catalog";
import { t, productsCount } from "@/i18n";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";

export const dynamic = "force-dynamic";

type Params = { slug: string };
type Search = { sort?: string; brand?: string; min?: string; max?: string };

const SORT_KEYS: SortKey[] = ["popular", "cheap", "expensive", "newest"];

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const c = await getCategoryBySlug(slug, locale);
  return { title: c ? `${c.name} — Tashkent Kabel` : "Tashkent Kabel" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const locale = await getLocale();
  const d = t(locale);

  const category = await getCategoryBySlug(slug, locale);
  if (!category) notFound();

  const sort = (SORT_KEYS as string[]).includes(sp.sort ?? "")
    ? (sp.sort as SortKey)
    : "popular";
  const min = sp.min ? Number(sp.min) : undefined;
  const max = sp.max ? Number(sp.max) : undefined;

  const [products, brands, range] = await Promise.all([
    getCategoryProducts(category.id, locale, {
      sort,
      brand: sp.brand,
      min: Number.isFinite(min) ? min : undefined,
      max: Number.isFinite(max) ? max : undefined,
    }),
    getCategoryBrands(category.id),
    getCategoryPriceRange(category.id),
  ]);

  return (
    <div className="pb-4">
      <div className="mb-3 mt-1 flex items-center gap-2">
        <Link
          href="/catalog"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          aria-label={d.back}
        >
          ‹
        </Link>
        <h1 className="flex min-w-0 items-center gap-2 text-xl font-bold">
          {category.icon && <span>{category.icon}</span>}
          <span className="line-1">{category.name}</span>
        </h1>
      </div>

      <Suspense fallback={null}>
        <FilterBar brands={brands} range={range} />
      </Suspense>

      {products.length === 0 ? (
        <EmptyState icon="🔍" title={d.nothingFound} hint={d.filters} />
      ) : (
        <>
          <div className="mb-2 px-0.5 text-xs muted">{productsCount(products.length, locale)}</div>
          <ProductGrid products={products} />
        </>
      )}
    </div>
  );
}

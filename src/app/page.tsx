import { getLocale } from "@/lib/locale-server";
import { getCategories, getFeatured, getShowcaseSections } from "@/lib/catalog";
import { t } from "@/i18n";
import { CategoryTile } from "@/components/CategoryTile";
import { ProductRow } from "@/components/ProductRow";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getLocale();
  const d = t(locale);

  const [categories, featured, sections] = await Promise.all([
    getCategories(locale),
    getFeatured(locale, 12),
    getShowcaseSections(locale, 10, 8),
  ]);

  return (
    <div className="pb-4">
      {/* Kategoriyalar */}
      <section className="mt-1">
        <h2 className="mb-2.5 px-0.5 text-[17px] font-bold">{d.categories}</h2>
        <div className="columns-2 gap-2.5 sm:columns-3 md:columns-4">
          {categories.map((c, i) => (
            <div key={c.id} className="mb-2.5 break-inside-avoid">
              <CategoryTile c={c} tall={i % 3 === 0} />
            </div>
          ))}
        </div>
      </section>

      <ProductRow
        title={d.featured}
        icon="⭐"
        seeAllLabel={d.seeAll}
        products={featured}
      />

      {sections.map((s) => (
        <ProductRow
          key={s.category.id}
          title={s.category.name}
          icon={s.category.icon}
          href={`/c/${s.category.slug}`}
          seeAllLabel={d.seeAll}
          products={s.products}
        />
      ))}
    </div>
  );
}

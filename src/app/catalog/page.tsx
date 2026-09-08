import Link from "next/link";
import { getLocale } from "@/lib/locale-server";
import { getCategories, getSettings } from "@/lib/catalog";
import { t, productsCount } from "@/i18n";
import { ProductImage } from "@/components/ProductImage";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const locale = await getLocale();
  const d = t(locale);
  const [categories, settings] = await Promise.all([getCategories(locale), getSettings()]);

  const address =
    locale === "ru" ? settings.addressRu : locale === "en" ? settings.addressEn : settings.addressUz;
  const shopName =
    (locale === "ru" ? settings.shopNameRu : locale === "en" ? settings.shopNameEn : settings.shopNameUz) ??
    "Tashkent Kabel";

  return (
    <div className="pb-4">
      <h1 className="mb-3 mt-1 px-0.5 text-xl font-bold">{d.navCatalog}</h1>

      <div className="flex flex-col gap-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/c/${c.slug}`}
            className="card flex items-center gap-3 p-2.5 transition active:scale-[0.99]"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <ProductImage src={c.image} alt={c.name} seed={c.slug} icon={c.icon} rounded="rounded-none" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="line-1 text-[15px] font-semibold">{c.name}</div>
              <div className="text-xs muted">{productsCount(c.count ?? 0, locale)}</div>
            </div>
            <span className="pr-1 text-lg muted">›</span>
          </Link>
        ))}
      </div>

      <div className="card mt-5 p-4 text-sm">
        <div className="font-semibold">{shopName}</div>
        <div className="mt-1 muted">{address}</div>
        <div className="mt-1 muted">
          {settings.workHours} · {settings.phone}
        </div>
        <a
          href={`tel:${(settings.phone ?? "").replace(/\s/g, "")}`}
          className="btn-primary mt-3 inline-block px-5 py-2.5 text-sm"
        >
          📞 {settings.phone}
        </a>
      </div>
    </div>
  );
}

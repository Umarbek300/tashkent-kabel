"use client";

import { useFavorites, useLocale } from "@/components/providers";
import { ProductGrid } from "@/components/ProductGrid";
import { EmptyState } from "@/components/EmptyState";

export default function FavoritesPage() {
  const { items, ready } = useFavorites();
  const { t } = useLocale();

  if (!ready) return null;

  return (
    <div className="pb-4">
      <h1 className="mb-3 mt-1 px-0.5 text-xl font-bold">{t.navFavorites}</h1>
      {items.length === 0 ? (
        <EmptyState
          icon="❤️"
          title={t.favoritesEmpty}
          hint={t.favoritesEmptyHint}
          actionHref="/catalog"
          actionLabel={t.goShopping}
        />
      ) : (
        <ProductGrid
          products={items.map((f) => ({
            id: f.id,
            slug: f.slug,
            name: f.name,
            price: f.price,
            oldPrice: null,
            unit: f.unit,
            image: f.image,
            icon: f.icon,
            stock: 1,
            brand: null,
          }))}
        />
      )}
    </div>
  );
}

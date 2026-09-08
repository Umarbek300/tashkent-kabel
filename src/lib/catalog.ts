import "server-only";
import { prisma } from "./prisma";
import { pick, type Locale } from "@/i18n";
import type { CardProduct } from "@/components/ProductCard";

export type LocalizedCategory = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  image: string | null;
  count?: number;
};

type CategoryRow = {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  icon: string | null;
  image: string | null;
};

type ProductRow = {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  price: number;
  oldPrice: number | null;
  unit: string;
  image: string | null;
  stock: number;
  brand: string | null;
  category?: { icon: string | null } | null;
};

export function toCategory(c: CategoryRow, locale: Locale, count?: number): LocalizedCategory {
  return {
    id: c.id,
    slug: c.slug,
    name: pick(c, "name", locale),
    icon: c.icon,
    image: c.image,
    count,
  };
}

export function toCard(p: ProductRow, locale: Locale): CardProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: pick(p, "name", locale),
    price: p.price,
    oldPrice: p.oldPrice,
    unit: p.unit,
    image: p.image,
    icon: p.category?.icon ?? null,
    stock: p.stock,
    brand: p.brand,
  };
}

const CARD_SELECT = {
  id: true,
  slug: true,
  nameUz: true,
  nameRu: true,
  nameEn: true,
  price: true,
  oldPrice: true,
  unit: true,
  image: true,
  stock: true,
  brand: true,
  category: { select: { icon: true } },
} as const;

export async function getCategories(locale: Locale): Promise<LocalizedCategory[]> {
  const rows = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { nameUz: "asc" }],
    select: {
      id: true,
      slug: true,
      nameUz: true,
      nameRu: true,
      nameEn: true,
      icon: true,
      image: true,
      _count: { select: { products: { where: { isActive: true } } } },
    },
  });
  return rows.map((r) => toCategory(r, locale, r._count.products));
}

export async function getFeatured(locale: Locale, take = 12): Promise<CardProduct[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    orderBy: [{ sortOrder: "asc" }],
    take,
    select: CARD_SELECT,
  });
  return rows.map((r) => toCard(r, locale));
}

export async function getNewest(locale: Locale, take = 12): Promise<CardProduct[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ createdAt: "desc" }],
    take,
    select: CARD_SELECT,
  });
  return rows.map((r) => toCard(r, locale));
}

/** Vitrina uchun: har kategoriyadan bir necha mahsulot. */
export async function getShowcaseSections(
  locale: Locale,
  perCategory = 10,
  maxCategories = 8
) {
  const cats = await prisma.category.findMany({
    where: { isActive: true, products: { some: { isActive: true } } },
    orderBy: [{ sortOrder: "asc" }],
    take: maxCategories,
    select: {
      id: true,
      slug: true,
      nameUz: true,
      nameRu: true,
      nameEn: true,
      icon: true,
      image: true,
      products: {
        where: { isActive: true },
        orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
        take: perCategory,
        select: CARD_SELECT,
      },
    },
  });

  return cats.map((c) => ({
    category: toCategory(c, locale),
    products: c.products.map((p) => toCard(p, locale)),
  }));
}

export type SortKey = "popular" | "cheap" | "expensive" | "newest";

function orderFor(sort: SortKey) {
  switch (sort) {
    case "cheap":
      return [{ price: "asc" as const }];
    case "expensive":
      return [{ price: "desc" as const }];
    case "newest":
      return [{ createdAt: "desc" as const }];
    default:
      return [{ isFeatured: "desc" as const }, { sortOrder: "asc" as const }];
  }
}

export async function getCategoryBySlug(slug: string, locale: Locale) {
  const c = await prisma.category.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      nameUz: true,
      nameRu: true,
      nameEn: true,
      icon: true,
      image: true,
      isActive: true,
    },
  });
  if (!c || !c.isActive) return null;
  return toCategory(c, locale);
}

export async function getCategoryProducts(
  categoryId: string,
  locale: Locale,
  opts: { sort?: SortKey; brand?: string; min?: number; max?: number } = {}
): Promise<CardProduct[]> {
  const rows = await prisma.product.findMany({
    where: {
      isActive: true,
      categoryId,
      ...(opts.brand ? { brand: opts.brand } : {}),
      ...(opts.min != null || opts.max != null
        ? {
            price: {
              ...(opts.min != null ? { gte: opts.min } : {}),
              ...(opts.max != null ? { lte: opts.max } : {}),
            },
          }
        : {}),
    },
    orderBy: orderFor(opts.sort ?? "popular"),
    select: CARD_SELECT,
  });
  return rows.map((r) => toCard(r, locale));
}

export async function getCategoryBrands(categoryId: string): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, categoryId, brand: { not: null } },
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  return rows.map((r) => r.brand!).filter(Boolean);
}

export async function getCategoryPriceRange(categoryId: string) {
  const agg = await prisma.product.aggregate({
    where: { isActive: true, categoryId },
    _min: { price: true },
    _max: { price: true },
  });
  return { min: agg._min.price ?? 0, max: agg._max.price ?? 0 };
}

export async function getProductBySlug(slug: string, locale: Locale) {
  const p = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: {
        select: { id: true, slug: true, nameUz: true, nameRu: true, nameEn: true, icon: true, image: true },
      },
    },
  });
  if (!p || !p.isActive) return null;
  return {
    ...toCard(p, locale),
    sku: p.sku,
    desc: pick(p, "desc", locale),
    category: toCategory(p.category, locale),
  };
}

export async function getRelated(
  categoryId: string,
  excludeId: string,
  locale: Locale,
  take = 10
): Promise<CardProduct[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, categoryId, NOT: { id: excludeId } },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
    take,
    select: CARD_SELECT,
  });
  return rows.map((r) => toCard(r, locale));
}

export async function searchProducts(q: string, locale: Locale): Promise<CardProduct[]> {
  const term = q.trim();
  if (!term) return [];
  const rows = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { nameUz: { contains: term, mode: "insensitive" } },
        { nameRu: { contains: term, mode: "insensitive" } },
        { nameEn: { contains: term, mode: "insensitive" } },
        { brand: { contains: term, mode: "insensitive" } },
        { sku: { contains: term, mode: "insensitive" } },
      ],
    },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
    take: 80,
    select: CARD_SELECT,
  });
  return rows.map((r) => toCard(r, locale));
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

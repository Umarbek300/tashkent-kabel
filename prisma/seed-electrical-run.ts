import { PrismaClient } from "@prisma/client";
import { ELECTRICAL } from "./seed-electrical";

const prisma = new PrismaClient();

/** Eski "Elektr mollari" dagi mahsulotlarni yangi kategoriyalarga ko'chirish xaritasi. */
const MOVE: Record<string, string> = {
  "kabel-vvg-3x2-5": "kabel-simlar",
  "kabel-vvg-3x1-5": "kabel-simlar",
  "avtomat-16a": "avtomatlar-himoya",
  "shchit-12-modul": "avtomatlar-himoya",
  "rozetka-vnutrenniy": "rozetka-vyklyuchatel",
  "vyklyuchatel-2": "rozetka-vyklyuchatel",
  "lampa-led-12w": "yoritish",
  "prozhektor-led-50w": "yoritish",
  "gofra-20mm": "kabel-kanal-gofra",
};

async function main() {
  // 1. Qurilish kategoriyalarini pastga suramiz — kabel bo'limi boshda tursin
  const existing = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  for (const [i, c] of existing.entries()) {
    await prisma.category.update({ where: { id: c.id }, data: { sortOrder: 100 + i } });
  }

  // 2. Kabel/elektr kategoriyalari va mahsulotlari
  let created = 0;
  let updated = 0;

  for (const [i, c] of ELECTRICAL.entries()) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { nameUz: c.nameUz, nameRu: c.nameRu, nameEn: c.nameEn, icon: c.icon, sortOrder: i, isActive: true },
      create: { slug: c.slug, nameUz: c.nameUz, nameRu: c.nameRu, nameEn: c.nameEn, icon: c.icon, sortOrder: i },
    });

    for (const [j, p] of c.products.entries()) {
      const data = {
        nameUz: p.nameUz,
        nameRu: p.nameRu,
        nameEn: p.nameEn,
        descUz: p.descUz ?? null,
        descRu: p.descRu ?? null,
        descEn: p.descEn ?? null,
        brand: p.brand ?? null,
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        unit: p.unit,
        stock: p.stock,
        isFeatured: Boolean(p.featured),
        sortOrder: j,
        categoryId: category.id,
        isActive: true,
      };
      const before = await prisma.product.findUnique({ where: { slug: p.slug }, select: { id: true } });
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: data,
        create: {
          ...data,
          slug: p.slug,
          sku: `TK-${String(i + 1).padStart(2, "0")}-${String(j + 1).padStart(3, "0")}`,
        },
      });
      if (before) updated++;
      else created++;
    }
  }

  // 3. Eski "Elektr mollari" mahsulotlarini yangi kategoriyalarga ko'chiramiz
  let moved = 0;
  for (const [slug, targetSlug] of Object.entries(MOVE)) {
    const target = await prisma.category.findUnique({ where: { slug: targetSlug }, select: { id: true } });
    const product = await prisma.product.findUnique({ where: { slug }, select: { id: true, categoryId: true } });
    if (!target || !product) continue;
    if (product.categoryId === target.id) continue;
    await prisma.product.update({ where: { id: product.id }, data: { categoryId: target.id } });
    moved++;
  }

  // 4. Bo'shab qolgan eski kategoriyani o'chiramiz
  const old = await prisma.category.findUnique({
    where: { slug: "elektr-mollari" },
    select: { id: true, _count: { select: { products: true } } },
  });
  let removed = false;
  if (old && old._count.products === 0) {
    await prisma.category.delete({ where: { id: old.id } });
    removed = true;
  } else if (old) {
    console.warn(`⚠️  "elektr-mollari" da hali ${old._count.products} ta mahsulot bor — o'chirilmadi.`);
  }

  const totals = {
    kategoriya: await prisma.category.count(),
    mahsulot: await prisma.product.count(),
  };

  console.log(`Yangi mahsulot: ${created}, yangilangan: ${updated}, ko'chirilgan: ${moved}`);
  console.log(`Eski "Elektr mollari" o'chirildi: ${removed ? "ha" : "yo'q"}`);
  console.log(`Jami: ${totals.kategoriya} kategoriya, ${totals.mahsulot} mahsulot`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

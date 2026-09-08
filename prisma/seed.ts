import { PrismaClient } from "@prisma/client";
import { CATEGORIES } from "./seed-data";
import { ELECTRICAL } from "./seed-electrical";

const prisma = new PrismaClient();

async function main() {
  console.log("Katalog to'ldirilmoqda…");

  let catCount = 0;
  let prodCount = 0;

  // Kabel/elektr bo'limi katalog boshida (0…), qurilish mollari keyin (100…)
  const ALL = [
    ...ELECTRICAL.map((c, i) => ({ c, order: i, prefix: "TK" })),
    ...CATEGORIES.map((c, i) => ({ c, order: 100 + i, prefix: "QM" })),
  ];

  for (const { c, order: i, prefix } of ALL) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {
        nameUz: c.nameUz,
        nameRu: c.nameRu,
        nameEn: c.nameEn,
        icon: c.icon,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: c.slug,
        nameUz: c.nameUz,
        nameRu: c.nameRu,
        nameEn: c.nameEn,
        icon: c.icon,
        sortOrder: i,
      },
    });
    catCount++;

    for (const [j, p] of c.products.entries()) {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {
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
        },
        create: {
          slug: p.slug,
          sku: `${prefix}-${String((i % 100) + 1).padStart(2, "0")}-${String(j + 1).padStart(3, "0")}`,
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
        },
      });
      prodCount++;
    }
  }

  const defaults: Record<string, string> = {
    shopNameUz: "Tashkent Kabel",
    shopNameRu: "Tashkent Kabel",
    shopNameEn: "Tashkent Kabel",
    taglineUz: "Kabel va qurilish mollari — bir joyda",
    taglineRu: "Кабель и стройматериалы — в одном месте",
    taglineEn: "Cable and building materials, all in one place",
    phone: process.env.NEXT_PUBLIC_SHOP_PHONE ?? "+998 90 123 45 67",
    addressUz: "Toshkent sh., Yunusobod t., Amir Temur ko'chasi 1",
    addressRu: "г. Ташкент, Юнусабадский р-н, ул. Амира Темура 1",
    addressEn: "1 Amir Temur St., Yunusobod, Tashkent",
    workHours: "09:00 – 19:00",
    deliveryFee: "50000",
    freeDeliveryFrom: "3000000",
    cardNumber: "",
    cardHolder: "",
    cardBank: "",
  };
  for (const [key, value] of Object.entries(defaults)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  // Eskirgan "Elektr mollari" kategoriyasi endi 7 ta kabel bo'limiga bo'lingan
  const legacy = await prisma.category.findUnique({
    where: { slug: "elektr-mollari" },
    select: { id: true, _count: { select: { products: true } } },
  });
  if (legacy && legacy._count.products === 0) {
    await prisma.category.delete({ where: { id: legacy.id } });
    console.log('Eskirgan "Elektr mollari" kategoriyasi o\'chirildi.');
  }

  console.log(`Tayyor: ${catCount} kategoriya, ${prodCount} mahsulot.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/catalog";
import { sendOrderToTelegram } from "@/lib/telegram";
import { isCardConfigured } from "@/lib/payments";
import { isValidUzPhone, normalizePhone } from "@/lib/format";
import { normalizeLocale, pick } from "@/i18n";

export const runtime = "nodejs";

const Body = z.object({
  customerName: z.string().min(1).max(120),
  phone: z.string().min(5).max(40),
  address: z.string().max(400).nullable().optional(),
  comment: z.string().max(1000).nullable().optional(),
  deliveryType: z.enum(["delivery", "pickup"]).default("delivery"),
  paymentMethod: z.enum(["cash", "card"]).default("cash"),
  locale: z.string().optional(),
  tgUserId: z.string().nullable().optional(),
  tgUsername: z.string().nullable().optional(),
  items: z
    .array(z.object({ productId: z.string().min(1), qty: z.number().int().min(1).max(10000) }))
    .min(1)
    .max(200),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Ma'lumotlar noto'g'ri" }, { status: 400 });
  }

  if (!isValidUzPhone(parsed.phone)) {
    return NextResponse.json({ error: "Telefon raqam noto'g'ri" }, { status: 400 });
  }
  if (parsed.deliveryType === "delivery" && !parsed.address?.trim()) {
    return NextResponse.json({ error: "Manzil kiritilmagan" }, { status: 400 });
  }

  const locale = normalizeLocale(parsed.locale);

  // Narxlarni mijozga emas, bazaga ishonamiz
  const ids = parsed.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: ids }, isActive: true },
  });
  if (products.length === 0) {
    return NextResponse.json({ error: "Mahsulotlar topilmadi" }, { status: 400 });
  }

  const byId = new Map(products.map((p) => [p.id, p]));
  const items = parsed.items
    .filter((i) => byId.has(i.productId))
    .map((i) => {
      const p = byId.get(i.productId)!;
      return {
        productId: p.id,
        name: pick(p, "name", locale),
        unit: p.unit,
        price: p.price,
        qty: i.qty,
      };
    });

  if (items.length === 0) {
    return NextResponse.json({ error: "Mahsulotlar topilmadi" }, { status: 400 });
  }

  const settings = await getSettings();

  // Karta sozlanmagan bo'lsa P2P usulini qabul qilmaymiz
  const paymentMethod =
    parsed.paymentMethod === "card" && !isCardConfigured(settings) ? "cash" : parsed.paymentMethod;

  const baseFee = Number(settings.deliveryFee ?? 0) || 0;
  const freeFrom = Number(settings.freeDeliveryFrom ?? 0) || 0;

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee =
    parsed.deliveryType === "pickup" || (freeFrom > 0 && subtotal >= freeFrom) ? 0 : baseFee;
  const total = subtotal + deliveryFee;

  const last = await prisma.order.findFirst({ orderBy: { number: "desc" }, select: { number: true } });
  const number = (last?.number ?? 1000) + 1;

  const order = await prisma.order.create({
    data: {
      number,
      customerName: parsed.customerName.trim(),
      phone: normalizePhone(parsed.phone),
      address: parsed.address?.trim() || null,
      comment: parsed.comment?.trim() || null,
      deliveryType: parsed.deliveryType,
      paymentMethod,
      paymentStatus: "pending",
      status: "new",
      subtotal,
      deliveryFee,
      total,
      locale,
      tgUserId: parsed.tgUserId ?? null,
      tgUsername: parsed.tgUsername ?? null,
      items: { create: items },
    },
    select: { id: true, number: true },
  });

  // Telegramga xabar — yuborilmasa ham buyurtma saqlanadi
  void sendOrderToTelegram({
    number: order.number,
    customerName: parsed.customerName.trim(),
    phone: normalizePhone(parsed.phone),
    address: parsed.address ?? null,
    comment: parsed.comment ?? null,
    deliveryType: parsed.deliveryType,
    paymentMethod,
    subtotal,
    deliveryFee,
    total,
    tgUsername: parsed.tgUsername ?? null,
    items,
  });

  return NextResponse.json({ id: order.id, number: order.number });
}

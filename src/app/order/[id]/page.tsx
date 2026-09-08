import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLocale } from "@/lib/locale-server";
import { getSettings } from "@/lib/catalog";
import { t, unitLabel, statusLabel } from "@/i18n";
import { CardPaymentBox } from "@/components/CardPaymentBox";
import { isCardConfigured } from "@/lib/payments";
import { formatPrice, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getLocale();
  const d = t(locale);

  const [order, settings] = await Promise.all([
    prisma.order.findUnique({ where: { id }, include: { items: true } }),
    getSettings(),
  ]);
  if (!order) notFound();

  return (
    <div className="pb-4">
      <div className="card mt-2 p-6 text-center">
        <div className="mb-2 text-5xl">✅</div>
        <h1 className="text-lg font-bold">{d.orderAccepted}</h1>
        <p className="mt-1 text-sm muted">{d.orderAcceptedHint}</p>
        <div className="mt-4 inline-block rounded-full bg-[var(--color-brand-50)] px-4 py-2 text-sm font-bold text-[var(--color-brand-700)]">
          {d.orderNumber}: #{order.number}
        </div>
        <div className="mt-2 text-xs muted">{formatDate(order.createdAt, locale)}</div>
      </div>

      {order.paymentMethod === "card" && isCardConfigured(settings) && (
        <CardPaymentBox
          cardNumber={settings.cardNumber}
          cardHolder={settings.cardHolder}
          cardBank={settings.cardBank}
          amount={order.total}
          orderNumber={order.number}
          supportUsername={process.env.TELEGRAM_SUPPORT || undefined}
          paid={order.paymentStatus === "paid"}
        />
      )}

      <div className="card mt-3 p-3.5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wide muted">{d.products}</span>
          <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 font-semibold">
            {statusLabel(order.status, locale)}
          </span>
        </div>
        {order.items.map((i) => (
          <div key={i.id} className="flex items-start justify-between gap-3 py-1.5 text-sm">
            <span className="line-2 flex-1">{i.name}</span>
            <span className="shrink-0 muted">
              {i.qty} {unitLabel(i.unit, locale)}
            </span>
            <span className="w-24 shrink-0 text-right font-semibold tabular-nums">
              {formatPrice(i.price * i.qty)}
            </span>
          </div>
        ))}

        <div className="mt-3 border-t pt-2 text-sm" style={{ borderColor: "var(--border)" }}>
          <div className="flex justify-between">
            <span className="muted">{d.subtotal}</span>
            <span className="tabular-nums">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="muted">{d.deliveryFee}</span>
            <span className="tabular-nums">{formatPrice(order.deliveryFee)}</span>
          </div>
          <div className="mt-2 flex justify-between text-base font-bold">
            <span>{d.total}</span>
            <span className="tabular-nums">
              {formatPrice(order.total)} {d.som}
            </span>
          </div>
        </div>
      </div>

      <div className="card mt-3 p-3.5 text-sm">
        <div className="font-semibold">{order.customerName}</div>
        <div className="mt-0.5 muted">{order.phone}</div>
        {order.address && <div className="mt-0.5 muted">📍 {order.address}</div>}
        {order.comment && <div className="mt-0.5 muted">📝 {order.comment}</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <Link href="/" className="btn-ghost flex-1 py-3 text-center text-sm">
          {d.backToShop}
        </Link>
        <a
          href={`tel:${(settings.phone ?? "").replace(/\s/g, "")}`}
          className="btn-primary flex-1 py-3 text-center text-sm"
        >
          📞 {settings.phone}
        </a>
      </div>
    </div>
  );
}

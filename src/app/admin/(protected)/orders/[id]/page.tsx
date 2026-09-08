import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/format";
import { statusLabel, unitLabel, paymentStatusLabel } from "@/i18n";
import { setOrderStatusAction, setPaymentStatusAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "confirmed", "delivering", "done", "cancelled"];

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="mb-3 inline-block text-xs font-semibold muted">
        ‹ Buyurtmalar
      </Link>

      <div className="card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Buyurtma #{order.number}</h1>
            <div className="text-xs muted">{formatDate(order.createdAt, "uz")}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold tabular-nums">{formatPrice(order.total)}</div>
            <div className="text-xs muted">so'm</div>
          </div>
        </div>

        <div className="mt-4 grid gap-1 text-sm">
          <div><span className="muted">Mijoz: </span><b>{order.customerName}</b></div>
          <div>
            <span className="muted">Telefon: </span>
            <a href={`tel:${order.phone.replace(/\s/g, "")}`} className="font-semibold text-[var(--color-brand-700)]">
              {order.phone}
            </a>
          </div>
          <div>
            <span className="muted">Yetkazish: </span>
            {order.deliveryType === "pickup" ? "O'zi olib ketadi" : "Yetkazib berish"}
          </div>
          {order.address && <div><span className="muted">Manzil: </span>{order.address}</div>}
          <div>
            <span className="muted">To'lov: </span>
            {order.paymentMethod === "card" ? "💳 Kartaga o'tkazma" : "💵 Naqd / karta (yetkazishda)"}
            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                order.paymentStatus === "paid"
                  ? "bg-emerald-100 text-emerald-800"
                  : order.paymentStatus === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-800"
              }`}
            >
              {paymentStatusLabel(order.paymentStatus, "uz")}
            </span>
          </div>
          {order.comment && <div><span className="muted">Izoh: </span>{order.comment}</div>}
          {order.tgUsername && <div><span className="muted">Telegram: </span>@{order.tgUsername}</div>}
        </div>
      </div>

      <div className="card mt-3 p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide muted">Mahsulotlar</div>
        {order.items.map((i) => (
          <div key={i.id} className="flex items-start justify-between gap-3 border-b py-2 text-sm last:border-b-0" style={{ borderColor: "var(--border)" }}>
            <span className="flex-1">{i.name}</span>
            <span className="shrink-0 muted">
              {i.qty} {unitLabel(i.unit, "uz")} × {formatPrice(i.price)}
            </span>
            <span className="w-28 shrink-0 text-right font-semibold tabular-nums">
              {formatPrice(i.price * i.qty)}
            </span>
          </div>
        ))}
        <div className="mt-3 flex justify-between text-sm">
          <span className="muted">Mahsulotlar</span>
          <span className="tabular-nums">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <span className="muted">Yetkazish</span>
          <span className="tabular-nums">{formatPrice(order.deliveryFee)}</span>
        </div>
        <div className="mt-2 flex justify-between text-base font-bold">
          <span>Jami</span>
          <span className="tabular-nums">{formatPrice(order.total)} so'm</span>
        </div>
      </div>

      <div className="card mt-3 p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide muted">To'lov holati</div>
        <div className="mb-4 flex flex-wrap gap-2">
          {["pending", "paid", "failed"].map((ps) => (
            <form key={ps} action={setPaymentStatusAction}>
              <input type="hidden" name="id" value={order.id} />
              <input type="hidden" name="paymentStatus" value={ps} />
              <button
                type="submit"
                className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                  order.paymentStatus === ps
                    ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                    : ""
                }`}
                style={order.paymentStatus === ps ? undefined : { borderColor: "var(--border)" }}
              >
                {paymentStatusLabel(ps, "uz")}
              </button>
            </form>
          ))}
        </div>

        <div className="mb-2 text-xs font-semibold uppercase tracking-wide muted">Buyurtma holati</div>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <form key={s} action={setOrderStatusAction}>
              <input type="hidden" name="id" value={order.id} />
              <input type="hidden" name="status" value={s} />
              <button
                type="submit"
                className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                  order.status === s
                    ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                    : ""
                }`}
                style={order.status === s ? undefined : { borderColor: "var(--border)" }}
              >
                {statusLabel(s, "uz")}
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

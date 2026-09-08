import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/format";
import { statusLabel } from "@/i18n";

export const dynamic = "force-dynamic";

const STATUSES = ["all", "new", "confirmed", "delivering", "done", "cancelled"] as const;

const STATUS_COLOR: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  delivering: "bg-violet-100 text-violet-800",
  done: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminOrders({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "all" } = await searchParams;
  const where = status !== "all" && STATUSES.includes(status as never) ? { status } : {};

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { items: { select: { id: true } } },
  });

  return (
    <div>
      <div className="no-scrollbar -mx-3 mb-3 flex gap-2 overflow-x-auto px-3">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={s === "all" ? "/admin/orders" : `/admin/orders?status=${s}`}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium ${
              status === s
                ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                : ""
            }`}
            style={status === s ? undefined : { borderColor: "var(--border)", background: "var(--surface)" }}
          >
            {s === "all" ? "Hammasi" : statusLabel(s, "uz")}
          </Link>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="card p-8 text-center text-sm muted">Buyurtma topilmadi</div>
      ) : (
        <div className="flex flex-col gap-2">
          {orders.map((o) => (
            <Link key={o.id} href={`/admin/orders/${o.id}`} className="card flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">#{o.number}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLOR[o.status] ?? ""}`}>
                    {statusLabel(o.status, "uz")}
                  </span>
                  {o.deliveryType === "pickup" && (
                    <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[11px] muted">
                      olib ketish
                    </span>
                  )}
                </div>
                <div className="line-1 text-xs muted">
                  {o.customerName} · {o.phone} · {o.items.length} ta pozitsiya
                </div>
                <div className="text-[11px] muted">{formatDate(o.createdAt, "uz")}</div>
              </div>
              <div className="shrink-0 text-sm font-bold tabular-nums">{formatPrice(o.total)}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

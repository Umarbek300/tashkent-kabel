import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/format";
import { statusLabel } from "@/i18n";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  delivering: "bg-violet-100 text-violet-800",
  done: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminDashboard() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [newCount, todayCount, productCount, categoryCount, revenueAgg, recent] =
    await Promise.all([
      prisma.order.count({ where: { status: "new" } }),
      prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.category.count({ where: { isActive: true } }),
      prisma.order.aggregate({ where: { status: "done" }, _sum: { total: true } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { items: { select: { id: true } } },
      }),
    ]);

  const stats = [
    { label: "Yangi buyurtma", value: newCount, icon: "🔔" },
    { label: "Bugungi buyurtma", value: todayCount, icon: "📅" },
    { label: "Faol mahsulot", value: productCount, icon: "📦" },
    { label: "Kategoriya", value: categoryCount, icon: "🗂️" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-3.5">
            <div className="text-lg">{s.icon}</div>
            <div className="mt-1 text-2xl font-bold tabular-nums">{s.value}</div>
            <div className="text-xs muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mt-2.5 p-3.5">
        <div className="text-xs muted">Yakunlangan buyurtmalar summasi</div>
        <div className="mt-1 text-2xl font-bold tabular-nums">
          {formatPrice(revenueAgg._sum.total ?? 0)} <span className="text-sm font-medium muted">so'm</span>
        </div>
      </div>

      <div className="mt-5 mb-2 flex items-center justify-between">
        <h2 className="text-base font-bold">So'nggi buyurtmalar</h2>
        <Link href="/admin/orders" className="text-xs font-semibold text-[var(--color-brand-700)]">
          Barchasi →
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="card p-6 text-center text-sm muted">Hozircha buyurtma yo'q</div>
      ) : (
        <div className="flex flex-col gap-2">
          {recent.map((o) => (
            <Link key={o.id} href={`/admin/orders/${o.id}`} className="card flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">#{o.number}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLOR[o.status] ?? ""}`}>
                    {statusLabel(o.status, "uz")}
                  </span>
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

const TABS = [
  { href: "/admin", label: "Boshqaruv", icon: "📊" },
  { href: "/admin/orders", label: "Buyurtmalar", icon: "🧾" },
  { href: "/admin/products", label: "Mahsulotlar", icon: "📦" },
  { href: "/admin/categories", label: "Kategoriyalar", icon: "🗂️" },
  { href: "/admin/settings", label: "Sozlamalar", icon: "⚙️" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-5xl px-3 pb-16 pt-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-brand-500)] text-lg">
            ⚡
          </span>
          <span className="text-[15px] font-bold">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className="btn-ghost px-3 py-2 text-xs" target="_blank">
            Do'kon ↗
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="btn-ghost px-3 py-2 text-xs">
              Chiqish
            </button>
          </form>
        </div>
      </div>

      <nav className="no-scrollbar -mx-3 mb-4 flex gap-2 overflow-x-auto px-3">
        {TABS.map((tab) => {
          const active =
            tab.href === "/admin" ? pathname === "/admin" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                active
                  ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                  : ""
              }`}
              style={active ? undefined : { borderColor: "var(--border)", background: "var(--surface)" }}
            >
              {tab.icon} {tab.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}

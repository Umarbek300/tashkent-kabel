"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart, useFavorites, useLocale } from "./providers";

const ITEMS = [
  { href: "/", key: "navShowcase", icon: "🛍️" },
  { href: "/catalog", key: "navCatalog", icon: "📋" },
  { href: "/favorites", key: "navFavorites", icon: "❤️" },
  { href: "/cart", key: "navCart", icon: "🛒" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { count } = useCart();
  const { items: favs } = useFavorites();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2"
      style={{ background: "linear-gradient(to top, var(--bg) 62%, transparent)" }}
    >
      <div className="card mx-auto flex max-w-lg items-stretch justify-between gap-1 rounded-[22px] p-1.5">
        {ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const badge =
            item.href === "/cart" ? count : item.href === "/favorites" ? favs.length : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-2 text-[11px] font-medium transition ${
                active
                  ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                  : "muted"
              }`}
            >
              <span className="relative text-[19px] leading-none">
                {item.icon}
                {badge > 0 && (
                  <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--color-brand-600)] px-1 text-[10px] font-bold text-white">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </span>
              <span className="line-1">{t[item.key]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

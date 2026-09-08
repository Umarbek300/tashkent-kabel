"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useLocale } from "./providers";
import { LocaleSwitch } from "./LocaleSwitch";

function SearchField() {
  const { t } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = q.trim();
        router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
      }}
      className="relative flex-1"
    >
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" strokeLinecap="round" />
      </svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="field !rounded-full !py-2.5 !pl-10 !pr-4 text-sm"
        type="search"
        inputMode="search"
      />
    </form>
  );
}

export function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className="sticky top-0 z-30 border-b px-3 pb-2.5 pt-[max(10px,env(safe-area-inset-top))]"
      style={{
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-2">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Bosh sahifa">
          <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-[var(--color-brand-500)] text-[17px] leading-none shadow-sm">
            ⚡
          </span>
          <span className="hidden text-[15px] font-bold leading-tight sm:block">
            Tashkent
            <span className="text-[var(--color-brand-600)]"> Kabel</span>
          </span>
        </Link>

        <Suspense fallback={<div className="flex-1" />}>
          <SearchField />
        </Suspense>

        <LocaleSwitch />
      </div>
    </header>
  );
}

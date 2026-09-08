"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "./providers";
import { formatPrice } from "@/lib/format";

const SORTS = [
  { key: "popular", label: "sortPopular" },
  { key: "cheap", label: "sortCheap" },
  { key: "expensive", label: "sortExpensive" },
  { key: "newest", label: "sortNewest" },
] as const;

export function FilterBar({
  brands,
  range,
}: {
  brands: string[];
  range: { min: number; max: number };
}) {
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const sort = params.get("sort") ?? "popular";
  const brand = params.get("brand") ?? "";
  const [min, setMin] = useState(params.get("min") ?? "");
  const [max, setMax] = useState(params.get("max") ?? "");

  const push = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const activeCount = (brand ? 1 : 0) + (params.get("min") ? 1 : 0) + (params.get("max") ? 1 : 0);

  return (
    <div className="mb-3">
      <div className="no-scrollbar -mx-3 flex items-center gap-2 overflow-x-auto px-3 pb-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
            activeCount > 0 || open
              ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
              : ""
          }`}
          style={
            activeCount > 0 || open ? undefined : { borderColor: "var(--border)", background: "var(--surface)" }
          }
        >
          ⚙︎ {t.filters}
          {activeCount > 0 && (
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-[var(--color-brand-600)] px-1 text-[10px] text-white">
              {activeCount}
            </span>
          )}
        </button>

        {SORTS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => push({ sort: s.key === "popular" ? null : s.key })}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition ${
              sort === s.key
                ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                : ""
            }`}
            style={
              sort === s.key ? undefined : { borderColor: "var(--border)", background: "var(--surface)" }
            }
          >
            {t[s.label]}
          </button>
        ))}
      </div>

      {open && (
        <div className="card animate-slide-up mt-2 p-3.5">
          {brands.length > 0 && (
            <>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide muted">
                {t.brand}
              </div>
              <div className="mb-4 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => push({ brand: null })}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    !brand ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]" : ""
                  }`}
                  style={!brand ? undefined : { borderColor: "var(--border)" }}
                >
                  {t.all}
                </button>
                {brands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => push({ brand: b === brand ? null : b })}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      b === brand
                        ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                        : ""
                    }`}
                    style={b === brand ? undefined : { borderColor: "var(--border)" }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mb-2 text-xs font-semibold uppercase tracking-wide muted">
            {t.priceRange} ({formatPrice(range.min)} – {formatPrice(range.max)} {t.som})
          </div>
          <div className="flex items-center gap-2">
            <input
              className="field"
              inputMode="numeric"
              placeholder={t.from}
              value={min}
              onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))}
            />
            <span className="muted">—</span>
            <input
              className="field"
              inputMode="numeric"
              placeholder={t.to}
              value={max}
              onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => push({ min: min || null, max: max || null })}
              className="btn-primary flex-1 py-2.5 text-sm"
            >
              {t.apply}
            </button>
            <button
              type="button"
              onClick={() => {
                setMin("");
                setMax("");
                push({ min: null, max: null, brand: null, sort: null });
              }}
              className="btn-ghost px-4 py-2.5 text-sm"
            >
              {t.reset}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

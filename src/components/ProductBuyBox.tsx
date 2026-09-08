"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, useLocale } from "./providers";
import { formatPrice } from "@/lib/format";
import { unitLabel } from "@/i18n";
import type { CartLine } from "./providers";

export function ProductBuyBox({
  line,
  stock,
}: {
  line: Omit<CartLine, "qty">;
  stock: number;
}) {
  const { locale, t } = useLocale();
  const { add, qtyOf } = useCart();
  const [qty, setQty] = useState(1);
  const inCart = qtyOf(line.id);
  const disabled = stock <= 0;

  return (
    <div className="mt-4">
      <div className="card p-3">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <span className="text-sm font-medium muted">{t.quantity}</span>
          <div
            className="flex items-center gap-1 rounded-full p-1"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <button
              type="button"
              aria-label="−"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-8 w-8 place-items-center rounded-full text-lg transition active:scale-90"
            >
              −
            </button>
            <span className="min-w-10 text-center text-sm font-bold tabular-nums">
              {qty} <span className="font-normal muted">{unitLabel(line.unit, locale)}</span>
            </span>
            <button
              type="button"
              aria-label="+"
              onClick={() => setQty((q) => q + 1)}
              className="grid h-8 w-8 place-items-center rounded-full text-lg transition active:scale-90"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => add(line, qty)}
          className="btn-primary w-full py-3.5 text-[15px]"
        >
          {disabled
            ? t.outOfStock
            : `${t.addToCart} · ${formatPrice(line.price * qty)} ${t.som}`}
        </button>

        {inCart > 0 && (
          <Link
            href="/cart"
            className="mt-2 block w-full rounded-2xl py-2.5 text-center text-sm font-semibold text-[var(--color-brand-700)]"
            style={{ background: "var(--color-brand-50)" }}
          >
            {t.inCart}: {inCart} {unitLabel(line.unit, locale)} · {t.navCart} →
          </Link>
        )}
      </div>
    </div>
  );
}

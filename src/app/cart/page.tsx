"use client";

import Link from "next/link";
import { useCart, useLocale } from "@/components/providers";
import { ProductImage } from "@/components/ProductImage";
import { EmptyState } from "@/components/EmptyState";
import { formatPrice } from "@/lib/format";
import { unitLabel } from "@/i18n";

export default function CartPage() {
  const { lines, subtotal, setQty, remove, clear, ready } = useCart();
  const { locale, t } = useLocale();

  if (!ready) return null;

  if (lines.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title={t.cartEmpty}
        hint={t.cartEmptyHint}
        actionHref="/catalog"
        actionLabel={t.goShopping}
      />
    );
  }

  return (
    <div className="pb-4">
      <div className="mb-3 mt-1 flex items-center justify-between px-0.5">
        <h1 className="text-xl font-bold">{t.navCart}</h1>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-semibold text-red-500 transition active:scale-95"
        >
          {t.clearCart}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {lines.map((l) => (
          <div key={l.id} className="card flex gap-3 p-2.5">
            <Link href={`/p/${l.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <ProductImage src={l.image} alt={l.name} seed={l.slug} icon={l.icon} rounded="rounded-none" />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <Link href={`/p/${l.slug}`} className="line-2 text-[13px] font-medium leading-snug">
                {l.name}
              </Link>
              <div className="mt-0.5 text-xs muted">
                {formatPrice(l.price)} {t.som}/{unitLabel(l.unit, locale)}
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <div
                  className="flex items-center gap-1 rounded-full p-0.5"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                >
                  <button
                    type="button"
                    aria-label="−"
                    onClick={() => setQty(l.id, l.qty - 1)}
                    className="grid h-7 w-7 place-items-center rounded-full text-base transition active:scale-90"
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                  <button
                    type="button"
                    aria-label="+"
                    onClick={() => setQty(l.id, l.qty + 1)}
                    className="grid h-7 w-7 place-items-center rounded-full text-base transition active:scale-90"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm font-bold tabular-nums">
                  {formatPrice(l.price * l.qty)}
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label={t.delete}
              onClick={() => remove(l.id)}
              className="h-7 w-7 shrink-0 self-start rounded-full text-sm muted transition active:scale-90"
              style={{ background: "var(--surface-2)" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="card mt-4 p-3.5">
        <div className="flex items-center justify-between text-sm">
          <span className="muted">{t.subtotal}</span>
          <span className="font-semibold tabular-nums">
            {formatPrice(subtotal)} {t.som}
          </span>
        </div>
        <Link href="/checkout" className="btn-primary mt-3 block w-full py-3.5 text-center text-[15px]">
          {t.checkout} →
        </Link>
      </div>
    </div>
  );
}

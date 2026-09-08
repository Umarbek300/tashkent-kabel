"use client";

import { useCart, type CartLine } from "./providers";

/** Katalogdagi "+" tugmasi — bosilgach miqdor boshqaruviga aylanadi. */
export function QtyButton({
  line,
  size = "md",
}: {
  line: Omit<CartLine, "qty">;
  size?: "sm" | "md";
}) {
  const { qtyOf, add, setQty } = useCart();
  const qty = qtyOf(line.id);

  const dim = size === "sm" ? "h-8 w-8 text-lg" : "h-9 w-9 text-xl";

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          add(line);
        }}
        aria-label="Savatga qo'shish"
        className={`${dim} animate-pop grid place-items-center rounded-full bg-[var(--color-brand-500)] font-semibold text-white shadow-md transition active:scale-90`}
      >
        +
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full bg-[var(--color-brand-500)] p-0.5 text-white shadow-md"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        type="button"
        aria-label="Kamaytirish"
        onClick={() => setQty(line.id, qty - 1)}
        className={`${size === "sm" ? "h-7 w-7" : "h-8 w-8"} grid place-items-center rounded-full text-lg leading-none transition active:scale-90`}
      >
        −
      </button>
      <span className="min-w-5 text-center text-sm font-semibold tabular-nums">{qty}</span>
      <button
        type="button"
        aria-label="Ko'paytirish"
        onClick={() => setQty(line.id, qty + 1)}
        className={`${size === "sm" ? "h-7 w-7" : "h-8 w-8"} grid place-items-center rounded-full text-lg leading-none transition active:scale-90`}
      >
        +
      </button>
    </div>
  );
}

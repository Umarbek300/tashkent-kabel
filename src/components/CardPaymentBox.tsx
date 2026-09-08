"use client";

import { useState } from "react";
import { useLocale } from "./providers";
import { formatPrice } from "@/lib/format";
import { formatCardNumber } from "@/lib/payments";

export function CardPaymentBox({
  cardNumber,
  cardHolder,
  cardBank,
  amount,
  orderNumber,
  supportUsername,
  paid,
}: {
  cardNumber: string;
  cardHolder?: string;
  cardBank?: string;
  amount: number;
  orderNumber: number;
  supportUsername?: string;
  paid: boolean;
}) {
  const { t } = useLocale();
  const [copied, setCopied] = useState<"card" | "amount" | null>(null);

  const pretty = formatCardNumber(cardNumber);

  const copy = async (value: string, what: "card" | "amount") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(what);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard yopiq bo'lsa jimgina o'tamiz */
    }
  };

  return (
    <div className="card mt-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 pt-3.5">
        <span className="text-xs font-semibold uppercase tracking-wide muted">{t.cardTitle}</span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            paid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {paid ? t.pay_paid : t.pay_pending}
        </span>
      </div>

      <div
        className="m-4 mt-3 rounded-2xl p-4 text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--color-ink-800), var(--color-ink-900) 55%, var(--color-brand-800))",
        }}
      >
        <div className="text-[11px] uppercase tracking-wide opacity-70">{t.cardNumberLabel}</div>
        <button
          type="button"
          onClick={() => copy(cardNumber.replace(/\D/g, ""), "card")}
          className="mt-1 flex w-full items-center justify-between gap-3 text-left"
        >
          <span className="whitespace-nowrap font-mono text-[17px] font-semibold tracking-[0.08em]">
            {pretty}
          </span>
          <span className="shrink-0 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold">
            {copied === "card" ? t.copied : t.copy}
          </span>
        </button>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            {cardHolder && (
              <>
                <div className="text-[10px] uppercase tracking-wide opacity-60">
                  {t.cardHolderLabel}
                </div>
                <div className="line-1 text-sm font-medium">{cardHolder}</div>
              </>
            )}
          </div>
          {cardBank && <div className="shrink-0 text-xs opacity-70">{cardBank}</div>}
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => copy(String(amount), "amount")}
          className="w-full rounded-2xl px-3.5 py-3 text-left"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs muted">{t.amountToPay}</span>
            <span className="shrink-0 rounded-full bg-[var(--color-brand-50)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-brand-700)]">
              {copied === "amount" ? t.copied : t.copy}
            </span>
          </div>
          <div className="mt-0.5 text-[19px] font-bold tabular-nums">
            {formatPrice(amount)} <span className="text-sm font-medium muted">{t.som}</span>
          </div>
        </button>

        <p className="mt-3 text-[12px] leading-relaxed muted">{t.payInstruction}</p>

        {supportUsername && (
          <a
            href={`https://t.me/${supportUsername}?text=${encodeURIComponent(
              `Buyurtma #${orderNumber} uchun to'lov cheki`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3 block w-full py-3 text-center text-sm"
          >
            📤 {t.sendReceipt}
          </a>
        )}
      </div>
    </div>
  );
}

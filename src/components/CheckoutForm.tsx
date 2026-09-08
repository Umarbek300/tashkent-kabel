"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, useLocale, useTelegram } from "./providers";
import { formatPrice, isValidUzPhone } from "@/lib/format";
import { unitLabel } from "@/i18n";
import { EmptyState } from "./EmptyState";

type Props = {
  deliveryFee: number;
  freeDeliveryFrom: number;
  cardAvailable: boolean;
};

export function CheckoutForm({ deliveryFee, freeDeliveryFrom, cardAvailable }: Props) {
  const { lines, subtotal, clear, ready } = useCart();
  const { locale, t } = useLocale();
  const { user } = useTelegram();
  const router = useRouter();

  const [name, setName] = useState(user?.first_name ?? "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");

  const fee = useMemo(() => {
    if (deliveryType === "pickup") return 0;
    if (freeDeliveryFrom > 0 && subtotal >= freeDeliveryFrom) return 0;
    return deliveryFee;
  }, [deliveryType, subtotal, deliveryFee, freeDeliveryFrom]);

  const total = subtotal + fee;

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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t.required;
    if (!phone.trim()) e.phone = t.required;
    else if (!isValidUzPhone(phone)) e.phone = t.invalidPhone;
    if (deliveryType === "delivery" && !address.trim()) e.address = t.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setServerError("");
    if (!validate()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          phone: phone.trim(),
          address: deliveryType === "delivery" ? address.trim() : null,
          comment: comment.trim() || null,
          deliveryType,
          paymentMethod,
          locale,
          tgUserId: user?.id ? String(user.id) : null,
          tgUsername: user?.username ?? null,
          items: lines.map((l) => ({ productId: l.id, qty: l.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data?.error ?? "Xatolik yuz berdi");
        return;
      }
      clear();
      router.push(`/order/${data.id}`);
    } catch {
      setServerError("Tarmoq xatosi. Qayta urinib ko'ring.");
    } finally {
      setBusy(false);
    }
  };

  const methods: { key: "cash" | "card"; label: string; icon: string; enabled: boolean }[] = [
    { key: "cash", label: t.cash, icon: "💵", enabled: true },
    { key: "card", label: t.cardTransfer, icon: "💳", enabled: cardAvailable },
  ];

  return (
    <div className="pb-4">
      <h1 className="mb-3 mt-1 px-0.5 text-xl font-bold">{t.orderTitle}</h1>

      {/* Mahsulotlar */}
      <div className="card mb-3 p-3.5">
        {lines.map((l) => (
          <div key={l.id} className="flex items-start justify-between gap-3 py-1.5 text-sm">
            <span className="line-2 flex-1">{l.name}</span>
            <span className="shrink-0 muted">
              {l.qty} {unitLabel(l.unit, locale)}
            </span>
            <span className="w-24 shrink-0 text-right font-semibold tabular-nums">
              {formatPrice(l.price * l.qty)}
            </span>
          </div>
        ))}
      </div>

      {/* Ma'lumotlar */}
      <div className="card mb-3 flex flex-col gap-3 p-3.5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide muted">
            {t.yourName} *
          </label>
          <input
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ism Familiya"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide muted">
            {t.phone} *
          </label>
          <input
            className="field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 90 123 45 67"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide muted">
            {t.deliveryType}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["delivery", "pickup"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setDeliveryType(k)}
                className={`rounded-2xl border px-3 py-2.5 text-sm font-medium transition ${
                  deliveryType === k
                    ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                    : ""
                }`}
                style={deliveryType === k ? undefined : { borderColor: "var(--border)" }}
              >
                {k === "delivery" ? `🚚 ${t.delivery}` : `🏬 ${t.pickup}`}
              </button>
            ))}
          </div>
        </div>

        {deliveryType === "delivery" && (
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide muted">
              {t.address} *
            </label>
            <input
              className="field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Toshkent sh., ..."
              autoComplete="street-address"
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide muted">
            {t.comment}
          </label>
          <textarea
            className="field min-h-20 resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.commentPlaceholder}
          />
        </div>
      </div>

      {/* To'lov */}
      <div className="card mb-3 p-3.5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide muted">
          {t.paymentMethod}
        </div>
        <div className="flex flex-col gap-2">
          {methods.map((m) => (
            <button
              key={m.key}
              type="button"
              disabled={!m.enabled}
              onClick={() => setPaymentMethod(m.key)}
              className={`flex items-center justify-between rounded-2xl border px-3.5 py-3 text-sm transition disabled:opacity-40 ${
                paymentMethod === m.key
                  ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                  : ""
              }`}
              style={paymentMethod === m.key ? undefined : { borderColor: "var(--border)" }}
            >
              <span>
                {m.icon} {m.label}
              </span>
            </button>
          ))}
        </div>
        {paymentMethod === "card" && (
          <p className="mt-2.5 rounded-xl bg-[var(--color-brand-50)] p-2.5 text-[12px] leading-relaxed text-[var(--color-brand-800)]">
            💳 {t.payInstruction}
          </p>
        )}
      </div>

      {/* Yakun */}
      <div className="card p-3.5">
        <div className="flex items-center justify-between text-sm">
          <span className="muted">{t.subtotal}</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="muted">{t.deliveryFee}</span>
          <span className="tabular-nums">{fee === 0 ? "0" : formatPrice(fee)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t pt-2 text-base font-bold" style={{ borderColor: "var(--border)" }}>
          <span>{t.total}</span>
          <span className="tabular-nums">
            {formatPrice(total)} {t.som}
          </span>
        </div>

        {serverError && <p className="mt-2 text-xs text-red-500">{serverError}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={busy}
          className="btn-primary mt-3 w-full py-3.5 text-[15px]"
        >
          {busy ? `${t.loading}…` : t.placeOrder}
        </button>
      </div>
    </div>
  );
}

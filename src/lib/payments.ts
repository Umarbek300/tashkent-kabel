/**
 * To'lov usullari.
 *
 * Bu do'konda online-ekvayring (Payme/Click) ishlatilmaydi. Ikki usul bor:
 *
 *  1. cash — naqd yoki karta bilan yetkazib berish paytida to'lash.
 *  2. card — P2P o'tkazma: mijoz do'kon kartasiga pul tashlaydi va chekni
 *     operatorga yuboradi. Karta raqami admin paneldagi sozlamalarda saqlanadi
 *     (Setting jadvali: cardNumber, cardHolder, cardBank).
 *
 * To'lov holati (`Order.paymentStatus`) qo'lda boshqariladi: operator chekni
 * ko'rgach admin panelda "To'landi" deb belgilaydi.
 */

export type PaymentMethod = "cash" | "card";

export const PAYMENT_METHODS: PaymentMethod[] = ["cash", "card"];

export function isPaymentMethod(v: unknown): v is PaymentMethod {
  return v === "cash" || v === "card";
}

/** "8600123412341234" -> "8600 1234 1234 1234" */
export function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 12) return raw.trim();
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

/** Karta sozlangan bo'lsa P2P usulini ko'rsatamiz. */
export function isCardConfigured(settings: Record<string, string>): boolean {
  return Boolean(settings.cardNumber && settings.cardNumber.replace(/\D/g, "").length >= 12);
}

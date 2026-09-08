import { formatPrice } from "./format";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const CHAT_ID = process.env.TELEGRAM_ORDER_CHAT_ID ?? "";

export const ORDER_CHAT_ID = CHAT_ID;

/** Telegram Bot API ga umumiy so'rov. */
export async function tg<T = unknown>(
  method: string,
  body: Record<string, unknown>
): Promise<T | null> {
  if (!TOKEN) {
    console.warn(`[telegram] token yo'q — ${method} o'tkazib yuborildi`);
    return null;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as { ok: boolean; result?: T; description?: string };
    if (!data.ok) {
      console.error(`[telegram] ${method}:`, data.description);
      return null;
    }
    return data.result ?? null;
  } catch (e) {
    console.error(`[telegram] ${method} xatosi:`, e);
    return null;
  }
}

export function sendMessage(chatId: string | number, text: string, extra: Record<string, unknown> = {}) {
  return tg("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...extra,
  });
}

export type TgOrderPayload = {
  number: number;
  customerName: string;
  phone: string;
  address?: string | null;
  comment?: string | null;
  deliveryType: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  tgUsername?: string | null;
  items: { name: string; qty: number; price: number; unit: string }[];
};

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
}

export function buildOrderMessage(o: TgOrderPayload): string {
  const lines: string[] = [];
  lines.push(`🧾 <b>Yangi buyurtma #${o.number}</b>`);
  lines.push("");
  lines.push(`👤 <b>${esc(o.customerName)}</b>`);
  lines.push(`📞 ${esc(o.phone)}`);
  if (o.tgUsername) lines.push(`💬 @${esc(o.tgUsername)}`);
  lines.push(
    `🚚 ${o.deliveryType === "pickup" ? "O'zi olib ketadi" : "Yetkazib berish"}`
  );
  if (o.address) lines.push(`📍 ${esc(o.address)}`);
  lines.push(
    o.paymentMethod === "card"
      ? "💳 Kartaga o'tkazma — CHEK KUTILMOQDA"
      : "💵 Naqd / karta (yetkazishda)"
  );
  if (o.comment) lines.push(`📝 ${esc(o.comment)}`);
  lines.push("");
  lines.push("<b>Mahsulotlar:</b>");
  o.items.forEach((it, i) => {
    lines.push(
      `${i + 1}. ${esc(it.name)} — ${it.qty} × ${formatPrice(it.price)} = <b>${formatPrice(
        it.qty * it.price
      )}</b>`
    );
  });
  lines.push("");
  lines.push(`Mahsulotlar: ${formatPrice(o.subtotal)} so'm`);
  if (o.deliveryFee > 0) lines.push(`Yetkazish: ${formatPrice(o.deliveryFee)} so'm`);
  lines.push(`💰 <b>Jami: ${formatPrice(o.total)} so'm</b>`);
  return lines.join("\n");
}

/**
 * Buyurtmani Telegramga yuboradi.
 * Token/chat sozlanmagan bo'lsa jimgina o'tkazib yuboradi — buyurtma baribir bazaga yoziladi.
 */
export async function sendOrderToTelegram(o: TgOrderPayload): Promise<boolean> {
  if (!TOKEN || !CHAT_ID) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN yoki TELEGRAM_ORDER_CHAT_ID sozlanmagan — xabar yuborilmadi");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: buildOrderMessage(o),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error("[telegram] javob:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[telegram] yuborishda xato:", e);
    return false;
  }
}

import { NextResponse } from "next/server";
import { ORDER_CHAT_ID, sendMessage, tg } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Telegram webhook.
 *
 * Long-polling bot (bot/index.mjs) o'rniga ishlatiladi: Telegram o'zi shu
 * manzilga POST qiladi, ya'ni doimiy ishlab turadigan alohida server kerak emas.
 *
 * Ulash:  npm run bot:webhook
 * O'chirish (lokal poling'ga qaytish):  npm run bot:webhook:delete
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET ?? "";
const SUPPORT = process.env.TELEGRAM_SUPPORT ?? "";

type TgChat = { id: number; type: string; title?: string; first_name?: string };
type TgUser = { first_name?: string; last_name?: string; username?: string };
type TgMessage = {
  message_id: number;
  chat: TgChat;
  from?: TgUser;
  text?: string;
  photo?: unknown[];
  document?: unknown;
};

const WELCOME =
  "⚡ <b>Tashkent Kabel</b>ga xush kelibsiz!\n\n" +
  "Kabel, elektr mollari, sement, g'isht, armatura, kafel, santexnika va asboblar — " +
  "hammasi bir joyda, yetkazib berish bilan.\n\n" +
  "Katalogni ochish uchun pastdagi tugmani bosing 👇";

function displayName(from?: TgUser): string {
  if (!from) return "mijoz";
  const name = [from.first_name, from.last_name].filter(Boolean).join(" ");
  return name + (from.username ? ` (@${from.username})` : "");
}

/** To'lov chekini yoki savolni do'kon chatiga uzatadi. */
async function forwardToShop(msg: TgMessage, isReceipt: boolean) {
  if (!ORDER_CHAT_ID) {
    await sendMessage(msg.chat.id, "Xabaringiz qabul qilindi. Operator tez orada bog'lanadi.");
    return;
  }
  if (String(msg.chat.id) === ORDER_CHAT_ID) return; // o'zimizdan kelgan xabar

  await tg("forwardMessage", {
    chat_id: ORDER_CHAT_ID,
    from_chat_id: msg.chat.id,
    message_id: msg.message_id,
  });
  await sendMessage(
    ORDER_CHAT_ID,
    `${isReceipt ? "☝️ Yuqoridagi chek" : "☝️ Yuqoridagi savol"} — <b>${displayName(msg.from)}</b> dan.\n` +
      `Javob berish uchun chat: <code>${msg.chat.id}</code>`
  );
  await sendMessage(
    msg.chat.id,
    isReceipt
      ? "✅ Chekingiz qabul qilindi. Tekshirgach buyurtmangizni tasdiqlaymiz."
      : "Xabaringiz operatorga yuborildi."
  );
}

async function handleMessage(msg: TgMessage) {
  if (msg.photo || msg.document) {
    await forwardToShop(msg, true);
    return;
  }

  const text = (msg.text ?? "").trim();
  if (!text) return;

  if (text.startsWith("/start")) {
    const canOpen = SITE.startsWith("https://");
    await sendMessage(msg.chat.id, WELCOME, {
      reply_markup: {
        inline_keyboard: [
          canOpen
            ? [{ text: "🛒 Katalogni ochish", web_app: { url: SITE } }]
            : [{ text: "🛒 Katalog tayyorlanmoqda", callback_data: "noop" }],
          ...(SUPPORT ? [[{ text: "📞 Operator", url: `https://t.me/${SUPPORT}` }]] : []),
        ],
      },
    });
    return;
  }

  if (text === "/id") {
    await sendMessage(
      msg.chat.id,
      `Bu chatning ID'si: <code>${msg.chat.id}</code>\n\n` +
        `Buyurtmalar shu yerga tushishi uchun:\n<code>TELEGRAM_ORDER_CHAT_ID="${msg.chat.id}"</code>`
    );
    return;
  }

  await forwardToShop(msg, false);
}

export async function POST(req: Request) {
  // Telegram har so'rovda shu sarlavhani yuboradi — begona so'rovlarni to'sadi
  if (SECRET) {
    const got = req.headers.get("x-telegram-bot-api-secret-token");
    if (got !== SECRET) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  let update: { message?: TgMessage };
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  try {
    if (update.message) await handleMessage(update.message);
  } catch (e) {
    console.error("[telegram webhook]", e);
  }

  // Telegram doim 200 kutadi, aks holda xabarni qayta-qayta yuboradi
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "Telegram webhook — faqat POST" });
}

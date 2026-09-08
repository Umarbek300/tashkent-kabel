/**
 * Tashkent Kabel — Telegram bot.
 *
 * Vazifasi: mijozga Mini App'ni ochadigan tugma berish va buyurtma
 * xabarlarini qabul qiladigan chat ID'ni aniqlashga yordam berish.
 *
 * Ishga tushirish:
 *   node bot/index.mjs
 *
 * Kerakli .env o'zgaruvchilari:
 *   TELEGRAM_BOT_TOKEN   — @BotFather bergan token
 *   NEXT_PUBLIC_SITE_URL — saytning HTTPS manzili (Mini App faqat HTTPS bilan ishlaydi)
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env ni oddiy usulda o'qiymiz (qo'shimcha paketsiz)
function loadEnv() {
  try {
    const raw = readFileSync(join(__dirname, "..", ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const value = m[2].replace(/^["']|["']$/g, "");
      if (!process.env[m[1]]) process.env[m[1]] = value;
    }
  } catch {
    /* .env bo'lmasa ham davom etamiz */
  }
}
loadEnv();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SITE = process.env.NEXT_PUBLIC_SITE_URL;

if (!TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN yo'q. .env faylga yozing.");
  process.exit(1);
}
if (!SITE || !SITE.startsWith("https://")) {
  console.warn(
    "⚠️  NEXT_PUBLIC_SITE_URL HTTPS bo'lishi kerak — Telegram Mini App localhost'ni ochmaydi.\n" +
      "   Deploy qilganingizdan keyin haqiqiy manzilni yozing."
  );
}

const API = `https://api.telegram.org/bot${TOKEN}`;

async function call(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  const data = await res.json();
  if (!data.ok) console.error(`[${method}]`, data.description);
  return data.result;
}

const WELCOME =
  "⚡ <b>Tashkent Kabel</b>ga xush kelibsiz!\n\n" +
  "Kabel, elektr mollari, sement, g'isht, armatura, kafel, santexnika va asboblar — " +
  "hammasi bir joyda, yetkazib berish bilan.\n\n" +
  "Katalogni ochish uchun pastdagi tugmani bosing 👇";

const ORDER_CHAT = process.env.TELEGRAM_ORDER_CHAT_ID;

/** Mijoz yuborgan to'lov chekini do'kon chatiga uzatadi. */
async function forwardReceipt(msg) {
  const from = msg.from ?? {};
  const who =
    [from.first_name, from.last_name].filter(Boolean).join(" ") +
    (from.username ? ` (@${from.username})` : "");

  if (!ORDER_CHAT) {
    console.warn("⚠️  TELEGRAM_ORDER_CHAT_ID sozlanmagan — chek uzatilmadi.");
    await call("sendMessage", {
      chat_id: msg.chat.id,
      text: "Chek qabul qilindi. Operator tez orada bog'lanadi.",
    });
    return;
  }

  await call("forwardMessage", {
    chat_id: ORDER_CHAT,
    from_chat_id: msg.chat.id,
    message_id: msg.message_id,
  });
  await call("sendMessage", {
    chat_id: ORDER_CHAT,
    text:
      `☝️ Yuqoridagi chek — <b>${who || "mijoz"}</b> dan.\n` +
      `Javob berish uchun: <code>${msg.chat.id}</code>`,
    parse_mode: "HTML",
  });
  await call("sendMessage", {
    chat_id: msg.chat.id,
    text: "✅ Chekingiz qabul qilindi. Tekshirgach buyurtmangizni tasdiqlaymiz.",
  });
  console.log(`📎 Chek uzatildi — ${who || msg.chat.id}`);
}

async function handleUpdate(u) {
  const msg = u.message;
  if (!msg) return;

  // Rasm yoki fayl — to'lov cheki deb qabul qilamiz
  if (msg.photo || msg.document) {
    await forwardReceipt(msg);
    return;
  }

  if (!msg.text) return;

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  if (text.startsWith("/start")) {
    console.log(`▶️  /start — chat ${chatId} (${msg.chat.first_name ?? msg.chat.title ?? ""})`);
    await call("sendMessage", {
      chat_id: chatId,
      text: WELCOME,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          SITE?.startsWith("https://")
            ? [{ text: "🛒 Katalogni ochish", web_app: { url: SITE } }]
            : [{ text: "🛒 Katalog (sayt hali HTTPS emas)", callback_data: "noop" }],
        ],
      },
    });
    return;
  }

  if (text === "/id") {
    console.log(`\n📌 CHAT ID: ${chatId}  (${msg.chat.type}${msg.chat.title ? " — " + msg.chat.title : ""})`);
    console.log(`   .env ga yozing:  TELEGRAM_ORDER_CHAT_ID="${chatId}"\n`);
    await call("sendMessage", {
      chat_id: chatId,
      text:
        `Bu chatning ID'si: <code>${chatId}</code>\n\n` +
        "Buyurtmalar shu yerga tushishi uchun .env faylga yozing:\n" +
        `<code>TELEGRAM_ORDER_CHAT_ID="${chatId}"</code>`,
      parse_mode: "HTML",
    });
    return;
  }

  // Oddiy matn — mijoz savol yozgan bo'lishi mumkin, uni ham do'konga uzatamiz
  if (ORDER_CHAT && String(chatId) !== String(ORDER_CHAT)) {
    await call("forwardMessage", {
      chat_id: ORDER_CHAT,
      from_chat_id: chatId,
      message_id: msg.message_id,
    });
  }

  await call("sendMessage", {
    chat_id: chatId,
    text:
      "Xabaringiz operatorga yuborildi.\n\n" +
      "Katalogni ochish uchun /start buyrug'ini bosing.",
  });
}

async function main() {
  const me = await call("getMe");
  console.log(`✅ Bot ishga tushdi: @${me?.username}`);
  console.log("   /start — Mini App tugmasi");
  console.log("   /id    — chat ID'ni bilish (buyurtma xabarlari uchun)");
  console.log(
    ORDER_CHAT
      ? `   Cheklar va xabarlar ${ORDER_CHAT} chatiga uzatiladi`
      : "   ⚠️  TELEGRAM_ORDER_CHAT_ID sozlanmagan — cheklar uzatilmaydi"
  );

  // Menyu tugmasini ham Mini App'ga ulaymiz
  if (SITE?.startsWith("https://")) {
    await call("setChatMenuButton", {
      menu_button: { type: "web_app", text: "Katalog", web_app: { url: SITE } },
    });
  }

  let offset = 0;
  for (;;) {
    try {
      const updates = await call("getUpdates", { offset, timeout: 30 });
      for (const u of updates ?? []) {
        offset = u.update_id + 1;
        await handleUpdate(u);
      }
    } catch (e) {
      console.error("polling xatosi:", e.message);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

main();

/**
 * Telegram webhook'ni ro'yxatdan o'tkazish / o'chirish.
 *
 *   node bot/webhook.mjs          — webhook'ni yoqadi (deploy qilingandan keyin)
 *   node bot/webhook.mjs delete   — o'chiradi (lokal poling'ga qaytish uchun)
 *   node bot/webhook.mjs info     — hozirgi holatni ko'rsatadi
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const raw = readFileSync(join(__dirname, "..", ".env"), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* .env bo'lmasa ham davom etamiz */
}

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SITE = process.env.NEXT_PUBLIC_SITE_URL;
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const mode = process.argv[2] ?? "set";

if (!TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN yo'q.");
  process.exit(1);
}

const API = `https://api.telegram.org/bot${TOKEN}`;

async function call(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return res.json();
}

if (mode === "info") {
  const info = await call("getWebhookInfo");
  console.log(JSON.stringify(info.result, null, 2));
  process.exit(0);
}

if (mode === "delete") {
  const r = await call("deleteWebhook", { drop_pending_updates: false });
  console.log(r.ok ? "✅ Webhook o'chirildi — endi `npm run bot` bilan poling ishlatasiz." : r.description);
  process.exit(r.ok ? 0 : 1);
}

if (!SITE?.startsWith("https://")) {
  console.error(
    `❌ NEXT_PUBLIC_SITE_URL HTTPS bo'lishi kerak. Hozir: ${SITE || "(bo'sh)"}\n` +
      "   Avval saytni deploy qiling, keyin .env dagi manzilni yangilang."
  );
  process.exit(1);
}

if (!SECRET) {
  console.error(
    "❌ TELEGRAM_WEBHOOK_SECRET yo'q. .env ga tasodifiy uzun satr yozing, masalan:\n" +
      `   TELEGRAM_WEBHOOK_SECRET="${[...crypto.getRandomValues(new Uint8Array(24))]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")}"`
  );
  process.exit(1);
}

const url = `${SITE.replace(/\/$/, "")}/api/telegram`;
const r = await call("setWebhook", {
  url,
  secret_token: SECRET,
  allowed_updates: ["message"],
  drop_pending_updates: true,
});

if (!r.ok) {
  console.error("❌", r.description);
  process.exit(1);
}

console.log(`✅ Webhook ulandi: ${url}`);

// Menyu tugmasini ham Mini App'ga bog'laymiz
await call("setChatMenuButton", {
  menu_button: { type: "web_app", text: "Katalog", web_app: { url: SITE } },
});
console.log("✅ Botdagi «Katalog» menyu tugmasi Mini App'ga ulandi");

const info = await call("getWebhookInfo");
console.log("\nHolat:", JSON.stringify(info.result, null, 2));

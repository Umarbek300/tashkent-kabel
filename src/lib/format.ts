import type { Locale } from "@/i18n";

/** 1250000 -> "1 250 000" */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value)).replace(/ /g, " ");
}

export function formatMoney(value: number, locale: Locale): string {
  const suffix = locale === "ru" ? "сум" : locale === "en" ? "UZS" : "so'm";
  return `${formatPrice(value)} ${suffix}`;
}

export function formatDate(d: Date | string, locale: Locale): string {
  const date = typeof d === "string" ? new Date(d) : d;
  const tag = locale === "ru" ? "ru-RU" : locale === "en" ? "en-GB" : "uz-UZ";
  return new Intl.DateTimeFormat(tag, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** Faqat raqamlarni qoldiradi: "+998 (90) 123-45-67" -> "998901234567" */
export function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

/** O'zbekiston raqamini tekshiradi (998XXXXXXXXX yoki XXXXXXXXX). */
export function isValidUzPhone(s: string): boolean {
  const d = digitsOnly(s);
  if (d.length === 12 && d.startsWith("998")) return true;
  if (d.length === 9) return true;
  return false;
}

export function normalizePhone(s: string): string {
  const d = digitsOnly(s);
  if (d.length === 9) return "+998" + d;
  if (d.length === 12 && d.startsWith("998")) return "+" + d;
  return s.trim();
}

export function slugify(s: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "j", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh",
    щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
    ʻ: "", ʼ: "", "'": "", "’": "",
  };
  return s
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

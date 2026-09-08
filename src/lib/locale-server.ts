import { cookies } from "next/headers";
import { normalizeLocale, type Locale } from "@/i18n";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  return normalizeLocale(jar.get("locale")?.value);
}

import { prisma } from "@/lib/prisma";
import { saveSettingsAction } from "@/app/admin/actions";
import { isCardConfigured } from "@/lib/payments";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const rows = await prisma.setting.findMany();
  const s = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;

  const field = (name: string, label: string, type = "text", placeholder = "") => (
    <label className="block">
      <span className="mb-1 block text-xs muted">{label}</span>
      <input name={name} type={type} className="field" defaultValue={s[name] ?? ""} placeholder={placeholder} />
    </label>
  );

  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Sozlamalar</h1>

      <form action={saveSettingsAction} className="flex flex-col gap-3">
        <div className="card p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide muted">Do'kon nomi</div>
          <div className="grid gap-3 md:grid-cols-3">
            {field("shopNameUz", "O'zbekcha")}
            {field("shopNameRu", "Ruscha")}
            {field("shopNameEn", "Inglizcha")}
          </div>
          <div className="mb-3 mt-4 text-xs font-semibold uppercase tracking-wide muted">Shior</div>
          <div className="grid gap-3 md:grid-cols-3">
            {field("taglineUz", "O'zbekcha")}
            {field("taglineRu", "Ruscha")}
            {field("taglineEn", "Inglizcha")}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide muted">Kontakt</div>
          <div className="grid gap-3 md:grid-cols-2">
            {field("phone", "Telefon", "tel", "+998 90 123 45 67")}
            {field("workHours", "Ish vaqti", "text", "09:00 – 19:00")}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {field("addressUz", "Manzil (o'zbekcha)")}
            {field("addressRu", "Manzil (ruscha)")}
            {field("addressEn", "Manzil (inglizcha)")}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide muted">
            To'lov kartasi (P2P)
          </div>
          <p className="mb-3 text-xs muted">
            Mijoz shu kartaga pul o'tkazadi va chekni operatorga yuboradi. Bo'sh qoldirsangiz,
            saytda faqat &laquo;naqd / karta yetkazishda&raquo; usuli ko'rinadi.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {field("cardNumber", "Karta raqami", "text", "8600 1234 5678 9012")}
            {field("cardHolder", "Karta egasi", "text", "KARIMOV ALISHER")}
            {field("cardBank", "Bank", "text", "Uzcard / Humo")}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide muted">Yetkazib berish</div>
          <div className="grid gap-3 md:grid-cols-2">
            {field("deliveryFee", "Yetkazish narxi (so'm)", "number")}
            {field("freeDeliveryFrom", "Shu summadan yuqorisi bepul (so'm)", "number")}
          </div>
        </div>

        <button type="submit" className="btn-primary py-3 text-sm">Saqlash</button>
      </form>

      <div className="card mt-4 p-4 text-sm">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide muted">Integratsiyalar</div>
        <p className="leading-relaxed">
          <b>Telegram bot:</b>{" "}
          {process.env.TELEGRAM_BOT_TOKEN ? (
            <span className="text-emerald-600">ulangan ✓</span>
          ) : (
            <span className="text-amber-600">ulanmagan — .env faylga TELEGRAM_BOT_TOKEN va TELEGRAM_ORDER_CHAT_ID yozing</span>
          )}
        </p>
        <p className="mt-1.5 leading-relaxed">
          <b>To'lov kartasi:</b>{" "}
          {isCardConfigured(s) ? (
            <span className="text-emerald-600">sozlangan ✓</span>
          ) : (
            <span className="text-amber-600">
              sozlanmagan — yuqorida karta raqamini kiriting
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

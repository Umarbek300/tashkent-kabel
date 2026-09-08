# Tashkent Kabel

Kabel, elektr mollari va qurilish mollari sotadigan online do'kon. Bir kod bazasi — **oddiy sayt** ham,
**Telegram Mini App** ham bo'lib ishlaydi.

- **Next.js 15** (App Router) + **React 19** + **Tailwind CSS 4**
- **Prisma + SQLite** (Postgres'ga o'tish oson)
- 3 til: **o'zbek / rus / ingliz**
- Katalog, qidiruv, filtr, savat, saralanganlar, buyurtma
- Katalog: **kabel va elektr** bo'limi (162 pozitsiya) + qurilish mollari (107)
- Admin panel: mahsulot / kategoriya / buyurtma / sozlamalar
- Buyurtmalar Telegram botga tushadi
- To'lov: naqd (yetkazishda) yoki **kartaga P2P o'tkazma**

---

## 1. Ishga tushirish

```bash
npm install
npm run db:push      # bazani yaratish
npm run db:seed      # 21 kategoriya, 269 mahsulot
npm run dev          # http://localhost:3100
```

Admin panel: <http://localhost:3100/admin>
Parol `.env` dagi `ADMIN_PASSWORD` da. **Ishlab chiqarishda albatta kuchli parol qo'ying.**

> ⚠️ `npm run dev` ishlab turganda `npm run build` qilmang — ikkalasi ham `.next`
> papkasiga yozadi va kesh buziladi. Kerak bo'lsa avval dev'ni to'xtating.

---

## 2. `.env` sozlamalari

```env
DATABASE_URL="file:./dev.db"

ADMIN_PASSWORD="kuchli-parol"
ADMIN_SESSION_SECRET="tasodifiy-uzun-satr"

TELEGRAM_BOT_TOKEN=""                  # @BotFather bergan token
TELEGRAM_ORDER_CHAT_ID=""              # botga /id yozib oling
TELEGRAM_SUPPORT=""                    # bot username (@ belgisisiz)

NEXT_PUBLIC_SITE_URL="https://sizning-domeningiz.uz"
NEXT_PUBLIC_SHOP_PHONE="+998 90 123 45 67"
```

---

## 3. Telegram bot va Mini App

1. @BotFather dan token oling va `.env` dagi `TELEGRAM_BOT_TOKEN` ga yozing.
2. Botni ishga tushiring:
   ```bash
   npm run bot
   ```
3. Botga `/id` yozing — u chat ID'ni qaytaradi. Uni `TELEGRAM_ORDER_CHAT_ID`
   ga yozing va serverni qayta ishga tushiring. Bu qilinmaguncha buyurtmalar
   faqat admin panelda ko'rinadi, Telegramga xabar kelmaydi.
   (Buyurtmalar guruhga tushishini istasangiz, botni guruhga qo'shib,
   guruhda `/id` yozing — guruh ID'si `-100…` bilan boshlanadi.)
4. Saytni deploy qiling va `NEXT_PUBLIC_SITE_URL` ga **HTTPS** manzilni yozing.
   Telegram Mini App `localhost` ni ochmaydi.
5. Botga `/start` yozing — «Katalogni ochish» tugmasi Mini App'ni ochadi.

Buyurtma berilganda botga shunday xabar tushadi:

```
🧾 Yangi buyurtma #1001
👤 Alisher Karimov
📞 +998901234567
🚚 Yetkazib berish
📍 Toshkent, Chilonzor 5
💳 Kartaga o'tkazma — CHEK KUTILMOQDA

Mahsulotlar:
1. Sement M400, 50 kg — 3 × 52 000 = 156 000
...
💰 Jami: 328 000 so'm
```

Token yo'q bo'lsa buyurtma baribir bazaga yoziladi va admin panelda ko'rinadi —
faqat Telegram xabari yuborilmaydi.

---

## 4. To'lov — P2P karta

Online ekvayring (Payme/Click) ishlatilmaydi. Ikki usul bor:

| Usul | Qanday ishlaydi |
|---|---|
| **Naqd / karta (yetkazishda)** | Mijoz mahsulotni olganda to'laydi. Doim yoqilgan. |
| **Kartaga o'tkazma (P2P)** | Mijoz do'kon kartasiga pul tashlaydi va chekni operatorga yuboradi. |

**Sozlash:** admin panel → **Sozlamalar** → «To'lov kartasi (P2P)» bo'limiga
karta raqami, karta egasi va bank nomini yozing.

- Karta raqami bo'sh bo'lsa, checkout'da bu usul umuman ko'rinmaydi.
- Mijoz buyurtma bergach, tasdiq sahifasida karta raqami, to'lanadigan summa va
  ikkalasini bir bosishda nusxalash tugmasi chiqadi, plus «Chekni yuborish»
  tugmasi — u botni ochadi.
- **Bot chekni avtomatik uzatadi:** mijoz botga rasm yoki fayl yuborsa, bot uni
  `TELEGRAM_ORDER_CHAT_ID` chatiga forward qiladi va kim yuborganini yozadi.
  Oddiy matnli savollar ham shu chatga tushadi. Bu ishlashi uchun
  `TELEGRAM_ORDER_CHAT_ID` to'ldirilgan va `npm run bot` ishlab turgan bo'lishi kerak.
- Telegramga tushadigan xabarda `💳 Kartaga o'tkazma — CHEK KUTILMOQDA` deb yoziladi.
- Chek kelgach admin panelda buyurtmani ochib **To'lov holati → To'langan**
  qilasiz. Bu qo'lda bajariladi — avtomatik tekshiruv yo'q.

---

## 5. Loyiha tuzilishi

```
prisma/
  schema.prisma            ma'lumotlar bazasi modeli
  seed-electrical.ts       kabel va elektr mollari katalogi (7 kategoriya)
  seed-data.ts             qurilish mollari katalogi (14 kategoriya)
  seed.ts                  bazani to'ldirish (ikkalasini ham)
  seed-electrical-run.ts   faqat kabel bo'limini yangilash
bot/
  index.mjs              Telegram bot (Mini App tugmasi, /id)
src/
  i18n/index.ts          uz / ru / en lug'atlari
  lib/
    prisma.ts            Prisma klienti
    catalog.ts           katalog uchun so'rovlar
    format.ts            narx, sana, telefon, slug
    telegram.ts          buyurtma xabari
    auth.ts              admin sessiyasi (HMAC cookie)
    payments.ts          P2P karta yordamchilari
  components/            UI (savat, kartochka, filtr, admin forma…)
  app/
    page.tsx             Vitrina
    catalog/             Kategoriyalar ro'yxati
    c/[slug]/            Kategoriya + filtr
    p/[slug]/            Mahsulot sahifasi
    search/              Qidiruv
    favorites/           Saralanganlar
    cart/  checkout/     Savat va buyurtma
    order/[id]/          Buyurtma tasdiqlash
    api/orders/          Buyurtma qabul qilish
    admin/               Admin panel
```

---

## 6. Mahsulot rasmlari

Hozir rasm o'rniga kategoriya emojisi bilan chiroyli gradient ko'rsatiladi.
Haqiqiy rasm qo'yish uchun admin panelda mahsulotni oching va **«Rasm havolasi»**
maydoniga rasm URL'ini yozing. Rasmlarni o'z serveringizga yoki istalgan
fayl xostingiga joylashingiz mumkin.

---

## 7. Deploy

Eng oson yo'l — **Vercel** yoki **Railway**:

1. Loyihani GitHub'ga yuklang.
2. Vercel'da import qiling, `.env` o'zgaruvchilarini kiriting.
3. SQLite fayl tizimi Vercel'da saqlanmaydi — jonli ish uchun **Postgres**ga
   o'ting:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
   so'ng `npx prisma db push && npm run db:seed`.
4. Botni doimiy ishlab turishi uchun alohida joyda (Railway worker, VPS)
   `npm run bot` ni ishga tushiring.

---

## 8. Xavfsizlik haqida

- Narxlar **hech qachon mijozdan olinmaydi** — server har doim bazadagi narxni
  ishlatadi, shuning uchun brauzerdan narxni o'zgartirib bo'lmaydi.
- Admin sessiyasi HMAC bilan imzolangan `httpOnly` cookie, 12 soat amal qiladi.
- Telefon raqam server tomonda ham tekshiriladi.
- Ishlab chiqarishga chiqarishdan oldin `ADMIN_PASSWORD` va
  `ADMIN_SESSION_SECRET` ni albatta o'zgartiring.
- **Bot tokeni — parol bilan barobar.** Uni chatga, skrinshotga yoki GitHub'ga
  tushirmang. Agar tokeningiz boshqalarga ko'ringan bo'lsa, @BotFather da
  `/revoke` qilib yangisini oling va `.env` ni yangilang.
- `.env` fayli `.gitignore` da — GitHub'ga yuklanmaydi.

---

## 9. Katalogni yangilash

Narxlar va assortiment `prisma/seed-electrical.ts` (kabel/elektr) va
`prisma/seed-data.ts` (qurilish) fayllarida turadi.

- **Bitta mahsulot** — admin paneldan tahrirlang, tez va oson.
- **Ommaviy o'zgartirish** — seed faylini tahrirlab, `npm run db:seed` qiling.
  Seed `upsert` bilan ishlaydi: mavjud pozitsiyalar yangilanadi, yangilari
  qo'shiladi, admin paneldan qo'shganlaringiz o'chib ketmaydi.
- **Faqat kabel bo'limini** yangilash: `npm run db:seed:electrical`.

> Seed faylidagi narxlar taxminiy — prays-listingiz bo'yicha albatta tekshiring.

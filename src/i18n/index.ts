export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";

export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

export function normalizeLocale(v: unknown): Locale {
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

type Dict = {
  // navigatsiya
  navShowcase: string;
  navCatalog: string;
  navFavorites: string;
  navCart: string;
  // umumiy
  search: string;
  searchPlaceholder: string;
  all: string;
  seeAll: string;
  back: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  loading: string;
  nothingFound: string;
  som: string;
  from: string;
  to: string;
  apply: string;
  reset: string;
  sort: string;
  filters: string;
  // katalog
  categories: string;
  products: string;
  inStock: string;
  outOfStock: string;
  brand: string;
  sku: string;
  description: string;
  featured: string;
  newArrivals: string;
  priceRange: string;
  sortPopular: string;
  sortCheap: string;
  sortExpensive: string;
  sortNewest: string;
  // savat
  addToCart: string;
  inCart: string;
  cartEmpty: string;
  cartEmptyHint: string;
  goShopping: string;
  clearCart: string;
  subtotal: string;
  deliveryFee: string;
  total: string;
  checkout: string;
  quantity: string;
  // sevimlilar
  favoritesEmpty: string;
  favoritesEmptyHint: string;
  addToFavorites: string;
  // buyurtma
  orderTitle: string;
  yourName: string;
  phone: string;
  address: string;
  comment: string;
  commentPlaceholder: string;
  deliveryType: string;
  delivery: string;
  pickup: string;
  paymentMethod: string;
  cash: string;
  cardTransfer: string;
  cardTitle: string;
  cardNumberLabel: string;
  cardHolderLabel: string;
  cardBankLabel: string;
  amountToPay: string;
  copy: string;
  copied: string;
  payInstruction: string;
  sendReceipt: string;
  paymentStatusLabel: string;
  pay_pending: string;
  pay_paid: string;
  pay_failed: string;
  placeOrder: string;
  orderAccepted: string;
  orderAcceptedHint: string;
  orderNumber: string;
  backToShop: string;
  required: string;
  invalidPhone: string;
  // birliklar
  unit_piece: string;
  unit_kg: string;
  unit_ton: string;
  unit_m2: string;
  unit_m3: string;
  unit_m: string;
  unit_liter: string;
  unit_bag: string;
  unit_roll: string;
  unit_pack: string;
  unit_set: string;
  // holatlar
  status_new: string;
  status_confirmed: string;
  status_delivering: string;
  status_done: string;
  status_cancelled: string;
};

const uz: Dict = {
  navShowcase: "Vitrina",
  navCatalog: "Katalog",
  navFavorites: "Saralangan",
  navCart: "Savat",
  search: "Qidirish",
  searchPlaceholder: "Mahsulot qidirish…",
  all: "Hammasi",
  seeAll: "Barchasi",
  back: "Orqaga",
  save: "Saqlash",
  cancel: "Bekor qilish",
  delete: "O'chirish",
  edit: "Tahrirlash",
  add: "Qo'shish",
  loading: "Yuklanmoqda",
  nothingFound: "Hech narsa topilmadi",
  som: "so'm",
  from: "dan",
  to: "gacha",
  apply: "Qo'llash",
  reset: "Tozalash",
  sort: "Saralash",
  filters: "Filtrlar",
  categories: "Kategoriyalar",
  products: "Mahsulotlar",
  inStock: "Mavjud",
  outOfStock: "Tugagan",
  brand: "Brend",
  sku: "Artikul",
  description: "Tavsif",
  featured: "Tavsiya etamiz",
  newArrivals: "Yangi kelganlar",
  priceRange: "Narx oralig'i",
  sortPopular: "Ommabop",
  sortCheap: "Avval arzoni",
  sortExpensive: "Avval qimmati",
  sortNewest: "Avval yangisi",
  addToCart: "Savatga",
  inCart: "Savatda",
  cartEmpty: "Savat bo'sh",
  cartEmptyHint: "Katalogdan mahsulot tanlang",
  goShopping: "Katalogga o'tish",
  clearCart: "Savatni tozalash",
  subtotal: "Mahsulotlar",
  deliveryFee: "Yetkazib berish",
  total: "Jami",
  checkout: "Buyurtma berish",
  quantity: "Soni",
  favoritesEmpty: "Saralanganlar bo'sh",
  favoritesEmptyHint: "Yoqqan mahsulotni ❤ bilan belgilang",
  addToFavorites: "Saralanganlarga",
  orderTitle: "Buyurtmani rasmiylashtirish",
  yourName: "Ismingiz",
  phone: "Telefon raqam",
  address: "Manzil",
  comment: "Izoh",
  commentPlaceholder: "Qo'shimcha ma'lumot, mo'ljal…",
  deliveryType: "Yetkazib berish turi",
  delivery: "Yetkazib berish",
  pickup: "O'zim olib ketaman",
  paymentMethod: "To'lov usuli",
  cash: "Naqd / karta (yetkazishda)",
  cardTransfer: "Kartaga o'tkazma",
  cardTitle: "To'lov uchun karta",
  cardNumberLabel: "Karta raqami",
  cardHolderLabel: "Karta egasi",
  cardBankLabel: "Bank",
  amountToPay: "To'lanadigan summa",
  copy: "Nusxalash",
  copied: "Nusxalandi",
  payInstruction:
    "Quyidagi kartaga summani o'tkazing va to'lov chekini operatorga yuboring. Chek tasdiqlangach buyurtma jo'natiladi.",
  sendReceipt: "Chekni yuborish",
  paymentStatusLabel: "To'lov holati",
  pay_pending: "To'lov kutilmoqda",
  pay_paid: "To'langan",
  pay_failed: "To'lov amalga oshmadi",
  placeOrder: "Buyurtmani yuborish",
  orderAccepted: "Buyurtmangiz qabul qilindi!",
  orderAcceptedHint: "Operatorimiz tez orada siz bilan bog'lanadi.",
  orderNumber: "Buyurtma raqami",
  backToShop: "Do'konga qaytish",
  required: "Bu maydon to'ldirilishi shart",
  invalidPhone: "Telefon raqamni to'g'ri kiriting",
  unit_piece: "dona",
  unit_kg: "kg",
  unit_ton: "tonna",
  unit_m2: "m²",
  unit_m3: "m³",
  unit_m: "m",
  unit_liter: "litr",
  unit_bag: "qop",
  unit_roll: "rulon",
  unit_pack: "upakovka",
  unit_set: "komplekt",
  status_new: "Yangi",
  status_confirmed: "Tasdiqlangan",
  status_delivering: "Yo'lda",
  status_done: "Yakunlangan",
  status_cancelled: "Bekor qilingan",
};

const ru: Dict = {
  navShowcase: "Витрина",
  navCatalog: "Каталог",
  navFavorites: "Избранные",
  navCart: "Корзина",
  search: "Поиск",
  searchPlaceholder: "Поиск товара…",
  all: "Все",
  seeAll: "Все",
  back: "Назад",
  save: "Сохранить",
  cancel: "Отмена",
  delete: "Удалить",
  edit: "Изменить",
  add: "Добавить",
  loading: "Загрузка",
  nothingFound: "Ничего не найдено",
  som: "сум",
  from: "от",
  to: "до",
  apply: "Применить",
  reset: "Сбросить",
  sort: "Сортировка",
  filters: "Фильтры",
  categories: "Категории",
  products: "Товары",
  inStock: "В наличии",
  outOfStock: "Нет в наличии",
  brand: "Бренд",
  sku: "Артикул",
  description: "Описание",
  featured: "Рекомендуем",
  newArrivals: "Новинки",
  priceRange: "Диапазон цен",
  sortPopular: "Популярные",
  sortCheap: "Сначала дешёвые",
  sortExpensive: "Сначала дорогие",
  sortNewest: "Сначала новые",
  addToCart: "В корзину",
  inCart: "В корзине",
  cartEmpty: "Корзина пуста",
  cartEmptyHint: "Выберите товар из каталога",
  goShopping: "Перейти в каталог",
  clearCart: "Очистить корзину",
  subtotal: "Товары",
  deliveryFee: "Доставка",
  total: "Итого",
  checkout: "Оформить заказ",
  quantity: "Количество",
  favoritesEmpty: "Избранные пусты",
  favoritesEmptyHint: "Отметьте понравившийся товар значком ❤",
  addToFavorites: "В избранное",
  orderTitle: "Оформление заказа",
  yourName: "Ваше имя",
  phone: "Номер телефона",
  address: "Адрес",
  comment: "Комментарий",
  commentPlaceholder: "Доп. информация, ориентир…",
  deliveryType: "Способ получения",
  delivery: "Доставка",
  pickup: "Самовывоз",
  paymentMethod: "Способ оплаты",
  cash: "Наличные / карта (при получении)",
  cardTransfer: "Перевод на карту",
  cardTitle: "Карта для оплаты",
  cardNumberLabel: "Номер карты",
  cardHolderLabel: "Владелец карты",
  cardBankLabel: "Банк",
  amountToPay: "Сумма к оплате",
  copy: "Копировать",
  copied: "Скопировано",
  payInstruction:
    "Переведите сумму на карту ниже и отправьте чек оператору. После подтверждения чека заказ будет отправлен.",
  sendReceipt: "Отправить чек",
  paymentStatusLabel: "Статус оплаты",
  pay_pending: "Ожидает оплаты",
  pay_paid: "Оплачено",
  pay_failed: "Оплата не прошла",
  placeOrder: "Отправить заказ",
  orderAccepted: "Ваш заказ принят!",
  orderAcceptedHint: "Наш оператор свяжется с вами в ближайшее время.",
  orderNumber: "Номер заказа",
  backToShop: "Вернуться в магазин",
  required: "Обязательное поле",
  invalidPhone: "Введите корректный номер",
  unit_piece: "шт",
  unit_kg: "кг",
  unit_ton: "тонна",
  unit_m2: "м²",
  unit_m3: "м³",
  unit_m: "м",
  unit_liter: "литр",
  unit_bag: "мешок",
  unit_roll: "рулон",
  unit_pack: "упаковка",
  unit_set: "комплект",
  status_new: "Новый",
  status_confirmed: "Подтверждён",
  status_delivering: "В пути",
  status_done: "Завершён",
  status_cancelled: "Отменён",
};

const en: Dict = {
  navShowcase: "Showcase",
  navCatalog: "Catalog",
  navFavorites: "Favorites",
  navCart: "Cart",
  search: "Search",
  searchPlaceholder: "Search products…",
  all: "All",
  seeAll: "See all",
  back: "Back",
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  add: "Add",
  loading: "Loading",
  nothingFound: "Nothing found",
  som: "UZS",
  from: "from",
  to: "to",
  apply: "Apply",
  reset: "Reset",
  sort: "Sort",
  filters: "Filters",
  categories: "Categories",
  products: "Products",
  inStock: "In stock",
  outOfStock: "Out of stock",
  brand: "Brand",
  sku: "SKU",
  description: "Description",
  featured: "Featured",
  newArrivals: "New arrivals",
  priceRange: "Price range",
  sortPopular: "Popular",
  sortCheap: "Cheapest first",
  sortExpensive: "Most expensive first",
  sortNewest: "Newest first",
  addToCart: "Add to cart",
  inCart: "In cart",
  cartEmpty: "Your cart is empty",
  cartEmptyHint: "Pick something from the catalog",
  goShopping: "Go to catalog",
  clearCart: "Clear cart",
  subtotal: "Items",
  deliveryFee: "Delivery",
  total: "Total",
  checkout: "Checkout",
  quantity: "Quantity",
  favoritesEmpty: "No favorites yet",
  favoritesEmptyHint: "Tap ❤ on a product you like",
  addToFavorites: "Add to favorites",
  orderTitle: "Checkout",
  yourName: "Your name",
  phone: "Phone number",
  address: "Address",
  comment: "Comment",
  commentPlaceholder: "Extra details, landmark…",
  deliveryType: "Fulfilment",
  delivery: "Delivery",
  pickup: "Pickup",
  paymentMethod: "Payment method",
  cash: "Cash / card on delivery",
  cardTransfer: "Bank card transfer",
  cardTitle: "Card for payment",
  cardNumberLabel: "Card number",
  cardHolderLabel: "Cardholder",
  cardBankLabel: "Bank",
  amountToPay: "Amount due",
  copy: "Copy",
  copied: "Copied",
  payInstruction:
    "Transfer the amount to the card below and send the receipt to the operator. The order ships once the receipt is confirmed.",
  sendReceipt: "Send receipt",
  paymentStatusLabel: "Payment status",
  pay_pending: "Awaiting payment",
  pay_paid: "Paid",
  pay_failed: "Payment failed",
  placeOrder: "Place order",
  orderAccepted: "Your order has been received!",
  orderAcceptedHint: "Our operator will contact you shortly.",
  orderNumber: "Order number",
  backToShop: "Back to shop",
  required: "This field is required",
  invalidPhone: "Enter a valid phone number",
  unit_piece: "pc",
  unit_kg: "kg",
  unit_ton: "ton",
  unit_m2: "m²",
  unit_m3: "m³",
  unit_m: "m",
  unit_liter: "L",
  unit_bag: "bag",
  unit_roll: "roll",
  unit_pack: "pack",
  unit_set: "set",
  status_new: "New",
  status_confirmed: "Confirmed",
  status_delivering: "On the way",
  status_done: "Completed",
  status_cancelled: "Cancelled",
};

export const DICTS: Record<Locale, Dict> = { uz, ru, en };

export function t(locale: Locale): Dict {
  return DICTS[locale] ?? DICTS[DEFAULT_LOCALE];
}

/** DB yozuvidan joriy tildagi nomni oladi. */
export function pick<T extends Record<string, unknown>>(
  row: T,
  field: string,
  locale: Locale
): string {
  const key = field + locale.charAt(0).toUpperCase() + locale.slice(1);
  const val = row[key as keyof T];
  if (typeof val === "string" && val.trim()) return val;
  const fallback = row[(field + "Uz") as keyof T];
  return typeof fallback === "string" ? fallback : "";
}

/** "10 ta mahsulot" / "10 товаров" / "10 products" */
export function productsCount(n: number, locale: Locale): string {
  if (locale === "uz") return `${n} ta mahsulot`;
  if (locale === "en") return `${n} product${n === 1 ? "" : "s"}`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} товар`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} товара`;
  return `${n} товаров`;
}

export function unitLabel(unit: string, locale: Locale): string {
  const d = t(locale) as unknown as Record<string, string>;
  return d["unit_" + unit] ?? unit;
}

export function paymentStatusLabel(status: string, locale: Locale): string {
  const d = t(locale) as unknown as Record<string, string>;
  return d["pay_" + status] ?? status;
}

export function statusLabel(status: string, locale: Locale): string {
  const d = t(locale) as unknown as Record<string, string>;
  return d["status_" + status] ?? status;
}

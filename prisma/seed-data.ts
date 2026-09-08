export type SeedCategory = {
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  icon: string;
  products: SeedProduct[];
};

export type SeedProduct = {
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  unit: string;
  stock: number;
  featured?: boolean;
  descUz?: string;
  descRu?: string;
  descEn?: string;
};

export const CATEGORIES: SeedCategory[] = [
  {
    slug: "sement-quruq-aralashmalar",
    nameUz: "Sement va quruq aralashmalar",
    nameRu: "Цемент и сухие смеси",
    nameEn: "Cement & dry mixes",
    icon: "🧱",
    products: [
      { slug: "sement-m400-50kg", nameUz: "Sement M400, 50 kg", nameRu: "Цемент М400, 50 кг", nameEn: "Cement M400, 50 kg", brand: "Qizilqumsement", price: 52000, unit: "bag", stock: 800, featured: true, descUz: "Umumiy qurilish ishlari uchun portlandsement. Qop hajmi 50 kg.", descRu: "Портландцемент для общестроительных работ. Мешок 50 кг.", descEn: "General-purpose Portland cement. 50 kg bag." },
      { slug: "sement-m500-50kg", nameUz: "Sement M500, 50 kg", nameRu: "Цемент М500, 50 кг", nameEn: "Cement M500, 50 kg", brand: "Qizilqumsement", price: 61000, oldPrice: 66000, unit: "bag", stock: 640, featured: true, descUz: "Yuqori mustahkamlikdagi sement — poydevor va temir-beton ishlari uchun.", descRu: "Высокопрочный цемент для фундаментов и железобетонных работ.", descEn: "High-strength cement for foundations and reinforced concrete." },
      { slug: "sement-oq-25kg", nameUz: "Oq sement, 25 kg", nameRu: "Белый цемент, 25 кг", nameEn: "White cement, 25 kg", brand: "Adana", price: 98000, unit: "bag", stock: 120 },
      { slug: "gips-alebastr-25kg", nameUz: "Gips (alebastr), 25 kg", nameRu: "Гипс (алебастр), 25 кг", nameEn: "Gypsum plaster, 25 kg", price: 34000, unit: "bag", stock: 300 },
      { slug: "plitka-yelimi-25kg", nameUz: "Kafel yelimi, 25 kg", nameRu: "Клей для плитки, 25 кг", nameEn: "Tile adhesive, 25 kg", brand: "Ceresit", price: 68000, unit: "bag", stock: 240, featured: true },
      { slug: "shpaklyovka-start-20kg", nameUz: "Shpaklyovka «Start», 20 kg", nameRu: "Шпаклёвка «Старт», 20 кг", nameEn: "Base filler, 20 kg", brand: "Knauf", price: 58000, unit: "bag", stock: 180 },
      { slug: "shpaklyovka-finish-20kg", nameUz: "Shpaklyovka «Finish», 20 kg", nameRu: "Шпаклёвка «Финиш», 20 кг", nameEn: "Finish filler, 20 kg", brand: "Knauf", price: 72000, unit: "bag", stock: 160 },
      { slug: "gruntovka-10l", nameUz: "Gruntovka, 10 l", nameRu: "Грунтовка, 10 л", nameEn: "Primer, 10 L", brand: "Ceresit", price: 89000, unit: "piece", stock: 95 },
      { slug: "qum-yuvilgan-1t", nameUz: "Yuvilgan qum, 1 tonna", nameRu: "Мытый песок, 1 тонна", nameEn: "Washed sand, 1 ton", price: 190000, unit: "ton", stock: 500 },
      { slug: "shagal-5-20-1t", nameUz: "Shag'al 5–20 mm, 1 tonna", nameRu: "Щебень 5–20 мм, 1 тонна", nameEn: "Gravel 5–20 mm, 1 ton", price: 215000, unit: "ton", stock: 400 },
    ],
  },
  {
    slug: "gisht-bloklar",
    nameUz: "G'isht va bloklar",
    nameRu: "Кирпич и блоки",
    nameEn: "Bricks & blocks",
    icon: "🧱",
    products: [
      { slug: "gisht-qizil-toliq", nameUz: "Qizil g'isht, to'liq", nameRu: "Кирпич красный полнотелый", nameEn: "Red solid brick", price: 1350, unit: "piece", stock: 50000, featured: true, descUz: "M100 markali pishirilgan qizil g'isht. Devor va poydevor uchun.", descRu: "Обожжённый красный кирпич марки М100.", descEn: "Fired red brick, grade M100." },
      { slug: "gisht-qizil-teshikli", nameUz: "Qizil g'isht, teshikli", nameRu: "Кирпич красный пустотелый", nameEn: "Red hollow brick", price: 1150, unit: "piece", stock: 42000 },
      { slug: "gisht-silikat-oq", nameUz: "Silikat g'isht (oq)", nameRu: "Силикатный кирпич (белый)", nameEn: "Silicate brick (white)", price: 1250, unit: "piece", stock: 30000 },
      { slug: "gazoblok-600x300x200", nameUz: "Gazoblok 600×300×200 mm", nameRu: "Газоблок 600×300×200 мм", nameEn: "Aerated block 600×300×200 mm", brand: "AAC", price: 21000, unit: "piece", stock: 9000, featured: true },
      { slug: "gazoblok-600x300x100", nameUz: "Gazoblok 600×300×100 mm", nameRu: "Газоблок 600×300×100 мм", nameEn: "Aerated block 600×300×100 mm", brand: "AAC", price: 12000, unit: "piece", stock: 7500 },
      { slug: "shlakoblok-390x190x190", nameUz: "Shlakoblok 390×190×190 mm", nameRu: "Шлакоблок 390×190×190 мм", nameEn: "Cinder block 390×190×190 mm", price: 6500, unit: "piece", stock: 15000 },
      { slug: "keramzitblok", nameUz: "Keramzitblok", nameRu: "Керамзитоблок", nameEn: "Expanded clay block", price: 9500, unit: "piece", stock: 6000 },
      { slug: "bordyur-toshi", nameUz: "Bordyur toshi 100×30×15", nameRu: "Бордюрный камень 100×30×15", nameEn: "Kerb stone 100×30×15", price: 48000, unit: "piece", stock: 1200 },
      { slug: "trotuar-plitka-vibro", nameUz: "Trotuar plitkasi (vibropress)", nameRu: "Тротуарная плитка (вибропресс)", nameEn: "Paving slab (vibro-pressed)", price: 78000, unit: "m2", stock: 2400 },
    ],
  },
  {
    slug: "metall-armatura",
    nameUz: "Metall va armatura",
    nameRu: "Металл и арматура",
    nameEn: "Metal & rebar",
    icon: "⚙️",
    products: [
      { slug: "armatura-a500-10mm", nameUz: "Armatura A500C, Ø10 mm", nameRu: "Арматура А500С, Ø10 мм", nameEn: "Rebar A500C, Ø10 mm", price: 9800, unit: "m", stock: 12000, featured: true },
      { slug: "armatura-a500-12mm", nameUz: "Armatura A500C, Ø12 mm", nameRu: "Арматура А500С, Ø12 мм", nameEn: "Rebar A500C, Ø12 mm", price: 13500, unit: "m", stock: 10000, featured: true },
      { slug: "armatura-a500-16mm", nameUz: "Armatura A500C, Ø16 mm", nameRu: "Арматура А500С, Ø16 мм", nameEn: "Rebar A500C, Ø16 mm", price: 23500, unit: "m", stock: 6000 },
      { slug: "profil-truba-40x40", nameUz: "Profil truba 40×40×2 mm", nameRu: "Профильная труба 40×40×2 мм", nameEn: "Square tube 40×40×2 mm", price: 34000, unit: "m", stock: 3500 },
      { slug: "profil-truba-60x40", nameUz: "Profil truba 60×40×2 mm", nameRu: "Профильная труба 60×40×2 мм", nameEn: "Rect. tube 60×40×2 mm", price: 46000, unit: "m", stock: 2800 },
      { slug: "burchak-50x50", nameUz: "Metall burchak 50×50×5 mm", nameRu: "Уголок 50×50×5 мм", nameEn: "Steel angle 50×50×5 mm", price: 52000, unit: "m", stock: 2000 },
      { slug: "shveller-10", nameUz: "Shveller №10", nameRu: "Швеллер №10", nameEn: "Channel bar No.10", price: 118000, unit: "m", stock: 900 },
      { slug: "list-metall-2mm", nameUz: "Metall list 2 mm", nameRu: "Лист металлический 2 мм", nameEn: "Steel sheet 2 mm", price: 265000, unit: "m2", stock: 700 },
      { slug: "setka-armatura-100x100", nameUz: "Armatura setkasi 100×100 mm", nameRu: "Сетка арматурная 100×100 мм", nameEn: "Rebar mesh 100×100 mm", price: 68000, unit: "m2", stock: 1500 },
      { slug: "sim-boglash-1-2mm", nameUz: "Bog'lash simi 1,2 mm", nameRu: "Вязальная проволока 1,2 мм", nameEn: "Tie wire 1.2 mm", price: 17000, unit: "kg", stock: 2200 },
    ],
  },
  {
    slug: "yogoch-materiallar",
    nameUz: "Yog'och materiallar",
    nameRu: "Пиломатериалы",
    nameEn: "Timber",
    icon: "🪵",
    products: [
      { slug: "brus-50x50", nameUz: "Brus 50×50 mm, 3 m", nameRu: "Брус 50×50 мм, 3 м", nameEn: "Timber beam 50×50 mm, 3 m", price: 32000, unit: "piece", stock: 1800 },
      { slug: "brus-100x100", nameUz: "Brus 100×100 mm, 3 m", nameRu: "Брус 100×100 мм, 3 м", nameEn: "Timber beam 100×100 mm, 3 m", price: 128000, unit: "piece", stock: 600 },
      { slug: "doska-obreznaya-25", nameUz: "Taxta (qirqilgan) 25 mm", nameRu: "Доска обрезная 25 мм", nameEn: "Edged board 25 mm", price: 2850000, unit: "m3", stock: 60, featured: true },
      { slug: "fanera-10mm", nameUz: "Fanera 10 mm, 1525×1525", nameRu: "Фанера 10 мм, 1525×1525", nameEn: "Plywood 10 mm, 1525×1525", price: 215000, unit: "piece", stock: 320 },
      { slug: "fanera-18mm", nameUz: "Fanera 18 mm, 1525×1525", nameRu: "Фанера 18 мм, 1525×1525", nameEn: "Plywood 18 mm, 1525×1525", price: 385000, unit: "piece", stock: 180 },
      { slug: "osb-9mm", nameUz: "OSB-3 plita 9 mm", nameRu: "Плита ОСБ-3 9 мм", nameEn: "OSB-3 board 9 mm", price: 178000, unit: "piece", stock: 420 },
      { slug: "dsp-16mm", nameUz: "DSP (LDSP) 16 mm", nameRu: "ЛДСП 16 мм", nameEn: "Laminated chipboard 16 mm", price: 245000, unit: "piece", stock: 260 },
      { slug: "vagonka-lipa", nameUz: "Vagonka (jo'ka), sm klass", nameRu: "Вагонка липа, класс «Экстра»", nameEn: "Lime wood cladding, extra grade", price: 165000, unit: "m2", stock: 500 },
    ],
  },
  {
    slug: "boyoq-lak",
    nameUz: "Bo'yoq va lak",
    nameRu: "Краски и лаки",
    nameEn: "Paints & varnishes",
    icon: "🎨",
    products: [
      { slug: "vodoemulsiya-oq-15kg", nameUz: "Suvemulsiya bo'yoq oq, 15 kg", nameRu: "Водоэмульсионная краска белая, 15 кг", nameEn: "Water-based paint, white, 15 kg", brand: "Sadolin", price: 168000, unit: "piece", stock: 220, featured: true },
      { slug: "vodoemulsiya-fasad-15kg", nameUz: "Fasad bo'yog'i, 15 kg", nameRu: "Фасадная краска, 15 кг", nameEn: "Facade paint, 15 kg", brand: "Dufa", price: 245000, unit: "piece", stock: 140 },
      { slug: "emal-pf115-2-7kg", nameUz: "PF-115 emal, 2,7 kg", nameRu: "Эмаль ПФ-115, 2,7 кг", nameEn: "Alkyd enamel PF-115, 2.7 kg", price: 78000, unit: "piece", stock: 300 },
      { slug: "lak-yaxta-1l", nameUz: "Yaxta laki, 1 l", nameRu: "Яхтный лак, 1 л", nameEn: "Yacht varnish, 1 L", price: 96000, unit: "liter", stock: 130 },
      { slug: "dekorativ-shtukaturka-25kg", nameUz: "Dekorativ shtukaturka «Korak», 25 kg", nameRu: "Декоративная штукатурка «Короед», 25 кг", nameEn: "Decorative render, 25 kg", brand: "Ceresit", price: 185000, unit: "bag", stock: 90 },
      { slug: "rastvoritel-646-1l", nameUz: "Erituvchi 646, 1 l", nameRu: "Растворитель 646, 1 л", nameEn: "Solvent 646, 1 L", price: 24000, unit: "liter", stock: 400 },
      { slug: "valik-nabor", nameUz: "Valik to'plami (250 mm)", nameRu: "Набор валиков (250 мм)", nameEn: "Roller set (250 mm)", price: 45000, unit: "set", stock: 260 },
      { slug: "malyar-lenta", nameUz: "Malyar lentasi 48 mm", nameRu: "Малярный скотч 48 мм", nameEn: "Masking tape 48 mm", price: 12000, unit: "roll", stock: 900 },
    ],
  },
  {
    slug: "kafel-keramika",
    nameUz: "Kafel va keramika",
    nameRu: "Плитка и керамика",
    nameEn: "Tiles & ceramics",
    icon: "🔲",
    products: [
      { slug: "kafel-devor-30x60", nameUz: "Devor kafeli 30×60 sm", nameRu: "Настенная плитка 30×60 см", nameEn: "Wall tile 30×60 cm", brand: "Akfa", price: 78000, unit: "m2", stock: 3200, featured: true },
      { slug: "kafel-pol-60x60", nameUz: "Pol keramogranit 60×60 sm", nameRu: "Керамогранит напольный 60×60 см", nameEn: "Floor porcelain tile 60×60 cm", brand: "Akfa", price: 125000, oldPrice: 140000, unit: "m2", stock: 2600, featured: true },
      { slug: "keramogranit-80x80", nameUz: "Keramogranit 80×80 sm, sayqallangan", nameRu: "Керамогранит 80×80 см, полированный", nameEn: "Polished porcelain 80×80 cm", price: 198000, unit: "m2", stock: 1400 },
      { slug: "mozaika-steklo", nameUz: "Shisha mozaika", nameRu: "Стеклянная мозаика", nameEn: "Glass mosaic", price: 165000, unit: "m2", stock: 400 },
      { slug: "zatirka-2kg", nameUz: "Chok to'ldirgich (zatirka), 2 kg", nameRu: "Затирка для швов, 2 кг", nameEn: "Tile grout, 2 kg", brand: "Ceresit", price: 38000, unit: "pack", stock: 500 },
      { slug: "krestiki-2mm", nameUz: "Kafel krestchalari 2 mm (200 dona)", nameRu: "Крестики для плитки 2 мм (200 шт)", nameEn: "Tile spacers 2 mm (200 pcs)", price: 9000, unit: "pack", stock: 800 },
      { slug: "profil-kafel-alum", nameUz: "Alyuminiy kafel profili, 2,5 m", nameRu: "Алюминиевый профиль для плитки, 2,5 м", nameEn: "Aluminium tile trim, 2.5 m", price: 32000, unit: "piece", stock: 600 },
    ],
  },
  {
    slug: "pol-qoplamalari",
    nameUz: "Pol qoplamalari",
    nameRu: "Напольные покрытия",
    nameEn: "Flooring",
    icon: "🪟",
    products: [
      { slug: "laminat-8mm-32", nameUz: "Laminat 8 mm, 32-klass", nameRu: "Ламинат 8 мм, 32 класс", nameEn: "Laminate 8 mm, class 32", brand: "Kronospan", price: 118000, unit: "m2", stock: 2800, featured: true },
      { slug: "laminat-12mm-33", nameUz: "Laminat 12 mm, 33-klass", nameRu: "Ламинат 12 мм, 33 класс", nameEn: "Laminate 12 mm, class 33", brand: "Kronospan", price: 168000, unit: "m2", stock: 1500 },
      { slug: "linoleum-kommercheskiy", nameUz: "Linoleum, kommersiya", nameRu: "Линолеум коммерческий", nameEn: "Commercial linoleum", price: 145000, unit: "m2", stock: 1800 },
      { slug: "podlojka-3mm", nameUz: "Laminat ostligi 3 mm", nameRu: "Подложка под ламинат 3 мм", nameEn: "Laminate underlay 3 mm", price: 18000, unit: "m2", stock: 3000 },
      { slug: "plintus-plastik", nameUz: "Plastik plintus 2,5 m", nameRu: "Плинтус пластиковый 2,5 м", nameEn: "PVC skirting 2.5 m", price: 28000, unit: "piece", stock: 1200 },
      { slug: "nalivnoy-pol-25kg", nameUz: "O'z-o'zidan tekislanuvchi pol, 25 kg", nameRu: "Наливной пол, 25 кг", nameEn: "Self-levelling floor, 25 kg", brand: "Knauf", price: 82000, unit: "bag", stock: 300 },
    ],
  },
  {
    slug: "santexnika",
    nameUz: "Santexnika",
    nameRu: "Сантехника",
    nameEn: "Plumbing",
    icon: "🚿",
    products: [
      { slug: "unitaz-kompakt", nameUz: "Unitaz-kompakt", nameRu: "Унитаз-компакт", nameEn: "Close-coupled toilet", brand: "Akfa", price: 890000, oldPrice: 980000, unit: "piece", stock: 85, featured: true },
      { slug: "rakovina-60", nameUz: "Rakovina 60 sm", nameRu: "Раковина 60 см", nameEn: "Washbasin 60 cm", brand: "Akfa", price: 420000, unit: "piece", stock: 110 },
      { slug: "smesitel-rakovina", nameUz: "Rakovina smesiteli", nameRu: "Смеситель для раковины", nameEn: "Basin mixer tap", price: 285000, unit: "piece", stock: 200 },
      { slug: "smesitel-dush", nameUz: "Dush smesiteli", nameRu: "Смеситель для душа", nameEn: "Shower mixer", price: 395000, unit: "piece", stock: 150 },
      { slug: "truba-ppr-25", nameUz: "PPR truba Ø25 mm", nameRu: "Труба ППР Ø25 мм", nameEn: "PPR pipe Ø25 mm", price: 14000, unit: "m", stock: 4000 },
      { slug: "truba-kanalizatsiya-110", nameUz: "Kanalizatsiya trubasi Ø110 mm, 2 m", nameRu: "Канализационная труба Ø110 мм, 2 м", nameEn: "Sewer pipe Ø110 mm, 2 m", price: 78000, unit: "piece", stock: 500 },
      { slug: "vodonagrevatel-80l", nameUz: "Suv isitgich 80 l", nameRu: "Водонагреватель 80 л", nameEn: "Water heater 80 L", brand: "Ariston", price: 2450000, unit: "piece", stock: 40, featured: true },
      { slug: "radiator-alum-10", nameUz: "Alyuminiy radiator, 10 seksiya", nameRu: "Алюминиевый радиатор, 10 секций", nameEn: "Aluminium radiator, 10 sections", price: 780000, unit: "piece", stock: 90 },
    ],
  },
  {
    slug: "izolyatsiya",
    nameUz: "Issiqlik va gidroizolyatsiya",
    nameRu: "Тепло- и гидроизоляция",
    nameEn: "Insulation",
    icon: "🧊",
    products: [
      { slug: "penoplast-50mm", nameUz: "Penoplast 50 mm (1×1 m)", nameRu: "Пенопласт 50 мм (1×1 м)", nameEn: "EPS foam 50 mm (1×1 m)", price: 32000, unit: "piece", stock: 1600, featured: true },
      { slug: "penopleks-50mm", nameUz: "Penopleks XPS 50 mm", nameRu: "Пеноплэкс XPS 50 мм", nameEn: "XPS board 50 mm", price: 78000, unit: "m2", stock: 1100 },
      { slug: "minvata-rulon-50", nameUz: "Mineral vata, rulon 50 mm", nameRu: "Минвата рулонная 50 мм", nameEn: "Mineral wool roll 50 mm", brand: "Knauf", price: 42000, unit: "m2", stock: 1400 },
      { slug: "folgoizol-10mm", nameUz: "Folgali izolyatsiya 10 mm", nameRu: "Фольгированный утеплитель 10 мм", nameEn: "Foil-faced insulation 10 mm", price: 28000, unit: "m2", stock: 900 },
      { slug: "bitum-rulon", nameUz: "Bitumli gidroizolyatsiya, rulon 10 m²", nameRu: "Битумная гидроизоляция, рулон 10 м²", nameEn: "Bituminous waterproofing roll 10 m²", price: 195000, unit: "roll", stock: 300 },
      { slug: "mastika-bitum-20kg", nameUz: "Bitum mastikasi, 20 kg", nameRu: "Битумная мастика, 20 кг", nameEn: "Bitumen mastic, 20 kg", price: 210000, unit: "piece", stock: 140 },
    ],
  },
  {
    slug: "tom-materiallari",
    nameUz: "Tom yopish materiallari",
    nameRu: "Кровельные материалы",
    nameEn: "Roofing",
    icon: "🏠",
    products: [
      { slug: "profnastil-s8", nameUz: "Profnastil S8, 0,45 mm", nameRu: "Профнастил С8, 0,45 мм", nameEn: "Corrugated sheet S8, 0.45 mm", price: 92000, unit: "m2", stock: 2200, featured: true },
      { slug: "metallocherepitsa", nameUz: "Metallocherepitsa 0,45 mm", nameRu: "Металлочерепица 0,45 мм", nameEn: "Metal roof tile 0.45 mm", price: 128000, unit: "m2", stock: 1300 },
      { slug: "polikarbonat-8mm", nameUz: "Polikarbonat 8 mm", nameRu: "Поликарбонат 8 мм", nameEn: "Polycarbonate 8 mm", price: 96000, unit: "m2", stock: 800 },
      { slug: "shifer-8-volnoviy", nameUz: "Shifer, 8 to'lqinli", nameRu: "Шифер 8-волновой", nameEn: "Asbestos sheet, 8-wave", price: 92000, unit: "piece", stock: 600 },
      { slug: "vodostok-truba", nameUz: "Suv oqizgich truba Ø100, 3 m", nameRu: "Водосточная труба Ø100, 3 м", nameEn: "Downpipe Ø100, 3 m", price: 118000, unit: "piece", stock: 320 },
      { slug: "konek-krovelniy", nameUz: "Tom konyogi 2 m", nameRu: "Конёк кровельный 2 м", nameEn: "Roof ridge 2 m", price: 68000, unit: "piece", stock: 450 },
    ],
  },
  {
    slug: "eshik-deraza",
    nameUz: "Eshik va derazalar",
    nameRu: "Двери и окна",
    nameEn: "Doors & windows",
    icon: "🚪",
    products: [
      { slug: "eshik-mdf-80", nameUz: "MDF ichki eshik 80 sm (komplekt)", nameRu: "Межкомнатная дверь МДФ 80 см (комплект)", nameEn: "MDF interior door 80 cm (set)", price: 1250000, unit: "set", stock: 60, featured: true },
      { slug: "eshik-metall-kirish", nameUz: "Metall kirish eshigi", nameRu: "Входная металлическая дверь", nameEn: "Steel entrance door", price: 3200000, oldPrice: 3500000, unit: "piece", stock: 25 },
      { slug: "deraza-pvh-2k", nameUz: "PVX deraza, ikki kamerali", nameRu: "Окно ПВХ, двухкамерное", nameEn: "PVC window, double-glazed", price: 1150000, unit: "m2", stock: 200 },
      { slug: "podokonnik-pvh", nameUz: "PVX derazatokchasi, 30 sm", nameRu: "Подоконник ПВХ, 30 см", nameEn: "PVC window sill, 30 cm", price: 68000, unit: "m", stock: 500 },
      { slug: "furnitura-eshik-nabor", nameUz: "Eshik furniturasi to'plami", nameRu: "Комплект дверной фурнитуры", nameEn: "Door hardware set", price: 165000, unit: "set", stock: 220 },
    ],
  },
  {
    slug: "gipsokarton-profil",
    nameUz: "Gipsokarton va profil",
    nameRu: "Гипсокартон и профиль",
    nameEn: "Drywall & profiles",
    icon: "📐",
    products: [
      { slug: "gkl-9-5mm", nameUz: "Gipsokarton 9,5 mm (1200×2500)", nameRu: "Гипсокартон 9,5 мм (1200×2500)", nameEn: "Drywall 9.5 mm (1200×2500)", brand: "Knauf", price: 82000, unit: "piece", stock: 900, featured: true },
      { slug: "gkl-12-5mm", nameUz: "Gipsokarton 12,5 mm (1200×2500)", nameRu: "Гипсокартон 12,5 мм (1200×2500)", nameEn: "Drywall 12.5 mm (1200×2500)", brand: "Knauf", price: 96000, unit: "piece", stock: 750 },
      { slug: "gkl-vlagostoykiy", nameUz: "Namga chidamli gipsokarton 12,5 mm", nameRu: "Влагостойкий гипсокартон 12,5 мм", nameEn: "Moisture-resistant drywall 12.5 mm", brand: "Knauf", price: 128000, unit: "piece", stock: 400 },
      { slug: "profil-cd-60", nameUz: "Profil CD-60, 3 m", nameRu: "Профиль CD-60, 3 м", nameEn: "CD-60 profile, 3 m", price: 32000, unit: "piece", stock: 2000 },
      { slug: "profil-ud-27", nameUz: "Profil UD-27, 3 m", nameRu: "Профиль UD-27, 3 м", nameEn: "UD-27 profile, 3 m", price: 24000, unit: "piece", stock: 1800 },
      { slug: "podves-pryamoy", nameUz: "To'g'ri osma (podves)", nameRu: "Подвес прямой", nameEn: "Straight hanger", price: 2200, unit: "piece", stock: 8000 },
      { slug: "serpyanka-lenta", nameUz: "Serpyanka lentasi 45 mm × 90 m", nameRu: "Серпянка 45 мм × 90 м", nameEn: "Joint mesh tape 45 mm × 90 m", price: 18000, unit: "roll", stock: 700 },
    ],
  },
  {
    slug: "mahkamlagichlar",
    nameUz: "Mahkamlagichlar",
    nameRu: "Крепёж",
    nameEn: "Fasteners",
    icon: "🔩",
    products: [
      { slug: "sarup-gkl-25", nameUz: "Gipsokarton sarupi 3,5×25 (1 kg)", nameRu: "Саморез по ГКЛ 3,5×25 (1 кг)", nameEn: "Drywall screw 3.5×25 (1 kg)", price: 28000, unit: "kg", stock: 900 },
      { slug: "sarup-derevo-45", nameUz: "Yog'och sarupi 4×45 (1 kg)", nameRu: "Саморез по дереву 4×45 (1 кг)", nameEn: "Wood screw 4×45 (1 kg)", price: 26000, unit: "kg", stock: 1000 },
      { slug: "dyubel-6x40", nameUz: "Dyubel-mix 6×40 (100 dona)", nameRu: "Дюбель-гвоздь 6×40 (100 шт)", nameEn: "Nail plug 6×40 (100 pcs)", price: 32000, unit: "pack", stock: 800 },
      { slug: "anker-10x100", nameUz: "Anker bolt 10×100 (10 dona)", nameRu: "Анкерный болт 10×100 (10 шт)", nameEn: "Anchor bolt 10×100 (10 pcs)", price: 45000, unit: "pack", stock: 400 },
      { slug: "gvozd-100mm", nameUz: "Mix 100 mm (1 kg)", nameRu: "Гвозди 100 мм (1 кг)", nameEn: "Nails 100 mm (1 kg)", price: 19000, unit: "kg", stock: 1500 },
      { slug: "pena-montaj-750", nameUz: "Montaj ko'pigi 750 ml", nameRu: "Монтажная пена 750 мл", nameEn: "Foam sealant 750 ml", brand: "Soudal", price: 52000, unit: "piece", stock: 600, featured: true },
      { slug: "germetik-silikon", nameUz: "Silikon germetik 280 ml", nameRu: "Силиконовый герметик 280 мл", nameEn: "Silicone sealant 280 ml", price: 32000, unit: "piece", stock: 700 },
    ],
  },
  {
    slug: "asboblar",
    nameUz: "Asboblar",
    nameRu: "Инструменты",
    nameEn: "Tools",
    icon: "🔧",
    products: [
      { slug: "perforator-800w", nameUz: "Perforator 800 W, SDS-Plus", nameRu: "Перфоратор 800 Вт, SDS-Plus", nameEn: "Rotary hammer 800 W, SDS-Plus", brand: "Bosch", price: 1450000, oldPrice: 1620000, unit: "piece", stock: 45, featured: true },
      { slug: "bolgarka-125", nameUz: "Bolgarka 125 mm, 900 W", nameRu: "Болгарка 125 мм, 900 Вт", nameEn: "Angle grinder 125 mm, 900 W", brand: "Makita", price: 890000, unit: "piece", stock: 60 },
      { slug: "shurupovert-akkum", nameUz: "Akkumulyatorli shurupovert 18 V", nameRu: "Аккумуляторный шуруповёрт 18 В", nameEn: "Cordless drill/driver 18 V", brand: "Makita", price: 1250000, unit: "piece", stock: 55, featured: true },
      { slug: "lazer-uroven", nameUz: "Lazerli nivelir (3D)", nameRu: "Лазерный уровень (3D)", nameEn: "Laser level (3D)", price: 980000, unit: "piece", stock: 35 },
      { slug: "betonomeshalka-160", nameUz: "Beton aralashtirgich 160 l", nameRu: "Бетономешалка 160 л", nameEn: "Concrete mixer 160 L", price: 3850000, unit: "piece", stock: 15 },
      { slug: "ruletka-5m", nameUz: "Ruletka 5 m", nameRu: "Рулетка 5 м", nameEn: "Tape measure 5 m", price: 28000, unit: "piece", stock: 800 },
      { slug: "uroven-1200", nameUz: "Pufakchali nivelir 120 sm", nameRu: "Уровень пузырьковый 120 см", nameEn: "Spirit level 120 cm", price: 95000, unit: "piece", stock: 250 },
      { slug: "malla-shtukatur", nameUz: "Shtukatur mallasi", nameRu: "Кельма штукатурная", nameEn: "Plastering trowel", price: 42000, unit: "piece", stock: 400 },
      { slug: "tachka-qurilish", nameUz: "Qurilish g'ildirakli aravasi 90 l", nameRu: "Строительная тачка 90 л", nameEn: "Wheelbarrow 90 L", price: 485000, unit: "piece", stock: 70 },
      { slug: "disk-almaz-125", nameUz: "Olmosli disk 125 mm", nameRu: "Алмазный диск 125 мм", nameEn: "Diamond blade 125 mm", price: 65000, unit: "piece", stock: 500 },
    ],
  },
];

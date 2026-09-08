import type { SeedCategory } from "./seed-data";

/**
 * "Tashkent Kabel" ixtisosligi — kabel va elektr mollari.
 * Bu kategoriyalar katalog boshida turadi (sortOrder 0…6).
 *
 * Narxlar 2026-yil Toshkent bozoriga taxminan mo'ljallangan va mavjud
 * pozitsiyalarga (VVG 3×1,5 = 17 500; VVG 3×2,5 = 26 000) moslab hisoblangan.
 * Aniq narxlaringizni admin paneldan yoki prays-listdan kiritasiz.
 */
export const ELECTRICAL: SeedCategory[] = [
  {
    slug: "kabel-simlar",
    nameUz: "Kabel va simlar",
    nameRu: "Кабель и провода",
    nameEn: "Cables & wires",
    icon: "🔌",
    products: [
      // --- VVG (mis, qattiq) ---
      { slug: "kabel-vvg-3x1-5", nameUz: "Kabel VVG 3×1,5 mm²", nameRu: "Кабель ВВГ 3×1,5 мм²", nameEn: "Cable VVG 3×1.5 mm²", brand: "Uzkabel", price: 17500, unit: "m", stock: 6000 },
      { slug: "kabel-vvg-3x2-5", nameUz: "Kabel VVG 3×2,5 mm²", nameRu: "Кабель ВВГ 3×2,5 мм²", nameEn: "Cable VVG 3×2.5 mm²", brand: "Uzkabel", price: 26000, unit: "m", stock: 5000, featured: true, descUz: "Eng ko'p ishlatiladigan kesim — rozetka liniyalari uchun.", descRu: "Самое ходовое сечение — для розеточных линий.", descEn: "The most common size — for socket circuits." },
      { slug: "kabel-vvg-2x1-5", nameUz: "Kabel VVG 2×1,5 mm²", nameRu: "Кабель ВВГ 2×1,5 мм²", nameEn: "Cable VVG 2×1.5 mm²", brand: "Uzkabel", price: 12000, unit: "m", stock: 5000, descUz: "Mis tomirli quvvat kabeli. Ichki elektr montaj uchun.", descRu: "Силовой кабель с медными жилами для внутренней проводки.", descEn: "Copper power cable for indoor wiring." },
      { slug: "kabel-vvg-2x2-5", nameUz: "Kabel VVG 2×2,5 mm²", nameRu: "Кабель ВВГ 2×2,5 мм²", nameEn: "Cable VVG 2×2.5 mm²", brand: "Uzkabel", price: 18500, unit: "m", stock: 4500 },
      { slug: "kabel-vvg-3x4", nameUz: "Kabel VVG 3×4 mm²", nameRu: "Кабель ВВГ 3×4 мм²", nameEn: "Cable VVG 3×4 mm²", brand: "Uzkabel", price: 40000, unit: "m", stock: 3000, featured: true },
      { slug: "kabel-vvg-3x6", nameUz: "Kabel VVG 3×6 mm²", nameRu: "Кабель ВВГ 3×6 мм²", nameEn: "Cable VVG 3×6 mm²", brand: "Uzkabel", price: 59000, unit: "m", stock: 2200 },
      { slug: "kabel-vvg-4x2-5", nameUz: "Kabel VVG 4×2,5 mm²", nameRu: "Кабель ВВГ 4×2,5 мм²", nameEn: "Cable VVG 4×2.5 mm²", brand: "Uzkabel", price: 34000, unit: "m", stock: 2800 },
      { slug: "kabel-vvg-4x4", nameUz: "Kabel VVG 4×4 mm²", nameRu: "Кабель ВВГ 4×4 мм²", nameEn: "Cable VVG 4×4 mm²", brand: "Uzkabel", price: 53000, unit: "m", stock: 2000 },
      { slug: "kabel-vvg-4x6", nameUz: "Kabel VVG 4×6 mm²", nameRu: "Кабель ВВГ 4×6 мм²", nameEn: "Cable VVG 4×6 mm²", brand: "Uzkabel", price: 78000, unit: "m", stock: 1500 },
      { slug: "kabel-vvg-4x10", nameUz: "Kabel VVG 4×10 mm²", nameRu: "Кабель ВВГ 4×10 мм²", nameEn: "Cable VVG 4×10 mm²", brand: "Uzkabel", price: 128000, unit: "m", stock: 900 },
      { slug: "kabel-vvg-4x16", nameUz: "Kabel VVG 4×16 mm²", nameRu: "Кабель ВВГ 4×16 мм²", nameEn: "Cable VVG 4×16 mm²", brand: "Uzkabel", price: 198000, unit: "m", stock: 600 },
      { slug: "kabel-vvg-5x2-5", nameUz: "Kabel VVG 5×2,5 mm²", nameRu: "Кабель ВВГ 5×2,5 мм²", nameEn: "Cable VVG 5×2.5 mm²", brand: "Uzkabel", price: 42000, unit: "m", stock: 1800, featured: true },
      { slug: "kabel-vvg-5x4", nameUz: "Kabel VVG 5×4 mm²", nameRu: "Кабель ВВГ 5×4 мм²", nameEn: "Cable VVG 5×4 mm²", brand: "Uzkabel", price: 66000, unit: "m", stock: 1400 },
      { slug: "kabel-vvg-5x6", nameUz: "Kabel VVG 5×6 mm²", nameRu: "Кабель ВВГ 5×6 мм²", nameEn: "Cable VVG 5×6 mm²", brand: "Uzkabel", price: 96000, unit: "m", stock: 1000 },

      // --- VVGng-LS (yong'inga chidamli) ---
      { slug: "kabel-vvgng-3x1-5", nameUz: "Kabel VVGng-LS 3×1,5 mm²", nameRu: "Кабель ВВГнг-LS 3×1,5 мм²", nameEn: "Cable VVGng-LS 3×1.5 mm²", brand: "Uzkabel", price: 20000, unit: "m", stock: 2600, descUz: "Yonmaydigan, kam tutunli qobiq. Jamoat binolari uchun talab qilinadi.", descRu: "Негорючая оболочка с низким дымовыделением. Требуется для общественных зданий.", descEn: "Flame-retardant, low-smoke sheath. Required in public buildings." },
      { slug: "kabel-vvgng-3x2-5", nameUz: "Kabel VVGng-LS 3×2,5 mm²", nameRu: "Кабель ВВГнг-LS 3×2,5 мм²", nameEn: "Cable VVGng-LS 3×2.5 mm²", brand: "Uzkabel", price: 30000, unit: "m", stock: 2400, featured: true },
      { slug: "kabel-vvgng-5x4", nameUz: "Kabel VVGng-LS 5×4 mm²", nameRu: "Кабель ВВГнг-LS 5×4 мм²", nameEn: "Cable VVGng-LS 5×4 mm²", brand: "Uzkabel", price: 76000, unit: "m", stock: 800 },

      // --- NYM (import) ---
      { slug: "kabel-nym-3x1-5", nameUz: "Kabel NYM 3×1,5 mm²", nameRu: "Кабель NYM 3×1,5 мм²", nameEn: "Cable NYM 3×1.5 mm²", brand: "Nexans", price: 22000, unit: "m", stock: 1200 },
      { slug: "kabel-nym-3x2-5", nameUz: "Kabel NYM 3×2,5 mm²", nameRu: "Кабель NYM 3×2,5 мм²", nameEn: "Cable NYM 3×2.5 mm²", brand: "Nexans", price: 33000, unit: "m", stock: 1000 },

      // --- PVS / ShVVP (egiluvchan) ---
      { slug: "sim-pvs-2x0-75", nameUz: "Sim PVS 2×0,75 mm²", nameRu: "Провод ПВС 2×0,75 мм²", nameEn: "Wire PVS 2×0.75 mm²", price: 8000, unit: "m", stock: 6000 },
      { slug: "sim-pvs-2x1-5", nameUz: "Sim PVS 2×1,5 mm²", nameRu: "Провод ПВС 2×1,5 мм²", nameEn: "Wire PVS 2×1.5 mm²", price: 14000, unit: "m", stock: 5000 },
      { slug: "sim-pvs-3x1-5", nameUz: "Sim PVS 3×1,5 mm²", nameRu: "Провод ПВС 3×1,5 мм²", nameEn: "Wire PVS 3×1.5 mm²", price: 19000, unit: "m", stock: 4200, featured: true },
      { slug: "sim-pvs-3x2-5", nameUz: "Sim PVS 3×2,5 mm²", nameRu: "Провод ПВС 3×2,5 мм²", nameEn: "Wire PVS 3×2.5 mm²", price: 28000, unit: "m", stock: 3600 },
      { slug: "sim-shvvp-2x0-5", nameUz: "Sim ShVVP 2×0,5 mm²", nameRu: "Провод ШВВП 2×0,5 мм²", nameEn: "Wire ShVVP 2×0.5 mm²", price: 5000, unit: "m", stock: 8000 },
      { slug: "sim-shvvp-2x0-75", nameUz: "Sim ShVVP 2×0,75 mm²", nameRu: "Провод ШВВП 2×0,75 мм²", nameEn: "Wire ShVVP 2×0.75 mm²", price: 6500, unit: "m", stock: 7000 },

      // --- PV-1 / PV-3 (bir tomirli) ---
      { slug: "sim-pv1-1-5", nameUz: "Sim PV-1 1×1,5 mm²", nameRu: "Провод ПВ-1 1×1,5 мм²", nameEn: "Wire PV-1 1×1.5 mm²", price: 4500, unit: "m", stock: 12000 },
      { slug: "sim-pv1-2-5", nameUz: "Sim PV-1 1×2,5 mm²", nameRu: "Провод ПВ-1 1×2,5 мм²", nameEn: "Wire PV-1 1×2.5 mm²", price: 7000, unit: "m", stock: 10000, featured: true },
      { slug: "sim-pv3-4", nameUz: "Sim PV-3 1×4 mm²", nameRu: "Провод ПВ-3 1×4 мм²", nameEn: "Wire PV-3 1×4 mm²", price: 12000, unit: "m", stock: 6000 },
      { slug: "sim-pv3-6", nameUz: "Sim PV-3 1×6 mm²", nameRu: "Провод ПВ-3 1×6 мм²", nameEn: "Wire PV-3 1×6 mm²", price: 17000, unit: "m", stock: 5000 },
      { slug: "sim-pv3-10", nameUz: "Sim PV-3 1×10 mm²", nameRu: "Провод ПВ-3 1×10 мм²", nameEn: "Wire PV-3 1×10 mm²", price: 28000, unit: "m", stock: 3000 },
      { slug: "sim-pv3-16", nameUz: "Sim PV-3 1×16 mm²", nameRu: "Провод ПВ-3 1×16 мм²", nameEn: "Wire PV-3 1×16 mm²", price: 44000, unit: "m", stock: 2000 },

      // --- Alyuminiy ---
      { slug: "kabel-avvg-2x6", nameUz: "Kabel AVVG 2×6 mm² (alyuminiy)", nameRu: "Кабель АВВГ 2×6 мм² (алюминий)", nameEn: "Cable AVVG 2×6 mm² (aluminium)", price: 22000, unit: "m", stock: 2500 },
      { slug: "kabel-avvg-4x16", nameUz: "Kabel AVVG 4×16 mm² (alyuminiy)", nameRu: "Кабель АВВГ 4×16 мм² (алюминий)", nameEn: "Cable AVVG 4×16 mm² (aluminium)", price: 72000, unit: "m", stock: 1400 },
      { slug: "kabel-avvg-4x25", nameUz: "Kabel AVVG 4×25 mm² (alyuminiy)", nameRu: "Кабель АВВГ 4×25 мм² (алюминий)", nameEn: "Cable AVVG 4×25 mm² (aluminium)", price: 105000, unit: "m", stock: 900 },
      { slug: "kabel-avvg-4x35", nameUz: "Kabel AVVG 4×35 mm² (alyuminiy)", nameRu: "Кабель АВВГ 4×35 мм² (алюминий)", nameEn: "Cable AVVG 4×35 mm² (aluminium)", price: 145000, unit: "m", stock: 600 },

      // --- SIP (havo liniyasi) ---
      { slug: "kabel-sip-2x16", nameUz: "Kabel SIP-4 2×16 mm²", nameRu: "Кабель СИП-4 2×16 мм²", nameEn: "Cable SIP-4 2×16 mm²", price: 26000, unit: "m", stock: 2000, descUz: "O'zi ko'tariladigan izolyatsiyalangan sim — havo liniyalari uchun.", descRu: "Самонесущий изолированный провод для воздушных линий.", descEn: "Self-supporting insulated wire for overhead lines." },
      { slug: "kabel-sip-4x16", nameUz: "Kabel SIP-4 4×16 mm²", nameRu: "Кабель СИП-4 4×16 мм²", nameEn: "Cable SIP-4 4×16 mm²", price: 48000, unit: "m", stock: 1600, featured: true },
      { slug: "kabel-sip-4x25", nameUz: "Kabel SIP-4 4×25 mm²", nameRu: "Кабель СИП-4 4×25 мм²", nameEn: "Cable SIP-4 4×25 mm²", price: 68000, unit: "m", stock: 1100 },

      // --- Rezina qobiqli (payvandlash) ---
      { slug: "kabel-kg-3x2-5", nameUz: "Kabel KG 3×2,5 mm² (rezina)", nameRu: "Кабель КГ 3×2,5 мм² (резина)", nameEn: "Cable KG 3×2.5 mm² (rubber)", price: 42000, unit: "m", stock: 1200 },
      { slug: "kabel-kg-4x4", nameUz: "Kabel KG 4×4 mm² (rezina)", nameRu: "Кабель КГ 4×4 мм² (резина)", nameEn: "Cable KG 4×4 mm² (rubber)", price: 78000, unit: "m", stock: 700 },
      { slug: "kabel-kg-1x16", nameUz: "Payvandlash kabeli KG 1×16 mm²", nameRu: "Сварочный кабель КГ 1×16 мм²", nameEn: "Welding cable KG 1×16 mm²", price: 58000, unit: "m", stock: 900 },
      { slug: "kabel-kg-1x25", nameUz: "Payvandlash kabeli KG 1×25 mm²", nameRu: "Сварочный кабель КГ 1×25 мм²", nameEn: "Welding cable KG 1×25 mm²", price: 88000, unit: "m", stock: 600 },

      // --- Past kuchlanishli / axborot ---
      { slug: "kabel-utp-cat5e", nameUz: "Kabel UTP cat.5e 4×2×0,5", nameRu: "Кабель UTP cat.5e 4×2×0,5", nameEn: "Cable UTP cat.5e 4×2×0.5", price: 5500, unit: "m", stock: 9000, featured: true },
      { slug: "kabel-utp-cat5e-buxta", nameUz: "Kabel UTP cat.5e, 305 m buxta", nameRu: "Кабель UTP cat.5e, бухта 305 м", nameEn: "Cable UTP cat.5e, 305 m box", price: 1450000, oldPrice: 1677500, unit: "roll", stock: 40 },
      { slug: "kabel-utp-cat6", nameUz: "Kabel UTP cat.6 4×2×0,57", nameRu: "Кабель UTP cat.6 4×2×0,57", nameEn: "Cable UTP cat.6 4×2×0.57", price: 9000, unit: "m", stock: 4000 },
      { slug: "kabel-ftp-cat5e", nameUz: "Kabel FTP cat.5e (ekranlangan)", nameRu: "Кабель FTP cat.5e (экранированный)", nameEn: "Cable FTP cat.5e (shielded)", price: 8500, unit: "m", stock: 3000 },
      { slug: "kabel-koaksial-rg6", nameUz: "Koaksial kabel RG-6", nameRu: "Коаксиальный кабель RG-6", nameEn: "Coaxial cable RG-6", price: 6000, unit: "m", stock: 5000 },
      { slug: "kabel-telefon-2x0-5", nameUz: "Telefon kabeli 2×0,5", nameRu: "Телефонный кабель 2×0,5", nameEn: "Telephone cable 2×0.5", price: 3500, unit: "m", stock: 6000 },
      { slug: "kabel-kspv-4x0-5", nameUz: "Signal kabeli KSPV 4×0,5", nameRu: "Сигнальный кабель КСПВ 4×0,5", nameEn: "Signal cable KSPV 4×0.5", price: 4500, unit: "m", stock: 5500 },
      { slug: "kabel-domofon-2x0-75", nameUz: "Domofon kabeli 2×0,75", nameRu: "Домофонный кабель 2×0,75", nameEn: "Intercom cable 2×0.75", price: 5000, unit: "m", stock: 4000 },
      { slug: "kabel-akustik-2x0-75", nameUz: "Akustik kabel 2×0,75", nameRu: "Акустический кабель 2×0,75", nameEn: "Speaker cable 2×0.75", price: 7000, unit: "m", stock: 3500 },

      // --- Buxtalar ---
      { slug: "kabel-vvg-3x2-5-buxta", nameUz: "Kabel VVG 3×2,5 mm², 100 m buxta", nameRu: "Кабель ВВГ 3×2,5 мм², бухта 100 м", nameEn: "Cable VVG 3×2.5 mm², 100 m coil", brand: "Uzkabel", price: 2450000, oldPrice: 2600000, unit: "roll", stock: 60, featured: true },
      { slug: "sim-pv1-2-5-buxta", nameUz: "Sim PV-1 1×2,5 mm², 100 m buxta", nameRu: "Провод ПВ-1 1×2,5 мм², бухта 100 м", nameEn: "Wire PV-1 1×2.5 mm², 100 m coil", price: 660000, oldPrice: 700000, unit: "roll", stock: 90 },
    ],
  },

  {
    slug: "kabel-kanal-gofra",
    nameUz: "Kabel kanallari va gofra",
    nameRu: "Кабель-каналы и гофра",
    nameEn: "Trunking & conduit",
    icon: "🧵",
    products: [
      { slug: "kabel-kanal-12x12", nameUz: "Kabel kanali 12×12 mm, 2 m", nameRu: "Кабель-канал 12×12 мм, 2 м", nameEn: "Trunking 12×12 mm, 2 m", price: 9000, unit: "piece", stock: 2000 },
      { slug: "kabel-kanal-16x16", nameUz: "Kabel kanali 16×16 mm, 2 m", nameRu: "Кабель-канал 16×16 мм, 2 м", nameEn: "Trunking 16×16 mm, 2 m", price: 12000, unit: "piece", stock: 2400, featured: true },
      { slug: "kabel-kanal-20x10", nameUz: "Kabel kanali 20×10 mm, 2 m", nameRu: "Кабель-канал 20×10 мм, 2 м", nameEn: "Trunking 20×10 mm, 2 m", price: 11000, unit: "piece", stock: 1800 },
      { slug: "kabel-kanal-25x16", nameUz: "Kabel kanali 25×16 mm, 2 m", nameRu: "Кабель-канал 25×16 мм, 2 м", nameEn: "Trunking 25×16 mm, 2 m", price: 16000, unit: "piece", stock: 1600 },
      { slug: "kabel-kanal-40x25", nameUz: "Kabel kanali 40×25 mm, 2 m", nameRu: "Кабель-канал 40×25 мм, 2 м", nameEn: "Trunking 40×25 mm, 2 m", price: 28000, unit: "piece", stock: 1200 },
      { slug: "kabel-kanal-60x40", nameUz: "Kabel kanali 60×40 mm, 2 m", nameRu: "Кабель-канал 60×40 мм, 2 м", nameEn: "Trunking 60×40 mm, 2 m", price: 48000, unit: "piece", stock: 700 },
      { slug: "kabel-kanal-100x60", nameUz: "Kabel kanali 100×60 mm, 2 m", nameRu: "Кабель-канал 100×60 мм, 2 м", nameEn: "Trunking 100×60 mm, 2 m", price: 92000, unit: "piece", stock: 400 },
      { slug: "kabel-kanal-plintus", nameUz: "Plintus-kanal 70×20 mm, 2 m", nameRu: "Плинтус-канал 70×20 мм, 2 м", nameEn: "Skirting trunking 70×20 mm, 2 m", price: 38000, unit: "piece", stock: 600 },

      { slug: "gofra-20mm", nameUz: "Gofra truba Ø20 mm (PVX)", nameRu: "Гофротруба Ø20 мм (ПВХ)", nameEn: "Corrugated conduit Ø20 mm (PVC)", price: 4500, unit: "m", stock: 4000, featured: true },
      { slug: "gofra-16mm", nameUz: "Gofra truba Ø16 mm (PVX)", nameRu: "Гофротруба Ø16 мм (ПВХ)", nameEn: "Corrugated conduit Ø16 mm (PVC)", price: 3000, unit: "m", stock: 6000 },
      { slug: "gofra-25mm", nameUz: "Gofra truba Ø25 mm (PVX)", nameRu: "Гофротруба Ø25 мм (ПВХ)", nameEn: "Corrugated conduit Ø25 mm (PVC)", price: 6000, unit: "m", stock: 4000 },
      { slug: "gofra-32mm", nameUz: "Gofra truba Ø32 mm (PVX)", nameRu: "Гофротруба Ø32 мм (ПВХ)", nameEn: "Corrugated conduit Ø32 mm (PVC)", price: 8500, unit: "m", stock: 2600 },
      { slug: "gofra-40mm", nameUz: "Gofra truba Ø40 mm (PVX)", nameRu: "Гофротруба Ø40 мм (ПВХ)", nameEn: "Corrugated conduit Ø40 mm (PVC)", price: 12000, unit: "m", stock: 1800 },
      { slug: "gofra-pnd-50mm", nameUz: "Ikki devorli gofra PND Ø50 mm", nameRu: "Двустенная гофра ПНД Ø50 мм", nameEn: "Double-wall HDPE conduit Ø50 mm", price: 16000, unit: "m", stock: 1200, descUz: "Yer ostiga yotqizish uchun — mustahkam tashqi devor.", descRu: "Для прокладки в земле — прочная внешняя стенка.", descEn: "For underground runs — rigid outer wall." },
      { slug: "metallorukav-15mm", nameUz: "Metallorukav Ø15 mm", nameRu: "Металлорукав Ø15 мм", nameEn: "Flexible metal conduit Ø15 mm", price: 9000, unit: "m", stock: 2000 },
      { slug: "truba-pvh-20mm", nameUz: "Qattiq PVX truba Ø20 mm, 3 m", nameRu: "Жёсткая ПВХ труба Ø20 мм, 3 м", nameEn: "Rigid PVC conduit Ø20 mm, 3 m", price: 22000, unit: "piece", stock: 900 },
      { slug: "xomut-200mm", nameUz: "Xomut (styajka) 200 mm, 100 dona", nameRu: "Хомут-стяжка 200 мм, 100 шт", nameEn: "Cable tie 200 mm, 100 pcs", price: 14000, unit: "pack", stock: 1500, featured: true },
      { slug: "xomut-300mm", nameUz: "Xomut (styajka) 300 mm, 100 dona", nameRu: "Хомут-стяжка 300 мм, 100 шт", nameEn: "Cable tie 300 mm, 100 pcs", price: 22000, unit: "pack", stock: 1100 },
      { slug: "klipsa-20mm", nameUz: "Gofra klipsasi Ø20 mm, 100 dona", nameRu: "Клипса для гофры Ø20 мм, 100 шт", nameEn: "Conduit clip Ø20 mm, 100 pcs", price: 12000, unit: "pack", stock: 1300 },
    ],
  },

  {
    slug: "avtomatlar-himoya",
    nameUz: "Avtomatlar va himoya",
    nameRu: "Автоматы и защита",
    nameEn: "Breakers & protection",
    icon: "🛡️",
    products: [
      { slug: "avtomat-1p-6a", nameUz: "Avtomat 6A, 1P", nameRu: "Автомат 6А, 1P", nameEn: "Circuit breaker 6A, 1P", brand: "Schneider", price: 38000, unit: "piece", stock: 500 },
      { slug: "avtomat-1p-10a", nameUz: "Avtomat 10A, 1P", nameRu: "Автомат 10А, 1P", nameEn: "Circuit breaker 10A, 1P", brand: "Schneider", price: 40000, unit: "piece", stock: 600 },
      { slug: "avtomat-16a", nameUz: "Avtomat 16A, 1P", nameRu: "Автомат 16А, 1P", nameEn: "Circuit breaker 16A, 1P", brand: "Schneider", price: 42000, unit: "piece", stock: 700, featured: true },
      { slug: "avtomat-1p-20a", nameUz: "Avtomat 20A, 1P", nameRu: "Автомат 20А, 1P", nameEn: "Circuit breaker 20A, 1P", brand: "Schneider", price: 43000, unit: "piece", stock: 600 },
      { slug: "avtomat-1p-25a", nameUz: "Avtomat 25A, 1P", nameRu: "Автомат 25А, 1P", nameEn: "Circuit breaker 25A, 1P", brand: "Schneider", price: 45000, unit: "piece", stock: 550 },
      { slug: "avtomat-1p-32a", nameUz: "Avtomat 32A, 1P", nameRu: "Автомат 32А, 1P", nameEn: "Circuit breaker 32A, 1P", brand: "Schneider", price: 48000, unit: "piece", stock: 500 },
      { slug: "avtomat-1p-40a", nameUz: "Avtomat 40A, 1P", nameRu: "Автомат 40А, 1P", nameEn: "Circuit breaker 40A, 1P", brand: "Schneider", price: 52000, unit: "piece", stock: 400 },
      { slug: "avtomat-1p-63a", nameUz: "Avtomat 63A, 1P", nameRu: "Автомат 63А, 1P", nameEn: "Circuit breaker 63A, 1P", brand: "Schneider", price: 62000, unit: "piece", stock: 300 },
      { slug: "avtomat-2p-25a", nameUz: "Avtomat 25A, 2P", nameRu: "Автомат 25А, 2P", nameEn: "Circuit breaker 25A, 2P", brand: "Schneider", price: 88000, unit: "piece", stock: 260 },
      { slug: "avtomat-2p-40a", nameUz: "Avtomat 40A, 2P", nameRu: "Автомат 40А, 2P", nameEn: "Circuit breaker 40A, 2P", brand: "Schneider", price: 98000, unit: "piece", stock: 220 },
      { slug: "avtomat-2p-63a", nameUz: "Avtomat 63A, 2P", nameRu: "Автомат 63А, 2P", nameEn: "Circuit breaker 63A, 2P", brand: "Schneider", price: 118000, unit: "piece", stock: 180 },
      { slug: "avtomat-3p-32a", nameUz: "Avtomat 32A, 3P", nameRu: "Автомат 32А, 3P", nameEn: "Circuit breaker 32A, 3P", brand: "Schneider", price: 135000, unit: "piece", stock: 160 },
      { slug: "avtomat-3p-63a", nameUz: "Avtomat 63A, 3P", nameRu: "Автомат 63А, 3P", nameEn: "Circuit breaker 63A, 3P", brand: "Schneider", price: 175000, unit: "piece", stock: 120, featured: true },
      { slug: "uzo-2p-40a", nameUz: "UZO 2P 40A / 30 mA", nameRu: "УЗО 2P 40А / 30 мА", nameEn: "RCD 2P 40A / 30 mA", brand: "Schneider", price: 285000, unit: "piece", stock: 140, featured: true, descUz: "Tok oqishidan himoya — vannaxona va oshxona liniyalari uchun majburiy.", descRu: "Защита от утечки тока — обязательна для линий ванной и кухни.", descEn: "Earth-leakage protection — required for bathroom and kitchen circuits." },
      { slug: "difavtomat-25a", nameUz: "Differensial avtomat 1P+N 25A / 30 mA", nameRu: "Дифавтомат 1P+N 25А / 30 мА", nameEn: "RCBO 1P+N 25A / 30 mA", brand: "Schneider", price: 320000, unit: "piece", stock: 110 },
      { slug: "rele-napryajeniya-40a", nameUz: "Kuchlanish nazorat relesi 40A", nameRu: "Реле контроля напряжения 40А", nameEn: "Voltage protection relay 40A", price: 245000, unit: "piece", stock: 150 },
      { slug: "kontaktor-25a", nameUz: "Kontaktor 25A", nameRu: "Контактор 25А", nameEn: "Contactor 25A", price: 185000, unit: "piece", stock: 130 },
      { slug: "rubilnik-63a", nameUz: "Rubilnik 63A", nameRu: "Рубильник 63А", nameEn: "Isolator switch 63A", price: 145000, unit: "piece", stock: 120 },
      { slug: "shchit-12-modul", nameUz: "Elektr shchiti, 12 modul", nameRu: "Электрощит на 12 модулей", nameEn: "Distribution board, 12 modules", price: 185000, unit: "piece", stock: 120, featured: true },
      { slug: "shchit-24-modul", nameUz: "Elektr shchiti, 24 modul", nameRu: "Электрощит на 24 модуля", nameEn: "Distribution board, 24 modules", price: 320000, unit: "piece", stock: 90 },
      { slug: "shchit-36-modul", nameUz: "Elektr shchiti, 36 modul", nameRu: "Электрощит на 36 модулей", nameEn: "Distribution board, 36 modules", price: 460000, unit: "piece", stock: 60 },
      { slug: "shchit-8-modul-naruzhniy", nameUz: "Tashqi shchit, 8 modul", nameRu: "Наружный щит на 8 модулей", nameEn: "Surface board, 8 modules", price: 145000, unit: "piece", stock: 140 },
      { slug: "boks-ip65", nameUz: "Germetik boks IP65", nameRu: "Герметичный бокс IP65", nameEn: "Weatherproof enclosure IP65", price: 165000, unit: "piece", stock: 100 },
    ],
  },

  {
    slug: "rozetka-vyklyuchatel",
    nameUz: "Rozetka va vyklyuchatellar",
    nameRu: "Розетки и выключатели",
    nameEn: "Sockets & switches",
    icon: "🔘",
    products: [
      { slug: "rozetka-vnutrenniy", nameUz: "Rozetka (ichki o'rnatma)", nameRu: "Розетка встраиваемая", nameEn: "Flush-mounted socket", price: 24000, unit: "piece", stock: 900, featured: true },
      { slug: "rozetka-ikkilik", nameUz: "Ikkilik rozetka (ichki)", nameRu: "Розетка двойная (внутренняя)", nameEn: "Double socket (flush)", price: 38000, unit: "piece", stock: 700, featured: true },
      { slug: "rozetka-ip44", nameUz: "Rozetka IP44 (nam xonalar uchun)", nameRu: "Розетка IP44 (для влажных помещений)", nameEn: "Socket IP44 (damp rooms)", price: 45000, unit: "piece", stock: 400 },
      { slug: "rozetka-tashqi", nameUz: "Rozetka (tashqi o'rnatma)", nameRu: "Розетка накладная", nameEn: "Surface-mounted socket", price: 22000, unit: "piece", stock: 800 },
      { slug: "rozetka-usb", nameUz: "USB portli rozetka", nameRu: "Розетка с USB", nameEn: "Socket with USB", price: 95000, unit: "piece", stock: 250, featured: true },
      { slug: "rozetka-tv", nameUz: "TV rozetka", nameRu: "ТВ розетка", nameEn: "TV socket", price: 32000, unit: "piece", stock: 400 },
      { slug: "rozetka-rj45", nameUz: "Internet rozetka RJ45", nameRu: "Интернет-розетка RJ45", nameEn: "Network socket RJ45", price: 38000, unit: "piece", stock: 380 },
      { slug: "vyklyuchatel-1", nameUz: "Bir klavishli vyklyuchatel", nameRu: "Выключатель одноклавишный", nameEn: "One-gang switch", price: 18000, unit: "piece", stock: 900 },
      { slug: "vyklyuchatel-2", nameUz: "Ikki klavishli vyklyuchatel", nameRu: "Выключатель двухклавишный", nameEn: "Two-gang switch", price: 22000, unit: "piece", stock: 850 },
      { slug: "vyklyuchatel-3", nameUz: "Uch klavishli vyklyuchatel", nameRu: "Выключатель трёхклавишный", nameEn: "Three-gang switch", price: 32000, unit: "piece", stock: 400 },
      { slug: "vyklyuchatel-prohodnoy", nameUz: "O'tuvchi vyklyuchatel (prohodnoy)", nameRu: "Проходной выключатель", nameEn: "Two-way switch", price: 28000, unit: "piece", stock: 500, descUz: "Bitta chiroqni ikki joydan yoqib-o'chirish uchun. Koridor va zinapoya uchun.", descRu: "Управление одним светильником из двух мест. Для коридоров и лестниц.", descEn: "Controls one light from two locations. For corridors and stairs." },
      { slug: "dimmer", nameUz: "Dimmer (yorug'lik regulyatori)", nameRu: "Диммер (регулятор света)", nameEn: "Dimmer switch", price: 85000, unit: "piece", stock: 200 },
      { slug: "ramka-2", nameUz: "Ramka, 2 o'rinli", nameRu: "Рамка на 2 поста", nameEn: "Frame, 2-gang", price: 22000, unit: "piece", stock: 600 },
      { slug: "ramka-3", nameUz: "Ramka, 3 o'rinli", nameRu: "Рамка на 3 поста", nameEn: "Frame, 3-gang", price: 32000, unit: "piece", stock: 450 },
      { slug: "podrozetnik", nameUz: "Podrozetnik (o'rnatma quti)", nameRu: "Подрозетник", nameEn: "Back box", price: 3500, unit: "piece", stock: 4000 },
      { slug: "raspredkorobka", nameUz: "Tarqatish qutisi", nameRu: "Распределительная коробка", nameEn: "Junction box", price: 8000, unit: "piece", stock: 2000 },
      { slug: "vilka-elektr", nameUz: "Vilka (shtepsel)", nameRu: "Вилка электрическая", nameEn: "Plug", price: 12000, unit: "piece", stock: 1200 },
      { slug: "udlinitel-5m", nameUz: "Uzatgich 5 m, 5 rozetka", nameRu: "Удлинитель 5 м, 5 розеток", nameEn: "Extension lead 5 m, 5 sockets", price: 78000, unit: "piece", stock: 300 },
      { slug: "setevoy-filtr-3m", nameUz: "Tarmoq filtri 3 m, himoyali", nameRu: "Сетевой фильтр 3 м, с защитой", nameEn: "Surge protector 3 m", price: 95000, unit: "piece", stock: 220 },
    ],
  },

  {
    slug: "yoritish",
    nameUz: "Yoritish",
    nameRu: "Освещение",
    nameEn: "Lighting",
    icon: "💡",
    products: [
      { slug: "lampa-led-12w", nameUz: "LED lampa 12 W, E27", nameRu: "LED лампа 12 Вт, E27", nameEn: "LED bulb 12 W, E27", price: 18000, unit: "piece", stock: 1500, featured: true },
      { slug: "lampa-led-9w", nameUz: "LED lampa 9 W, E27", nameRu: "LED лампа 9 Вт, E27", nameEn: "LED bulb 9 W, E27", price: 15000, unit: "piece", stock: 2000 },
      { slug: "lampa-led-15w", nameUz: "LED lampa 15 W, E27", nameRu: "LED лампа 15 Вт, E27", nameEn: "LED bulb 15 W, E27", price: 22000, unit: "piece", stock: 1500 },
      { slug: "lampa-led-7w-e14", nameUz: "LED lampa 7 W, E14", nameRu: "LED лампа 7 Вт, E14", nameEn: "LED bulb 7 W, E14", price: 14000, unit: "piece", stock: 1600 },
      { slug: "lampa-led-svecha", nameUz: "LED lampa «shamchiroq», E14", nameRu: "LED лампа «свеча», E14", nameEn: "LED candle bulb, E14", price: 15000, unit: "piece", stock: 1200 },
      { slug: "lampa-led-gu10", nameUz: "LED lampa GU10", nameRu: "LED лампа GU10", nameEn: "LED bulb GU10", price: 22000, unit: "piece", stock: 900 },
      { slug: "lampa-filament", nameUz: "Filamentli LED lampa E27 (dekorativ)", nameRu: "Филаментная LED лампа E27", nameEn: "Filament LED bulb E27", price: 32000, unit: "piece", stock: 600 },
      { slug: "led-panel-36w", nameUz: "LED panel 36 W, 600×600 mm", nameRu: "LED панель 36 Вт, 600×600 мм", nameEn: "LED panel 36 W, 600×600 mm", price: 165000, unit: "piece", stock: 300, featured: true },
      { slug: "svetilnik-lpo-36w", nameUz: "LED svetilnik LPO 36 W", nameRu: "LED светильник ЛПО 36 Вт", nameEn: "LED batten light 36 W", price: 125000, unit: "piece", stock: 350 },
      { slug: "svetilnik-tochechniy-gx53", nameUz: "Nuqtali svetilnik GX53", nameRu: "Точечный светильник GX53", nameEn: "Downlight GX53", price: 28000, unit: "piece", stock: 800 },
      { slug: "led-lenta-5m", nameUz: "LED lenta 5 m, 12 V", nameRu: "LED лента 5 м, 12 В", nameEn: "LED strip 5 m, 12 V", price: 68000, unit: "roll", stock: 400, featured: true },
      { slug: "blok-pitaniya-12v-5a", nameUz: "Blok pitaniya 12 V, 5 A", nameRu: "Блок питания 12 В, 5 А", nameEn: "Power supply 12 V, 5 A", price: 95000, unit: "piece", stock: 260 },
      { slug: "prozhektor-led-30w", nameUz: "LED prozhektor 30 W", nameRu: "LED прожектор 30 Вт", nameEn: "LED floodlight 30 W", price: 98000, unit: "piece", stock: 300 },
      { slug: "prozhektor-led-50w", nameUz: "LED prozhektor 50 W", nameRu: "LED прожектор 50 Вт", nameEn: "LED floodlight 50 W", price: 145000, unit: "piece", stock: 180 },
      { slug: "prozhektor-led-100w", nameUz: "LED prozhektor 100 W", nameRu: "LED прожектор 100 Вт", nameEn: "LED floodlight 100 W", price: 245000, unit: "piece", stock: 180 },
      { slug: "kocha-chirogi-100w", nameUz: "Ko'cha chirog'i 100 W", nameRu: "Уличный светильник 100 Вт", nameEn: "Street light 100 W", price: 385000, unit: "piece", stock: 90 },
      { slug: "patron-e27", nameUz: "Patron E27", nameRu: "Патрон E27", nameEn: "Lamp holder E27", price: 6000, unit: "piece", stock: 2000 },
      { slug: "datchik-dvijeniya", nameUz: "Harakat datchigi", nameRu: "Датчик движения", nameEn: "Motion sensor", price: 78000, unit: "piece", stock: 280 },
      { slug: "datchik-osveshchennosti", nameUz: "Yorug'lik datchigi (foto-rele)", nameRu: "Фотореле (датчик освещённости)", nameEn: "Photocell switch", price: 65000, unit: "piece", stock: 240 },
    ],
  },

  {
    slug: "hisoblagich-olchov",
    nameUz: "Hisoblagich va o'lchov asboblari",
    nameRu: "Счётчики и измерения",
    nameEn: "Meters & instruments",
    icon: "📟",
    products: [
      { slug: "hisoblagich-1-fazali", nameUz: "Bir fazali elektr hisoblagichi", nameRu: "Однофазный счётчик электроэнергии", nameEn: "Single-phase electricity meter", price: 485000, unit: "piece", stock: 120, featured: true },
      { slug: "hisoblagich-3-fazali", nameUz: "Uch fazali elektr hisoblagichi", nameRu: "Трёхфазный счётчик электроэнергии", nameEn: "Three-phase electricity meter", price: 1250000, unit: "piece", stock: 50 },
      { slug: "tok-transformatori-100-5", nameUz: "Tok transformatori 100/5 A", nameRu: "Трансформатор тока 100/5 А", nameEn: "Current transformer 100/5 A", price: 165000, unit: "piece", stock: 100 },
      { slug: "multimetr-dt830b", nameUz: "Multimetr DT-830B", nameRu: "Мультиметр DT-830B", nameEn: "Multimeter DT-830B", price: 78000, unit: "piece", stock: 300, featured: true },
      { slug: "multimetr-professional", nameUz: "Professional multimetr (True RMS)", nameRu: "Профессиональный мультиметр (True RMS)", nameEn: "Professional multimeter (True RMS)", price: 285000, unit: "piece", stock: 90 },
      { slug: "tok-kleshi", nameUz: "Tok o'lchash qisqichi (kleshi)", nameRu: "Токоизмерительные клещи", nameEn: "Clamp meter", price: 320000, unit: "piece", stock: 70 },
      { slug: "indikator-otvertka", nameUz: "Indikator otvertka", nameRu: "Индикаторная отвёртка", nameEn: "Voltage tester screwdriver", price: 18000, unit: "piece", stock: 700 },
      { slug: "tester-lan", nameUz: "LAN kabel testeri", nameRu: "Тестер LAN кабеля", nameEn: "LAN cable tester", price: 165000, unit: "piece", stock: 80 },
      { slug: "megaommetr", nameUz: "Megaommetr (izolyatsiya o'lchagich)", nameRu: "Мегаомметр (измеритель изоляции)", nameEn: "Insulation resistance tester", price: 1850000, unit: "piece", stock: 20 },
      { slug: "pirometr", nameUz: "Infraqizil termometr (pirometr)", nameRu: "Инфракрасный термометр (пирометр)", nameEn: "Infrared thermometer", price: 245000, unit: "piece", stock: 60 },
    ],
  },

  {
    slug: "elektromontaj-sarf",
    nameUz: "Elektromontaj asboblari va sarf mollari",
    nameRu: "Электромонтажный инструмент и расходники",
    nameEn: "Electrical tools & consumables",
    icon: "🧰",
    products: [
      { slug: "izolenta-pvh-20m", nameUz: "Izolenta PVX 20 m", nameRu: "Изолента ПВХ 20 м", nameEn: "PVC insulating tape 20 m", price: 8000, unit: "roll", stock: 3000, featured: true },
      { slug: "izolenta-hb", nameUz: "Izolenta HB (mato)", nameRu: "Изолента ХБ (тканевая)", nameEn: "Cloth insulating tape", price: 12000, unit: "roll", stock: 1500 },
      { slug: "termousadka-nabor", nameUz: "Termousadka to'plami (aralash o'lchamlar)", nameRu: "Набор термоусадки (разные размеры)", nameEn: "Heat-shrink tubing set", price: 45000, unit: "set", stock: 500 },
      { slug: "wago-222-413", nameUz: "WAGO 222-413 klemma, 10 dona", nameRu: "Клемма WAGO 222-413, 10 шт", nameEn: "WAGO 222-413 connector, 10 pcs", brand: "WAGO", price: 32000, unit: "pack", stock: 800, featured: true },
      { slug: "wago-773-173", nameUz: "WAGO 773-173 klemma, 100 dona", nameRu: "Клемма WAGO 773-173, 100 шт", nameEn: "WAGO 773-173 connector, 100 pcs", brand: "WAGO", price: 65000, unit: "pack", stock: 400 },
      { slug: "klemmnik-12", nameUz: "Klemmnik 12 pozitsiya", nameRu: "Клеммник 12 позиций", nameEn: "Terminal block, 12 way", price: 18000, unit: "piece", stock: 900 },
      { slug: "nakonechnik-nshvi-nabor", nameUz: "NShVI nakonechniklar to'plami", nameRu: "Набор наконечников НШВИ", nameEn: "Ferrule kit (NShVI)", price: 48000, unit: "set", stock: 400 },
      { slug: "nakonechnik-16mm", nameUz: "Mis nakonechnik 16 mm², 10 dona", nameRu: "Медный наконечник 16 мм², 10 шт", nameEn: "Copper lug 16 mm², 10 pcs", price: 32000, unit: "pack", stock: 600 },
      { slug: "sjim-orehoviy", nameUz: "Yong'oq siqim (orexoviy sjim)", nameRu: "Орех (ответвительный зажим)", nameEn: "Split-bolt connector", price: 12000, unit: "piece", stock: 1000 },
      { slug: "kabel-nozh", nameUz: "Kabel pichog'i", nameRu: "Кабельный нож", nameEn: "Cable knife", price: 45000, unit: "piece", stock: 350 },
      { slug: "striper", nameUz: "Sim tozalagich (striper)", nameRu: "Стриппер для снятия изоляции", nameEn: "Wire stripper", price: 95000, unit: "piece", stock: 280, featured: true },
      { slug: "press-kleshi-nshvi", nameUz: "NShVI uchun press-qisqich", nameRu: "Пресс-клещи для НШВИ", nameEn: "Ferrule crimping tool", price: 185000, unit: "piece", stock: 150 },
      { slug: "bokorezy-160", nameUz: "Bokorez 160 mm", nameRu: "Бокорезы 160 мм", nameEn: "Diagonal cutters 160 mm", price: 68000, unit: "piece", stock: 400 },
      { slug: "passatiji-izol", nameUz: "Izolyatsiyalangan passatiji 1000 V", nameRu: "Пассатижи изолированные 1000 В", nameEn: "Insulated pliers 1000 V", price: 78000, unit: "piece", stock: 350 },
      { slug: "otvertka-dielektrik-nabor", nameUz: "Dielektrik otvertkalar to'plami", nameRu: "Набор диэлектрических отвёрток", nameEn: "Insulated screwdriver set", price: 125000, unit: "set", stock: 220 },
      { slug: "payalnik-60w", nameUz: "Payvandlagich (payalnik) 60 W", nameRu: "Паяльник 60 Вт", nameEn: "Soldering iron 60 W", price: 85000, unit: "piece", stock: 260 },
      { slug: "pripoy-100gr", nameUz: "Pripoy 100 gr", nameRu: "Припой 100 гр", nameEn: "Solder wire 100 g", price: 42000, unit: "piece", stock: 500 },
      { slug: "protyajka-uzk-20m", nameUz: "Kabel tortish tasmasi (UZK) 20 m", nameRu: "Протяжка для кабеля (УЗК) 20 м", nameEn: "Cable pulling rod (fish tape) 20 m", price: 185000, unit: "piece", stock: 120 },
      { slug: "perchatki-dielektrik", nameUz: "Dielektrik qo'lqoplar", nameRu: "Диэлектрические перчатки", nameEn: "Insulating gloves", price: 95000, unit: "piece", stock: 200 },
    ],
  },
];

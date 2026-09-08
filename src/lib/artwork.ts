/**
 * Mahsulot illyustratsiyalari.
 *
 * Har bir mahsulot uchun foto o'rniga o'zimiz chizgan vektor rasm ko'rsatiladi
 * (public/img/art/*.svg). Admin panelda «Rasm havolasi» to'ldirilsa, u ustun
 * turadi — ya'ni haqiqiy foto qo'yilgach illyustratsiya avtomatik almashadi.
 *
 * Moslik mahsulot slug'i bo'yicha aniqlanadi, shuning uchun admin paneldan
 * qo'shilgan yangi mahsulotlar ham darhol rasmga ega bo'ladi.
 */

const BASE = "/img/art";

/** Tartib muhim — birinchi mos kelgan qoida ishlaydi. */
const RULES: [RegExp, string][] = [
  // --- kabel va simlar ---
  [/buxta/, "cable-coil"],
  [/utp|ftp/, "cable-utp"],
  [/koaksial/, "cable-coax"],
  [/telefon|kspv|domofon|akustik/, "cable-utp"],
  [/\bsip\b|kabel-sip/, "cable-sip"],
  [/kabel-kg-/, "cable-welding"],
  [/avvg/, "cable-alu"],
  [/pvs|shvvp/, "cable-flex"],
  [/pv1|pv3/, "cable-1core"],
  // Tomirlar soni rasmda ko'rinadi: 2×, 3×, 4×, 5×
  [/(vvgng|vvg|nym)-5x/, "cable-5core"],
  [/(vvgng|vvg|nym)-4x/, "cable-4core"],
  [/(vvgng|vvg|nym)-2x/, "cable-2core"],
  [/vvgng|vvg|nym/, "cable-3core"],

  // --- kanal, gofra, mahkamlash ---
  [/kabel-kanal/, "trunking"],
  [/gofra|metallorukav|truba-pvh/, "conduit-corrugated"],
  [/xomut|klipsa/, "cable-tie"],

  // --- avtomatlar va himoya ---
  [/shchit|boks-ip/, "panel-board"],
  [/uzo-|difavtomat|rele-/, "rcd"],
  [/kontaktor|rubilnik/, "contactor"],
  [/avtomat-3p|avtomat-2p/, "breaker-3p"],
  [/avtomat/, "breaker-1p"],

  // --- rozetka, vyklyuchatel ---
  [/rozetka-ikkilik/, "socket-double"],
  [/rozetka/, "socket"],
  [/vyklyuchatel|dimmer/, "switch"],
  [/vilka/, "plug"],
  [/podrozetnik|raspredkorobka|ramka/, "back-box"],
  [/udlinitel|setevoy-filtr/, "extension"],

  // --- yoritish ---
  [/led-panel/, "led-panel"],
  [/led-lenta|blok-pitaniya/, "led-strip"],
  [/prozhektor|kocha-chirogi/, "floodlight"],
  [/svetilnik/, "batten"],
  [/datchik/, "sensor"],
  [/lampa|patron/, "bulb"],

  // --- o'lchov ---
  [/tok-kleshi/, "clamp-meter"],
  [/hisoblagich|tok-transformatori/, "meter"],
  [/multimetr|megaommetr|pirometr|tester-lan/, "multimeter"],

  // --- elektromontaj sarf mollari ---
  [/izolenta|termousadka/, "tape"],
  [/wago|klemmnik|nakonechnik|sjim/, "wago"],
  [/payalnik|pripoy/, "solder"],
  [/striper|bokorez|passatiji|press-kleshi|kabel-nozh|otvertka|indikator|protyajka|perchatki/, "pliers"],

  // --- santexnika ---
  [/unitaz/, "toilet"],
  [/smesitel|rakovina/, "faucet"],
  [/truba-ppr|truba-kanalizatsiya/, "pipe"],
  [/radiator/, "radiator"],
  [/vodonagrevatel/, "heater"],

  // --- izolyatsiya ---
  [/penoplast|penopleks/, "foam-board"],
  [/minvata|folgoizol/, "mineral-wool"],
  [/bitum|mastika/, "bitumen-roll"],

  // --- tom ---
  [/metallocherepitsa/, "roof-tile"],
  [/profnastil|polikarbonat|shifer|vodostok|konek/, "profnastil"],

  // --- eshik va deraza ---
  [/eshik/, "door"],
  [/deraza|podokonnik|furnitura/, "window"],

  // --- gipsokarton ---
  [/gkl-/, "drywall"],
  [/profil-cd|profil-ud|podves|serpyanka/, "profile"],

  // --- mahkamlagichlar ---
  [/pena-montaj|germetik/, "foam-can"],
  [/sarup|dyubel|anker|gvozd/, "screw"],

  // --- asboblar ---
  [/perforator|shurupovert/, "drill"],
  [/bolgarka|disk-almaz/, "grinder"],
  [/uroven|lazer|ruletka/, "level"],
  [/malla|tachka|betonomeshalka/, "trowel"],

  // --- qurilish materiallari ---
  [/sement|gips|shpaklyovka|plitka-yelimi|nalivnoy/, "cement-bag"],
  [/qum|shagal/, "sand"],
  [/gazoblok|shlakoblok|keramzitblok|bordyur|trotuar/, "block"],
  [/gisht/, "brick"],
  [/armatura|setka|sim-boglash/, "rebar"],
  [/profil-truba|burchak|shveller|list-metall/, "tube"],
  [/fanera|osb|dsp/, "plywood"],
  [/brus|doska|vagonka/, "timber"],
  [/valik|malyar-lenta/, "roller"],
  [/boyoq|emal|lak-|shtukaturka|rastvoritel|vodoemulsiya|gruntovka/, "paint"],
  [/kafel|keramogranit|mozaika|zatirka|krestiki/, "tile"],
  [/laminat|linoleum|podlojka|plintus/, "laminate"],
];

/** Kategoriya bo'yicha zaxira rasm. */
const BY_CATEGORY: Record<string, string> = {
  "kabel-simlar": "cable-3core",
  "kabel-kanal-gofra": "conduit-corrugated",
  "avtomatlar-himoya": "breaker-1p",
  "rozetka-vyklyuchatel": "socket",
  yoritish: "bulb",
  "hisoblagich-olchov": "multimeter",
  "elektromontaj-sarf": "pliers",
  "sement-quruq-aralashmalar": "cement-bag",
  "gisht-bloklar": "brick",
  "metall-armatura": "rebar",
  "yogoch-materiallar": "timber",
  "boyoq-lak": "paint",
  "kafel-keramika": "tile",
  "pol-qoplamalari": "laminate",
  santexnika: "faucet",
  izolyatsiya: "foam-board",
  "tom-materiallari": "profnastil",
  "eshik-deraza": "door",
  "gipsokarton-profil": "drywall",
  mahkamlagichlar: "screw",
  asboblar: "drill",
};

/** Mahsulot uchun illyustratsiya manzili (topilmasa null). */
export function artForProduct(slug: string, categorySlug?: string | null): string | null {
  const s = slug.toLowerCase();
  for (const [re, art] of RULES) {
    if (re.test(s)) return `${BASE}/${art}.svg`;
  }
  const fallback = categorySlug ? BY_CATEGORY[categorySlug] : undefined;
  return fallback ? `${BASE}/${fallback}.svg` : null;
}

/** Kategoriya plitkasi uchun illyustratsiya. */
export function artForCategory(slug: string): string | null {
  const art = BY_CATEGORY[slug];
  return art ? `${BASE}/${art}.svg` : null;
}

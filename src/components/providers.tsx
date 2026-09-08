"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOCALE, t as dict, type Locale } from "@/i18n";

/* ------------------------------------------------------------------ */
/* Til                                                                  */
/* ------------------------------------------------------------------ */

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: ReturnType<typeof dict>;
};

const LocaleContext = createContext<LocaleCtx | null>(null);

export function useLocale(): LocaleCtx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale <Providers> ichida ishlatilishi kerak");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Savat                                                               */
/* ------------------------------------------------------------------ */

export type CartLine = {
  id: string;
  slug: string;
  name: string;
  price: number;
  unit: string;
  image: string | null;
  icon: string | null;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
  ready: boolean;
};

const CartContext = createContext<CartCtx | null>(null);

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart <Providers> ichida ishlatilishi kerak");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Saralanganlar                                                       */
/* ------------------------------------------------------------------ */

export type FavLine = Omit<CartLine, "qty">;

type FavCtx = {
  items: FavLine[];
  has: (id: string) => boolean;
  toggle: (item: FavLine) => void;
  remove: (id: string) => void;
  ready: boolean;
};

const FavContext = createContext<FavCtx | null>(null);

export function useFavorites(): FavCtx {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavorites <Providers> ichida ishlatilishi kerak");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Telegram Mini App                                                   */
/* ------------------------------------------------------------------ */

type TgUser = { id: number; first_name?: string; username?: string } | null;

const TgContext = createContext<{ isTelegram: boolean; user: TgUser }>({
  isTelegram: false,
  user: null,
});

export function useTelegram() {
  return useContext(TgContext);
}

/* ------------------------------------------------------------------ */

const CART_KEY = "qm_cart_v1";
const FAV_KEY = "qm_fav_v1";

function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private rejim — jimgina o'tkazamiz */
  }
}

export function Providers({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favs, setFavs] = useState<FavLine[]>([]);
  const [ready, setReady] = useState(false);
  const [tg, setTg] = useState<{ isTelegram: boolean; user: TgUser }>({
    isTelegram: false,
    user: null,
  });

  // localStorage'dan tiklash
  useEffect(() => {
    setLines(readStore<CartLine[]>(CART_KEY, []));
    setFavs(readStore<FavLine[]>(FAV_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeStore(CART_KEY, lines);
  }, [lines, ready]);

  useEffect(() => {
    if (ready) writeStore(FAV_KEY, favs);
  }, [favs, ready]);

  // Telegram WebApp
  useEffect(() => {
    const w = window as unknown as {
      Telegram?: {
        WebApp?: {
          ready: () => void;
          expand: () => void;
          initDataUnsafe?: { user?: { id: number; first_name?: string; username?: string } };
          colorScheme?: string;
          setHeaderColor?: (c: string) => void;
        };
      };
    };
    const app = w.Telegram?.WebApp;
    if (!app) return;
    try {
      app.ready();
      app.expand();
      const scheme = app.colorScheme;
      if (scheme === "dark" || scheme === "light") {
        document.documentElement.setAttribute("data-theme", scheme);
      }
      setTg({ isTelegram: true, user: app.initDataUnsafe?.user ?? null });
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback(
    (l: Locale) => {
      setLocaleState(l);
      document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      document.documentElement.lang = l;
      router.refresh();
    },
    [router]
  );

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.id === line.id);
      if (i === -1) return [...prev, { ...line, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const cartValue = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return {
      lines,
      count,
      subtotal,
      add,
      setQty,
      remove,
      clear,
      qtyOf: (id: string) => lines.find((l) => l.id === id)?.qty ?? 0,
      ready,
    };
  }, [lines, add, setQty, remove, clear, ready]);

  const favValue = useMemo<FavCtx>(
    () => ({
      items: favs,
      ready,
      has: (id: string) => favs.some((f) => f.id === id),
      toggle: (item: FavLine) =>
        setFavs((prev) =>
          prev.some((f) => f.id === item.id)
            ? prev.filter((f) => f.id !== item.id)
            : [item, ...prev]
        ),
      remove: (id: string) => setFavs((prev) => prev.filter((f) => f.id !== id)),
    }),
    [favs, ready]
  );

  const localeValue = useMemo<LocaleCtx>(
    () => ({ locale, setLocale, t: dict(locale) }),
    [locale, setLocale]
  );

  return (
    <TgContext.Provider value={tg}>
      <LocaleContext.Provider value={localeValue}>
        <CartContext.Provider value={cartValue}>
          <FavContext.Provider value={favValue}>{children}</FavContext.Provider>
        </CartContext.Provider>
      </LocaleContext.Provider>
    </TgContext.Provider>
  );
}

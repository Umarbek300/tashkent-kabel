"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./providers";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT } from "@/i18n";

export function LocaleSwitch() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Tilni almashtirish"
        className="grid h-9 min-w-9 place-items-center rounded-full border px-2 text-xs font-semibold transition active:scale-90"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
      >
        {LOCALE_SHORT[locale]}
      </button>

      {open && (
        <div className="card animate-slide-up absolute right-0 top-11 z-50 w-40 overflow-hidden p-1">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                l === locale
                  ? "bg-[var(--color-brand-50)] font-semibold text-[var(--color-brand-700)]"
                  : "hover:bg-[var(--surface-2)]"
              }`}
            >
              {LOCALE_LABELS[l]}
              {l === locale && <span className="text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

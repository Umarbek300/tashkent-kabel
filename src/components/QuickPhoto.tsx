"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setProductImageAction } from "@/app/admin/actions";
import { ProductImage } from "./ProductImage";

/**
 * Admin ro'yxatidagi rasm katakchasi: bosilsa fayl tanlanadi, yuklanadi va
 * darhol mahsulotga biriktiriladi. Telefonda kamera ochiladi.
 */
export function QuickPhoto({
  productId,
  image,
  alt,
  icon,
}: {
  productId: string;
  image: string | null;
  alt: string;
  icon: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handle = async (file: File) => {
    setError("");
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "xato");
        return;
      }
      startTransition(async () => {
        await setProductImageAction(productId, data.url);
        router.refresh();
      });
    } catch {
      setError("tarmoq xatosi");
    } finally {
      setBusy(false);
    }
  };

  const working = busy || pending;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        title={image ? "Rasmni almashtirish" : "Rasm yuklash"}
        className="relative block h-14 w-14 overflow-hidden rounded-xl transition active:scale-95"
      >
        <ProductImage src={image} alt={alt} icon={icon} rounded="rounded-none" />
        {!image && !working && (
          <span className="absolute inset-x-0 bottom-0 bg-[var(--color-brand-600)] py-0.5 text-[9px] font-bold text-white">
            + FOTO
          </span>
        )}
        {working && (
          <span className="absolute inset-0 grid place-items-center bg-black/50 text-[9px] font-bold text-white">
            …
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handle(f);
          e.target.value = "";
        }}
      />
      {error && <div className="absolute -bottom-4 left-0 text-[9px] text-red-500">{error}</div>}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

/**
 * Rasm maydoni: telefondan yoki kompyuterdan fayl tanlanadi, server kichraytirib
 * bazaga saqlaydi va manzilini qaytaradi. Manzilni qo'lda yozish ham mumkin.
 */
export function ImageField({
  name,
  defaultValue,
  label = "Rasm",
}: {
  name: string;
  defaultValue?: string | null;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setError("");
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Yuklashda xato");
        return;
      }
      setUrl(data.url);
    } catch {
      setError("Tarmoq xatosi");
    } finally {
      setBusy(false);
    }
  };

  const pick = (files: FileList | null) => {
    const file = files?.[0];
    if (file) void upload(file);
  };

  return (
    <div>
      <span className="mb-1 block text-xs muted">{label}</span>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-3">
        <div
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-2xl opacity-40">🖼️</div>
          )}
          {busy && (
            <div className="absolute inset-0 grid place-items-center bg-black/40 text-[11px] font-semibold text-white">
              yuklanmoqda…
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              pick(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-xl border border-dashed px-3 py-3 text-center text-xs transition ${
              drag ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)]" : ""
            }`}
            style={drag ? undefined : { borderColor: "var(--border)" }}
          >
            <b className="text-[var(--color-brand-700)]">Rasm tanlash</b>
            <div className="mt-0.5 muted">yoki faylni shu yerga tashlang</div>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              pick(e.target.files);
              e.target.value = "";
            }}
          />

          <input
            className="field mt-2 !py-2 text-xs"
            placeholder="yoki rasm havolasini yozing: https://…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="mt-1.5 text-xs font-semibold text-red-500"
            >
              Rasmni olib tashlash
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

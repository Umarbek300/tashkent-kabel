"use client";

/**
 * Mahsulot rasmi.
 *
 * Rasm bo'lmasa — bo'sh, bosiq o'rinbosar ko'rsatiladi ("foto kutilmoqda").
 * Haqiqiy foto admin paneldan yuklanadi.
 */
export function ProductImage({
  src,
  alt,
  icon,
  className = "",
  rounded = "rounded-2xl",
}: {
  src?: string | null;
  alt: string;
  /** Eskirgan: endi ishlatilmaydi, chaqiruvlarni buzmaslik uchun qoldirilgan. */
  seed?: string;
  icon?: string | null;
  className?: string;
  rounded?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${rounded} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-1 ${rounded} ${className}`}
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      aria-label={alt}
      role="img"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 opacity-25" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M4.5 17.5 9.5 12l3.5 3.5 2.5-2 4 4.5" strokeLinejoin="round" />
      </svg>
      {icon && <span className="text-lg opacity-30">{icon}</span>}
    </div>
  );
}

"use client";

/**
 * Mahsulot rasmi. Rasm bo'lmasa — slug'dan hosil qilingan barqaror gradient
 * va kategoriya emojisi ko'rsatiladi, shunda katalog "singan" ko'rinmaydi.
 */

const PALETTES: [string, string][] = [
  ["#ffd9b0", "#ffb066"],
  ["#cfe0ff", "#9dbcf5"],
  ["#d7f0dd", "#a4d9b6"],
  ["#f3d9f7", "#d7a8e6"],
  ["#ffe3e0", "#f6b1ab"],
  ["#e2e5f0", "#b5bdd4"],
  ["#fdf0c2", "#f2d377"],
  ["#d6f1f4", "#9fd8e0"],
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function ProductImage({
  src,
  alt,
  seed,
  icon,
  className = "",
  rounded = "rounded-2xl",
}: {
  src?: string | null;
  alt: string;
  seed: string;
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

  const [from, to] = PALETTES[hash(seed) % PALETTES.length];

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-label={alt}
      role="img"
    >
      <span className="select-none text-[2.25rem] leading-none opacity-70 drop-shadow-sm sm:text-[2.75rem]">
        {icon || "🧱"}
      </span>
    </div>
  );
}

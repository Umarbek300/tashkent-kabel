"use client";

import { useFavorites, type FavLine } from "./providers";

export function FavButton({ item, className = "" }: { item: FavLine; className?: string }) {
  const { has, toggle } = useFavorites();
  const active = has(item.id);

  return (
    <button
      type="button"
      aria-label="Saralanganlarga qo'shish"
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      className={`grid h-8 w-8 place-items-center rounded-full backdrop-blur transition active:scale-90 ${
        active ? "bg-white/90 text-red-500" : "bg-black/25 text-white"
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M12 20.7 4.6 13.3a4.6 4.6 0 1 1 6.5-6.5l.9.9.9-.9a4.6 4.6 0 1 1 6.5 6.5Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

import Link from "next/link";
import { ProductImage } from "./ProductImage";
import type { LocalizedCategory } from "@/lib/catalog";

export function CategoryTile({ c }: { c: LocalizedCategory }) {
  return (
    <Link href={`/c/${c.slug}`} className="group block transition active:scale-[0.98]">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
      >
        <ProductImage
          src={c.image}
          alt={c.name}
          seed={c.slug}
          icon={c.icon}
          rounded="rounded-none"
        />
        {typeof c.count === "number" && (
          <span className="absolute right-2 top-2 rounded-full bg-black/35 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
            {c.count}
          </span>
        )}
      </div>
      <div className="mt-1.5 px-0.5 text-[13px] font-medium leading-snug line-2">{c.name}</div>
    </Link>
  );
}

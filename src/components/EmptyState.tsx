import Link from "next/link";

export function EmptyState({
  icon,
  title,
  hint,
  actionHref,
  actionLabel,
}: {
  icon: string;
  title: string;
  hint?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mt-16 flex flex-col items-center px-6 text-center">
      <div className="mb-3 text-5xl opacity-70">{icon}</div>
      <h2 className="text-lg font-bold">{title}</h2>
      {hint && <p className="mt-1 text-sm muted">{hint}</p>}
      {actionHref && actionLabel && (
        <Link href={actionHref} className="btn-primary mt-5 px-6 py-3 text-sm">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

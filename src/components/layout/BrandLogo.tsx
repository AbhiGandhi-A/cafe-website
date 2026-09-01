import Link from "next/link";
import { Pizza } from "lucide-react";
import { classNames } from "@/lib/utils";

export function BrandLogo({
  light = true,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={classNames("group flex items-center gap-2.5", className)}
      aria-label="Crazy Cheesy Cafe home"
    >
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-yellow text-ink-dark shadow-soft transition-transform duration-300 group-hover:-rotate-6">
        <Pizza size={26} strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={classNames(
            "font-display text-lg font-black uppercase tracking-tight",
            light ? "text-brand-cream" : "text-brand-cream"
          )}
        >
          Crazy Cheesy
        </span>
        <span
          className={classNames(
            "text-xs font-extrabold uppercase tracking-[0.35em]",
            light ? "text-brand-yellow" : "text-brand-yellow"
          )}
        >
          Cafe
        </span>
      </span>
    </Link>
  );
}

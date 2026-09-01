import type { ReactNode } from "react";
import { classNames } from "@/lib/utils";

type Tone = "yellow" | "red" | "green" | "dark" | "cream" | "hot" | "new";

const toneClasses: Record<Tone, string> = {
  yellow: "bg-brand-yellow text-ink-dark",
  red: "bg-brand-red text-white",
  green: "bg-green-600 text-white",
  dark: "bg-ink-charcoal text-brand-yellow border border-ink-line",
  cream: "bg-white/90 text-ink-dark backdrop-blur",
  hot: "bg-gradient-to-r from-brand-red to-orange-500 text-white",
  new: "bg-green-600/90 text-white",
};

export function Badge({
  children,
  tone = "yellow",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

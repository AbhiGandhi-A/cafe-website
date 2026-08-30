import type { ReactNode } from "react";
import { classNames } from "@/lib/utils";

type Tone = "yellow" | "red" | "green" | "dark" | "cream";

const toneClasses: Record<Tone, string> = {
  yellow: "bg-brand-yellow text-brand-charcoal",
  red: "bg-brand-red text-white",
  green: "bg-green-600 text-white",
  dark: "bg-brand-charcoal text-brand-yellow",
  cream: "bg-white/90 text-brand-charcoal backdrop-blur",
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

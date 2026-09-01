import { classNames } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "mb-10 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {label && (
        <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow">
          {label}
        </p>
      )}
      <h2
        className={classNames(
          "font-display mt-2 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]",
          light ? "text-brand-cream" : "text-brand-cream"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-brand-gray">{description}</p>
      )}
    </div>
  );
}

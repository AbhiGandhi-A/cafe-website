import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { classNames } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "dark" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "full";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-yellow text-ink-dark hover:bg-brand-yellow-light shadow-glow hover:-translate-y-0.5",
  secondary: "bg-ink-card text-brand-cream hover:bg-ink-card2 hover:-translate-y-0.5 border border-ink-line",
  outline:
    "border border-white/25 text-brand-cream bg-transparent hover:bg-white/10 hover:border-white/40",
  dark: "bg-ink-dark text-brand-yellow hover:bg-ink-card border border-ink-line hover:-translate-y-0.5",
  ghost: "bg-transparent text-brand-cream hover:bg-white/5",
  danger: "bg-brand-red text-white hover:bg-brand-red-dark hover:-translate-y-0.5",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2",
  md: "text-sm px-5 py-3",
  lg: "text-base px-7 py-3.5",
  full: "text-base px-6 py-3.5 w-full",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

type ButtonComponentProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

type ButtonLinkProps = BaseProps & {
  href: string;
  onClick?: () => void;
};

type ButtonProps = ButtonComponentProps | ButtonLinkProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ ...props }, ref) {
    const { variant = "primary", size = "md", fullWidth, className, children } =
      props;
    const classes = classNames(
      baseClasses,
      variantClasses[variant],
      sizeClasses[fullWidth ? "full" : size],
      className
    );

    if ("href" in props && props.href != null) {
      const { href, onClick } = props as ButtonLinkProps;
      return (
        <Link href={href} onClick={onClick} className={classes}>
          {children}
        </Link>
      );
    }

    const { type = "button", disabled, ...rest } = props as ButtonComponentProps;
    return (
      <button ref={ref} type={type} disabled={disabled} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

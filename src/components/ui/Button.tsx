import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { classNames } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "dark" | "ghost";
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
    "bg-brand-yellow text-brand-charcoal hover:bg-brand-yellow-light hover:-translate-y-0.5 shadow-soft",
  secondary:
    "bg-brand-charcoal text-brand-cream hover:bg-brand-dark hover:-translate-y-0.5 shadow-soft",
  outline:
    "border-2 border-brand-charcoal text-brand-charcoal bg-transparent hover:bg-brand-charcoal hover:text-brand-cream",
  dark: "bg-brand-dark text-brand-yellow hover:bg-brand-charcoal hover:-translate-y-0.5",
  ghost: "bg-transparent text-brand-charcoal hover:bg-black/5",
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

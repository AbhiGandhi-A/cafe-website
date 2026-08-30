"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { classNames } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.replace("/#", "/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={classNames(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-brand-yellow text-brand-charcoal"
                    : "text-brand-charcoal/70 hover:bg-black/5 hover:text-brand-charcoal"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/menu?search="
            aria-label="Search menu"
            className="grid h-10 w-10 place-items-center rounded-full text-brand-charcoal/70 transition-colors hover:bg-black/5 hover:text-brand-charcoal"
          >
            <Search size={20} />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-brand-charcoal/70 transition-colors hover:bg-black/5 hover:text-brand-charcoal"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <Button
            href="/menu"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Order Now
          </Button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-brand-charcoal transition-colors hover:bg-black/5 md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-black/5 bg-white md:hidden">
          <nav
            className="flex flex-col gap-1 px-4 py-4"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-brand-charcoal transition-colors hover:bg-brand-yellow/60"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/menu"
              variant="primary"
              size="full"
              className="mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Order Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

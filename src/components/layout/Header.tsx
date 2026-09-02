"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X, Flame } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { classNames } from "@/lib/utils";
import { cafeInfo } from "@/data/cafe";
import { OpenStatusPill } from "@/components/ui/OpenStatus";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#store-locator", label: "Store Locator" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announceVisible, setAnnounceVisible] = useState(true);
  const { cartCount, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));

  return (
    <>
      {announceVisible && (
        <div className="relative z-50 border-b border-white/5 bg-gradient-to-r from-brand-yellow/15 via-brand-red/10 to-transparent">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs font-semibold text-brand-cream/90 sm:px-6 lg:px-8">
            <p className="flex items-center gap-1.5 truncate">
              <Flame size={14} className="shrink-0 text-brand-yellow" />
              <span className="truncate">
                {cafeInfo.timingDisplay} ? Ground floor Signature Galleria, Ankleshwar
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-0.5 text-brand-yellow hover:text-brand-yellow-light"
              >
                View Menu
                <span className="transition-transform group-hover:translate-x-0.5">?</span>
              </Link>
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={() => setAnnounceVisible(false)}
                className="text-brand-gray hover:text-brand-cream"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        className={classNames(
          "sticky top-0 z-50 border-b border-ink-line bg-ink-dark/90 backdrop-blur-xl transition-all duration-300",
          scrolled ? "shadow-card" : ""
        )}
      >
        <div
          className={classNames(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8",
            scrolled ? "h-14" : "h-[68px]"
          )}
        >
          <BrandLogo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames(
                    "group relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "text-brand-yellow"
                      : "text-brand-cream/80 hover:text-brand-cream"
                  )}
                >
                  {link.label}
                  <span
                    className={classNames(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-yellow transition-opacity",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/menu?search="
              aria-label="Search menu"
              className="grid h-10 w-10 place-items-center rounded-full text-brand-cream/80 transition-colors hover:bg-white/5 hover:text-brand-cream"
            >
              <Search size={20} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-brand-cream/80 transition-colors hover:bg-white/5 hover:text-brand-cream"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-brand-yellow px-1 text-[11px] font-black text-ink-dark">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="hidden items-center gap-1.5 rounded-full bg-brand-yellow px-5 py-2 text-sm font-black text-ink-dark transition-all hover:bg-brand-yellow-light hover:shadow-glow sm:inline-flex"
            >
              Order Now <span className="font-bold">?</span>
            </Link>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-brand-cream transition-colors hover:bg-white/5 md:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="animate-fade-in border-t border-ink-line bg-ink-dark md:hidden">
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={classNames(
                    "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                    isActive(link.href)
                      ? "bg-white/5 text-brand-yellow"
                      : "text-brand-cream hover:bg-white/5"
                  )}
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
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <OpenStatusPill />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

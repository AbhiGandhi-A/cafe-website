"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X, Flame, ArrowRight } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));

  return (
    <>
      {announceVisible && (
        <div className="relative z-50 border-b border-white/5 bg-[#111111]">
          <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-3 px-4 py-2 text-xs font-semibold text-brand-cream/90 sm:px-8 lg:px-12">
            <p className="flex items-center gap-2 truncate">
              <Flame size={14} className="shrink-0 text-brand-yellow" />
              <span className="truncate">
                {cafeInfo.timingDisplay} &middot; Ground floor, Signature Galleria, Ankleshwar
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-1 text-xs font-bold text-brand-yellow hover:text-brand-yellow-light"
              >
                View Menu
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
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
          "sticky top-0 z-50 border-b border-white/10 bg-[#090909]/95 backdrop-blur-xl transition-all duration-300",
          scrolled ? "shadow-card h-[72px]" : "h-[78px]"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1480px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
          <BrandLogo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={classNames(
                    "group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "text-brand-yellow font-bold"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={classNames(
                      "absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-brand-yellow transition-opacity",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/menu?search="
              aria-label="Search menu"
              className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Search size={19} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-yellow px-1 text-[11px] font-black text-[#090909]">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="hidden items-center gap-2 rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-black text-[#090909] shadow-soft transition-all hover:bg-brand-yellow-light hover:shadow-glow sm:inline-flex"
            >
              Order Now <ArrowRight size={15} />
            </Link>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#090909] lg:hidden">
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={classNames(
                    "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                    isActive(link.href)
                      ? "bg-white/10 text-brand-yellow"
                      : "text-white hover:bg-white/5"
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
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <OpenStatusPill />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

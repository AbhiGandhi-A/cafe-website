"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, ClipboardCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { classNames } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/checkout", label: "Checkout", icon: ClipboardCheck },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openCart } = useCart();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => {
                if (item.href === "/cart") {
                  openCart();
                } else {
                  router.push(item.href);
                }
              }}
              className={classNames(
                "relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold transition-colors",
                active
                  ? "text-brand-red"
                  : "text-brand-charcoal/50 hover:text-brand-charcoal"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={21} />
              {item.label}
              {item.href === "/cart" && cartCount > 0 && (
                <span className="absolute right-[calc(50%-22px)] top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getItemById } from "@/data/menu";
import { formatPrice, getSubtotal } from "@/lib/utils";

export function FloatingCartBar() {
  const { cart, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (cart.length === 0) return null;

  const count = cart.reduce((s, line) => s + line.quantity, 0);
  const subtotal = getSubtotal(cart, (id) => getItemById(id)?.price ?? 0);

  return (
    <button
      type="button"
      onClick={openCart}
      className={
        "fixed inset-x-4 bottom-[76px] z-40 flex items-center justify-between rounded-2xl bg-brand-yellow px-4 py-3 font-bold text-ink-dark shadow-soft transition-all md:hidden " +
        (scrolled ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none")
      }
      aria-label="View cart"
    >
      <span className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-dark text-brand-yellow">
          <ShoppingBag size={16} />
        </span>
        View Cart · {count} item{count > 1 ? "s" : ""}
      </span>
      <span className="rounded-full bg-ink-dark px-3 py-1 text-sm font-black text-brand-yellow">
        {formatPrice(subtotal)}
      </span>
    </button>
  );
}

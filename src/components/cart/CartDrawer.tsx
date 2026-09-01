"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ShoppingBag, Trash2, ArrowRight, TicketPercent } from "lucide-react";
import { useCart, getLineKey } from "@/context/CartContext";
import { getItemById } from "@/data/menu";
import { coupons } from "@/data/cafe";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { FreeDeliveryProgress } from "@/components/ui/FreeDeliveryProgress";
import {
  calculateTotals,
  validateCoupon,
  getSubtotal,
  getSavedCouponCode,
  saveCouponCode,
  clearCouponCode,
  formatPrice,
} from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<typeof coupons[number] | null>(null);
  const [couponMsg, setCouponMsg] = useState("");

  useEffect(() => {
    if (isCartOpen) {
      const code = getSavedCouponCode();
      const c = coupons.find((x) => x.id === code);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCoupon(c ?? null);
      setCouponInput(code);
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  const subtotal = useMemo(() => getSubtotal(cart, (id) => getItemById(id)?.price ?? 0), [cart]);
  const totals = useMemo(() => calculateTotals(cart, (id) => getItemById(id)?.price ?? 0, true, coupon), [cart, coupon]);

  if (!isCartOpen) return null;

  const isEmpty = cart.length === 0;

  const applyCoupon = () => {
    const result = validateCoupon(couponInput, subtotal, coupons);
    setCouponMsg(result.message);
    if (result.valid && result.coupon) {
      setCoupon(result.coupon);
      saveCouponCode(result.coupon.id);
      toast("Coupon applied");
    } else {
      setCoupon(null);
      clearCouponCode();
      if (result.message) toast(result.message);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponMsg("");
    setCouponInput("");
    clearCouponCode();
  };

  const goCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 animate-overlay-in bg-black/70 backdrop-blur-sm" onClick={closeCart} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md animate-drawer-in flex-col bg-ink-dark shadow-lift"
      >
        <div className="flex items-center justify-between border-b border-ink-line px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-yellow" />
            <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-cream">
              Your Cart
            </h2>
            {!isEmpty && (
              <span className="rounded-full bg-brand-yellow/15 px-2 py-0.5 text-xs font-bold text-brand-yellow">
                {cart.reduce((s, c) => s + c.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-brand-cream transition-colors hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-brand-yellow/10 text-brand-yellow">
              <ShoppingBag size={36} />
            </div>
            <p className="font-display text-lg font-bold text-brand-cream">
              Your cart is hungry
            </p>
            <p className="text-sm text-brand-gray">
              Find something cheesy to fill it up.
            </p>
            <Button href="/menu" onClick={closeCart} variant="primary" className="mt-2">
              Find Something Cheesy
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <FreeDeliveryProgress subtotal={subtotal} />
              <ul className="mt-4 space-y-3">
                {cart.map((item) => {
                  const product = getItemById(item.productId);
                  if (!product) return null;
                  const key = getLineKey(item.productId, item.customizations);
                  return (
                    <li key={key} className="flex gap-3 rounded-2xl border border-ink-line bg-ink-card p-3">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        className="h-20 w-20 shrink-0 rounded-xl"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-brand-cream">{product.name}</p>
                          <button
                            type="button"
                            aria-label={`Remove ${product.name} from cart`}
                            onClick={() => removeFromCart(key)}
                            className="text-brand-gray transition-colors hover:text-brand-red"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.customizations.length > 0 && (
                          <p className="mt-0.5 text-[11px] text-brand-gray">
                            {item.customizations.map((c) => c.label).join(", ")}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-bold text-brand-yellow">
                          {formatPrice((product.price + item.customizations.reduce((s, c) => s + c.price, 0)) * item.quantity)}
                        </p>
                        <div className="mt-auto pt-2">
                          <QuantitySelector
                            small
                            quantity={item.quantity}
                            onIncrease={() => increaseQuantity(key)}
                            onDecrease={() => decreaseQuantity(key)}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 rounded-2xl border border-ink-line bg-ink-charcoal p-3">
                <div className="flex items-center gap-2">
                  <TicketPercent size={16} className="text-brand-yellow" />
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    aria-label="Coupon code"
                    className="min-w-0 flex-1 bg-transparent text-sm font-semibold uppercase text-brand-cream placeholder:text-brand-gray focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="rounded-full bg-brand-yellow px-3 py-1.5 text-xs font-bold text-ink-dark"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className="mt-1.5 text-xs font-medium text-brand-gray">{couponMsg}</p>
                )}
                {coupon && (
                  <div className="mt-1.5 flex items-center justify-between">
                    <p className="text-xs font-bold text-green-500">
                      {coupon.id} applied — {coupon.label} off
                    </p>
                    <button type="button" onClick={removeCoupon} className="text-xs text-brand-gray hover:text-brand-red">
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  clearCart();
                  toast("Cart cleared");
                }}
                className="mt-3 w-full text-center text-xs font-semibold text-brand-gray hover:text-brand-red"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-3 border-t border-ink-line px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-brand-gray">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-cream">{formatPrice(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span className="font-semibold">−{formatPrice(totals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-gray">
                  <span>Delivery</span>
                  <span className="font-semibold text-brand-cream">
                    {totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-dashed border-ink-line pt-1.5 text-base font-extrabold text-brand-cream">
                  <span>Total</span>
                  <span className="text-brand-yellow">{formatPrice(totals.total)}</span>
                </div>
              </div>
              <Button href="/cart" variant="outline" size="full" onClick={closeCart}>
                View Cart
              </Button>
              <Button variant="primary" size="full" onClick={goCheckout}>
                Checkout <ArrowRight size={18} />
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

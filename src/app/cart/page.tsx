"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartItemView } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import { TicketPercent, Plus, Trash2 } from "lucide-react";
import { coupons } from "@/data/cafe";
import { getItemById } from "@/data/menu";
import {
  getSavedCouponCode,
  saveCouponCode,
  clearCouponCode,
  validateCoupon,
  getSubtotal,
} from "@/lib/utils";
import type { Coupon } from "@/data/cafe";
import { useToast } from "@/components/ui/Toast";
import { FreeDeliveryProgress } from "@/components/ui/FreeDeliveryProgress";

const priceLookup = (id: string) => getItemById(id)?.price ?? 0;

export function EmptyCartView() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="grid h-28 w-28 place-items-center rounded-full bg-brand-yellow/10 text-brand-yellow">
        <span className="text-5xl">🍕</span>
      </div>
      <h1 className="font-display text-2xl font-black text-brand-cream sm:text-3xl">
        Your cart is hungry
      </h1>
      <p className="max-w-sm text-brand-gray">
        Fill it up with some cheesy goodness from our menu.
      </p>
      <Button href="/menu" variant="primary" size="lg" className="mt-3">
        Find Something Cheesy
      </Button>
    </div>
  );
}

function ClearConfirm({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-ink-line bg-ink-card p-6 text-center shadow-lift">
        <h3 className="font-display text-lg font-bold text-brand-cream">
          Remove all items?
        </h3>
        <p className="mt-2 text-sm text-brand-gray">
          This will empty your cart and remove any applied coupon.
        </p>
        <div className="mt-5 flex gap-2">
          <Button variant="outline" size="full" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" size="full" onClick={onConfirm}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const [coupon, setCoupon] = useState<Coupon | null>(
    () => coupons.find((c) => c.id === getSavedCouponCode()) ?? null
  );
  const [input, setInput] = useState(getSavedCouponCode());
  const [msg, setMsg] = useState("");
  const [showClear, setShowClear] = useState(false);

  const subtotal = useMemo(() => getSubtotal(cart, priceLookup), [cart]);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-black uppercase text-brand-cream sm:text-4xl">
            Your Cart
          </h1>
        </div>
        <EmptyCartView />
      </div>
    );
  }

  const itemCount = cart.reduce((s, c) => s + c.quantity, 0);

  const applyCoupon = () => {
    const result = validateCoupon(input, subtotal, coupons);
    setMsg(result.message);
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-yellow">
          Review your order
        </p>
        <h1 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-4xl">
          Your Cart ({itemCount})
        </h1>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <FreeDeliveryProgress subtotal={subtotal} />
          <ul className="mt-4 space-y-4">
            {cart.map((item) => (
              <CartItemView key={item.productId + JSON.stringify(item.customizations)} item={item} />
            ))}
          </ul>

          <Button href="/menu" variant="secondary" size="full" className="mt-4">
            <Plus size={18} /> Add More Items
          </Button>

          <div className="card-dark mt-4 p-5">
            <h2 className="font-display flex items-center gap-2 text-base font-bold text-brand-cream">
              <TicketPercent size={18} className="text-brand-yellow" /> Have a coupon?
            </h2>
            <div className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                placeholder="Enter code e.g. CHEESY10"
                aria-label="Coupon code"
                className="input-dark min-w-0 flex-1 font-semibold uppercase"
              />
              <Button variant="primary" onClick={applyCoupon}>
                Apply
              </Button>
            </div>
            {msg && <p className="mt-2 text-xs font-medium text-brand-gray">{msg}</p>}
            {coupon && (
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs font-bold text-green-500">
                  {coupon.id} applied — {coupon.label} off
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCoupon(null);
                    clearCouponCode();
                    setMsg("");
                    toast("Coupon removed");
                  }}
                  className="text-xs text-brand-gray hover:text-brand-red"
                >
                  Remove
                </button>
              </div>
            )}
            <p className="mt-3 text-xs text-brand-gray">
              Try <span className="font-bold text-brand-yellow">CHEESY10</span> or{" "}
              <span className="font-bold text-brand-yellow">WELCOME50</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowClear(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gray hover:text-brand-red"
          >
            <Trash2 size={14} /> Clear Cart
          </button>
        </div>

        <div className="lg:sticky lg:top-20">
          <CartSummary lines={cart} isDelivery={false} coupon={coupon} />
        </div>
      </div>

      {showClear && (
        <ClearConfirm
          onConfirm={() => {
            clearCart();
            setCoupon(null);
            clearCouponCode();
            setShowClear(false);
            toast("Cart cleared");
          }}
          onCancel={() => setShowClear(false)}
        />
      )}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import {
  formatPrice,
  getDeliveryFee,
  getTax,
  getTotal,
} from "@/lib/utils";
import { storeConfig } from "@/data/cafe";

export function CartSummary({
  subtotal,
  isDelivery,
}: {
  subtotal: number;
  isDelivery: boolean;
}) {
  const delivery = getDeliveryFee(subtotal, isDelivery);
  const tax = getTax(subtotal);
  const total = getTotal(subtotal, tax, delivery);

  return (
    <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-card">
      <h2 className="text-lg font-extrabold uppercase tracking-wide text-brand-charcoal">
        Order Summary
      </h2>
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between text-brand-gray">
          <span>Subtotal</span>
          <span className="font-semibold text-brand-charcoal">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-brand-gray">
          <span>Tax ({Math.round(storeConfig.taxRate * 100)}%)</span>
          <span className="font-semibold text-brand-charcoal">
            {formatPrice(tax)}
          </span>
        </div>
        <div className="flex justify-between text-brand-gray">
          <span>Delivery</span>
          <span className="font-semibold text-brand-charcoal">
            {delivery === 0 ? "FREE" : formatPrice(delivery)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-brand-border pt-3 text-lg font-black text-brand-charcoal">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      <Button href="/checkout" variant="primary" size="full" className="mt-5">
        Proceed to Checkout
      </Button>
      <Button href="/menu" variant="ghost" size="full" className="mt-2">
        Continue Shopping
      </Button>
    </div>
  );
}

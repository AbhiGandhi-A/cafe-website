"use client";

import { Button } from "@/components/ui/Button";
import { calculateTotals } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { getItemById } from "@/data/menu";
import { storeConfig } from "@/data/cafe";
import type { CartLine } from "@/lib/cart";
import type { Coupon } from "@/data/cafe";

export function CartSummary({
  lines,
  isDelivery,
  coupon,
}: {
  lines: CartLine[];
  isDelivery: boolean;
  coupon: Coupon | null;
}) {
  const lookup = (id: string) => getItemById(id)?.price ?? 0;
  const totals = calculateTotals(lines, lookup, isDelivery, coupon);

  return (
    <div className="card-dark p-6">
      <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-cream">
        Order Summary
      </h2>
      <div className="mt-4 space-y-3 text-sm">
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
          <span>Tax ({Math.round(storeConfig.taxRate * 100)}%)</span>
          <span className="font-semibold text-brand-cream">{formatPrice(totals.tax)}</span>
        </div>
        <div className="flex justify-between text-brand-gray">
          <span>Delivery</span>
          <span className="font-semibold text-brand-cream">
            {totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-ink-line pt-3 text-lg font-black text-brand-cream">
          <span>Total</span>
          <span className="text-brand-yellow">{formatPrice(totals.total)}</span>
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

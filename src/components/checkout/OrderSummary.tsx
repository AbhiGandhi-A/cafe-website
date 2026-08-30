"use client";

import { getItemById } from "@/data/menu";
import { classNames, formatPrice } from "@/lib/utils";

export function OrderSummaryView({
  lines,
  subtotal,
  delivery,
  tax,
  total,
  paymentLabel,
}: {
  lines: { productId: string; quantity: number }[];
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  paymentLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-card">
      <h2 className="text-lg font-extrabold uppercase tracking-wide text-brand-charcoal">
        Your Order
      </h2>

      <div className="mt-4 space-y-3">
        {lines.map((line) => {
          const product = getItemById(line.productId);
          if (!product) return null;
          return (
            <div key={line.productId} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-yellow text-xs font-black text-brand-charcoal">
                {line.quantity}
              </span>
              <span className="flex-1 truncate text-sm font-semibold text-brand-charcoal">
                {product.name}
              </span>
              <span className="text-sm font-bold text-brand-charcoal">
                {formatPrice(product.price * line.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-dashed border-brand-border pt-4 text-sm">
        <div className="flex justify-between text-brand-gray">
          <span>Subtotal</span>
          <span className="font-semibold text-brand-charcoal">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-brand-gray">
          <span>Tax</span>
          <span className="font-semibold text-brand-charcoal">
            {formatPrice(tax)}
          </span>
        </div>
        <div className="flex justify-between text-brand-gray">
          <span>Delivery Fee</span>
          <span
            className={classNames(
              "font-semibold",
              delivery === 0 ? "text-green-700" : "text-brand-charcoal"
            )}
          >
            {delivery === 0 ? "FREE" : formatPrice(delivery)}
          </span>
        </div>
        <div className="flex justify-between border-t border-dashed border-brand-border pt-3 text-lg font-black text-brand-charcoal">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between pt-1 text-sm">
          <span className="text-brand-gray">Payment</span>
          <span className="font-bold capitalize text-brand-charcoal">
            {paymentLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

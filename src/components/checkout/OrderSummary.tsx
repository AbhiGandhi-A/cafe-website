"use client";

import { getItemById } from "@/data/menu";
import { classNames, formatPrice } from "@/lib/utils";

export function OrderSummaryView({
  lines,
  subtotal,
  discount,
  delivery,
  tax,
  total,
  couponLabel,
  paymentLabel,
}: {
  lines: { productId: string; quantity: number; customizations?: { label: string; price: number }[] }[];
  subtotal: number;
  discount: number;
  delivery: number;
  tax: number;
  total: number;
  couponLabel?: string;
  paymentLabel: string;
}) {
  return (
    <div className="card-dark p-6">
      <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-cream">
        Your Order
      </h2>

      <div className="mt-4 space-y-3">
        {lines.map((line, idx) => {
          const product = getItemById(line.productId);
          if (!product) return null;
          const unit = product.price + (line.customizations ?? []).reduce((s, c) => s + c.price, 0);
          return (
            <div key={line.productId + idx} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-yellow text-xs font-black text-ink-dark">
                {line.quantity}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-brand-cream">{product.name}</p>
                {(line.customizations ?? []).length > 0 && (
                  <p className="truncate text-[11px] text-brand-gray">
                    {line.customizations!.map((c) => c.label).join(", ")}
                  </p>
                )}
              </div>
              <span className="text-sm font-bold text-brand-cream">
                {formatPrice(unit * line.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-dashed border-ink-line pt-4 text-sm">
        <div className="flex justify-between text-brand-gray">
          <span>Subtotal</span>
          <span className="font-semibold text-brand-cream">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>{couponLabel ? `${couponLabel} (${discount > 0 ? "applied)" : ")"}` : "Discount"}</span>
            <span className="font-semibold">−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-brand-gray">
          <span>Tax</span>
          <span className="font-semibold text-brand-cream">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-brand-gray">
          <span>Delivery Fee</span>
          <span className={classNames("font-semibold", delivery === 0 ? "text-green-500" : "text-brand-cream")}>
            {delivery === 0 ? "FREE" : formatPrice(delivery)}
          </span>
        </div>
        <div className="flex justify-between border-t border-dashed border-ink-line pt-3 text-lg font-black text-brand-cream">
          <span>Total</span>
          <span className="text-brand-yellow">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between pt-1 text-sm">
          <span className="text-brand-gray">Payment</span>
          <span className="font-bold capitalize text-brand-cream">{paymentLabel}</span>
        </div>
      </div>
    </div>
  );
}

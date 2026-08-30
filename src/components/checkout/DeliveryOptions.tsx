"use client";

import { ShoppingBag, Bike } from "lucide-react";
import { classNames } from "@/lib/utils";
import { storeConfig } from "@/data/cafe";

export function DeliveryOptions({
  value,
  onChange,
  subtotal,
}: {
  value: "pickup" | "delivery";
  onChange: (v: "pickup" | "delivery") => void;
  subtotal: number;
}) {
  const options = [
    {
      id: "pickup" as const,
      icon: ShoppingBag,
      title: "Pickup",
      desc: "Collect your order from the cafe.",
      meta: "FREE",
      metaTone: "text-green-700",
    },
    {
      id: "delivery" as const,
      icon: Bike,
      title: "Delivery",
      desc: "Get it delivered to your doorstep.",
      meta:
        subtotal >= storeConfig.freeDeliveryAbove
          ? "FREE"
          : `₹${storeConfig.deliveryFee}`,
      metaTone:
        subtotal >= storeConfig.freeDeliveryAbove
          ? "text-green-700"
          : "text-brand-gray",
    },
  ];

  return (
    <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-card">
      <h2 className="text-lg font-extrabold uppercase tracking-wide text-brand-charcoal">
        Order Type
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map(({ id, icon: Icon, title, desc, meta, metaTone }) => {
          const selected = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={selected}
              className={classNames(
                "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
                selected
                  ? "border-brand-charcoal bg-brand-yellow/15"
                  : "border-brand-border hover:border-brand-charcoal/40"
              )}
            >
              <span
                className={classNames(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
                  selected
                    ? "bg-brand-charcoal text-brand-yellow"
                    : "bg-black/5 text-brand-charcoal"
                )}
              >
                <Icon size={24} />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2 font-extrabold text-brand-charcoal">
                  {title}
                  <span className={classNames("text-xs font-bold", metaTone)}>
                    {meta}
                  </span>
                </span>
                <span className="text-sm text-brand-gray">{desc}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

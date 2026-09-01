"use client";

import { Store, Bike } from "lucide-react";
import { classNames, formatPrice } from "@/lib/utils";
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
  const deliveryFree = subtotal >= storeConfig.freeDeliveryAbove;

  const options = [
    {
      id: "pickup" as const,
      icon: Store,
      title: "Pickup",
      desc: "Pick up from cafe",
      meta: "FREE",
      metaTone: "text-green-500",
    },
    {
      id: "delivery" as const,
      icon: Bike,
      title: "Delivery",
      desc: "Delivered to your address",
      meta: deliveryFree ? "FREE" : `${formatPrice(storeConfig.deliveryFee)} or FREE above ${formatPrice(storeConfig.freeDeliveryAbove)}`,
      metaTone: deliveryFree ? "text-green-500" : "text-brand-gray",
    },
  ];

  return (
    <div className="card-dark p-6">
      <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-cream">
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
                "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                selected
                  ? "border-brand-yellow bg-brand-yellow/10"
                  : "border-ink-line hover:border-white/30"
              )}
            >
              <span
                className={classNames(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors",
                  selected ? "bg-brand-yellow text-ink-dark" : "bg-ink-charcoal text-brand-cream"
                )}
              >
                <Icon size={24} />
              </span>
              <span className="flex-1">
                <span className="block font-extrabold text-brand-cream">{title}</span>
                <span className="text-sm text-brand-gray">{desc}</span>
                <span className={classNames("mt-0.5 block text-xs font-bold", metaTone)}>
                  {meta}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

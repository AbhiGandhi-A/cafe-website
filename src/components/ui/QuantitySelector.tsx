"use client";

import { Minus, Plus } from "lucide-react";
import { classNames } from "@/lib/utils";

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  small = false,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  small?: boolean;
}) {
  const btnSize = small ? "h-7 w-7" : "h-9 w-9";
  const textSize = small ? "text-sm" : "text-base";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-ink-line bg-ink-charcoal">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className={classNames(
          btnSize,
          "grid place-items-center rounded-full text-brand-cream transition-colors hover:bg-white/10 hover:text-brand-yellow active:scale-90 disabled:opacity-30"
        )}
        disabled={quantity <= 1}
      >
        <Minus size={small ? 14 : 16} strokeWidth={3} />
      </button>
      <span
        className={classNames(
          textSize,
          "w-6 text-center font-bold tabular-nums text-brand-cream"
        )}
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className={classNames(
          btnSize,
          "grid place-items-center rounded-full text-brand-cream transition-colors hover:bg-white/10 hover:text-brand-yellow active:scale-90"
        )}
      >
        <Plus size={small ? 14 : 16} strokeWidth={3} />
      </button>
    </div>
  );
}

export function AddToCartButton({
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  size = "md",
}: {
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md";
}) {
  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={classNames(
          "inline-flex items-center gap-1 rounded-full bg-brand-yellow font-bold text-ink-dark transition-all hover:bg-brand-yellow-light hover:-translate-y-0.5 active:scale-95",
          size === "sm" ? "px-3.5 py-1.5 text-sm" : "px-5 py-2.5 text-sm"
        )}
      >
        + Add
      </button>
    );
  }
  return (
    <QuantitySelector
      small={size === "sm"}
      quantity={quantity}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    />
  );
}

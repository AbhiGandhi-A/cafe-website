"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "./Button";

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
    <div className="inline-flex items-center gap-1 rounded-full border-2 border-brand-charcoal bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className={`${btnSize} grid place-items-center rounded-full text-brand-charcoal transition-colors hover:bg-brand-charcoal hover:text-brand-yellow active:scale-90`}
      >
        <Minus size={small ? 14 : 16} strokeWidth={3} />
      </button>
      <span
        className={`${textSize} w-6 text-center font-bold tabular-nums text-brand-charcoal`}
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className={`${btnSize} grid place-items-center rounded-full text-brand-charcoal transition-colors hover:bg-brand-charcoal hover:text-brand-yellow active:scale-90`}
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
      <Button size={size} onClick={onAdd}>
        + Add
      </Button>
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

"use client";

import { Trash2 } from "lucide-react";
import { getItemById } from "@/data/menu";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatPrice } from "@/lib/utils";
import { useCart, getLineKey } from "@/context/CartContext";
import type { CartLine } from "@/lib/cart";

export function CartItemView({ item }: { item: CartLine }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const product = getItemById(item.productId);
  if (!product) return null;
  const key = getLineKey(item.productId, item.customizations);
  const unit = product.price + item.customizations.reduce((s, c) => s + c.price, 0);

  return (
    <li className="flex flex-col gap-4 rounded-3xl border border-ink-line bg-ink-card p-4 shadow-card sm:flex-row sm:items-center">
      <ProductImage
        src={product.image}
        alt={product.name}
        category={product.category}
        className="h-32 w-full shrink-0 rounded-2xl sm:h-24 sm:w-24"
      />
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-yellow">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-extrabold text-brand-cream">
            {product.name}
          </h3>
          {item.customizations.length > 0 && (
            <p className="mt-0.5 text-xs text-brand-gray">
              {item.customizations.map((c) => c.label).join(", ")}
            </p>
          )}
          <p className="mt-0.5 text-xl font-black text-brand-yellow">
            {formatPrice(unit)}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 sm:mt-0">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => increaseQuantity(key)}
            onDecrease={() => decreaseQuantity(key)}
          />
          <div className="text-right">
            <p className="text-xs text-brand-gray">Item total</p>
            <p className="font-extrabold text-brand-cream">{formatPrice(unit * item.quantity)}</p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${product.name}`}
            onClick={() => removeFromCart(key)}
            className="grid h-10 w-10 place-items-center rounded-full text-brand-gray transition-colors hover:bg-brand-red/10 hover:text-brand-red"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </li>
  );
}

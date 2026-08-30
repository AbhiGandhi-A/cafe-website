"use client";

import { Trash2 } from "lucide-react";
import { getItemById } from "@/data/menu";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export function CartItemView({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const product = getItemById(productId);
  if (!product) return null;

  return (
    <li className="flex flex-col gap-4 rounded-3xl border border-brand-border bg-white p-4 shadow-card sm:flex-row sm:items-center">
      <ProductImage
        src={product.image}
        alt={product.name}
        category={product.category}
        className="h-32 w-full shrink-0 rounded-2xl sm:h-24 sm:w-24"
      />
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            {product.category}
          </p>
          <h3 className="text-lg font-extrabold text-brand-charcoal">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xl font-black text-brand-charcoal">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 sm:mt-0">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => increaseQuantity(productId)}
            onDecrease={() => decreaseQuantity(productId)}
          />
          <div className="text-right">
            <p className="text-xs text-brand-gray">Item total</p>
            <p className="font-extrabold text-brand-charcoal">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${product.name}`}
            onClick={() => removeFromCart(productId)}
            className="grid h-10 w-10 place-items-center rounded-full text-brand-gray transition-colors hover:bg-brand-red/10 hover:text-brand-red"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </li>
  );
}

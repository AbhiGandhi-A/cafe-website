"use client";

import { Star, Leaf } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { ProductImage } from "./ProductImage";
import { Badge } from "./Badge";
import { AddToCartButton } from "./QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useToast } from "./Toast";
import { formatPrice } from "@/lib/utils";

export function ProductCard({
  item,
  compact = false,
}: {
  item: MenuItem;
  compact?: boolean;
}) {
  const { addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const { toast } = useToast();
  const line = useCartItemQuantity(item.id);

  const handleAdd = () => {
    addToCart(item.id);
    toast(`${item.name} added to cart!`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative">
        <ProductImage
          src={item.image}
          alt={item.name}
          category={item.category}
          className={compact ? "aspect-[4/3]" : "aspect-[16/11]"}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone="cream">{item.category}</Badge>
        </div>
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {item.popular && <Badge tone="red">Best Seller</Badge>}
          {item.vegetarian && (
            <span
              title="Vegetarian"
              className="grid h-6 w-6 place-items-center rounded-full bg-white shadow"
            >
              <Leaf size={14} className="text-green-700" />
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={
                  i < Math.round(item.rating)
                    ? "fill-brand-yellow text-brand-yellow"
                    : "fill-brand-border text-brand-border"
                }
              />
            ))}
          </div>
          <span className="text-xs text-brand-gray">{item.rating.toFixed(1)}</span>
        </div>

        <h3 className="mt-1.5 text-lg font-extrabold leading-snug text-brand-charcoal">
          {item.name}
        </h3>
        <p
          className={`mt-1 text-sm leading-relaxed text-brand-gray ${
            compact ? "line-clamp-2" : "line-clamp-2"
          }`}
        >
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 pt-2">
          <span className="text-xl font-black text-brand-charcoal">
            {formatPrice(item.price)}
            <span className="ml-1 text-xs font-semibold text-brand-gray">INR</span>
          </span>
          <AddToCartButton
            size="sm"
            quantity={line || 0}
            onAdd={handleAdd}
            onIncrease={() => {
              increaseQuantity(item.id);
              toast(`${item.name} added to cart!`);
            }}
            onDecrease={() => decreaseQuantity(item.id)}
          />
        </div>
      </div>
    </article>
  );
}

function useCartItemQuantity(productId: string): number {
  const { cart } = useCart();
  const line = cart.find((item) => item.productId === productId);
  return line ? line.quantity : 0;
}

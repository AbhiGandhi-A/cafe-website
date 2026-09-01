"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatPrice } from "@/lib/utils";
import { useCart, getLineKey } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { ProductModal } from "@/components/ui/ProductModal";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function MenuListRow({ item }: { item: MenuItem }) {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    favorites,
    toggleFavorite,
    trackRecentlyViewed,
  } = useCart();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const line = cart.find(
    (c) => getLineKey(c.productId, c.customizations) === getLineKey(item.id)
  );
  const isFav = favorites.includes(item.id);
  const unavailable = item.available === false;

  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl border border-ink-line bg-ink-card p-3">
        <button
          type="button"
          onClick={() => {
            trackRecentlyViewed(item.id);
            setOpen(true);
          }}
          className="shrink-0"
        >
          <ProductImage
            src={item.image}
            alt={item.name}
            category={item.category}
            className="h-16 w-16 rounded-xl"
          />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => {
              trackRecentlyViewed(item.id);
              setOpen(true);
            }}
            className="block truncate text-left font-semibold text-brand-cream hover:text-brand-yellow"
          >
            {item.name}
          </button>
          <p className="truncate text-xs text-brand-gray">{item.description}</p>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="font-black text-brand-yellow">{formatPrice(item.price)}</span>
            <span className="text-brand-gray">★ {item.rating.toFixed(1)}</span>
            {unavailable && <span className="font-bold text-brand-red">Unavailable</span>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label="Toggle favourite"
            onClick={() => {
              const added = toggleFavorite(item.id);
              toast(added ? "Added to favourites" : "Removed from favourites");
            }}
            className="grid h-9 w-9 place-items-center rounded-full text-brand-gray hover:text-brand-red"
          >
            <Heart size={18} className={isFav ? "fill-brand-red text-brand-red" : ""} />
          </button>
          {unavailable ? null : line && line.quantity > 0 ? (
            <QuantitySelector
              small
              quantity={line.quantity}
              onIncrease={() => {
                increaseQuantity(getLineKey(item.id));
                toast(`${item.name} added`);
              }}
              onDecrease={() => decreaseQuantity(getLineKey(item.id))}
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                addToCart(item.id, 1, []);
                toast(`${item.name} added to cart`);
              }}
              className="rounded-full bg-brand-yellow px-3 py-1.5 text-xs font-bold text-ink-dark hover:bg-brand-yellow-light active:scale-95"
            >
              Add
            </button>
          )}
        </div>
      </div>
      {open && <ProductModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}

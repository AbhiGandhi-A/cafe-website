"use client";

import { useState } from "react";
import { Star, Leaf, Heart } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { ProductImage } from "./ProductImage";
import { Badge } from "./Badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "./Toast";
import { formatPrice, classNames } from "@/lib/utils";
import { getLineKey } from "@/context/CartContext";
import { ProductModal } from "./ProductModal";
import { QuantitySelector } from "./QuantitySelector";

function DataBadge({ item }: { item: MenuItem }) {
  if (item.bestseller) return <Badge tone="red">Bestseller</Badge>;
  if (item.newItem) return <Badge tone="new">New</Badge>;
  if (item.popular) return <Badge tone="hot">Hot</Badge>;
  return null;
}

export function ProductCard({
  item,
  compact = false,
}: {
  item: MenuItem;
  compact?: boolean;
}) {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    cart,
    favorites,
    toggleFavorite,
    trackRecentlyViewed,
  } = useCart();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  const isFav = favorites.includes(item.id);
  const line = cart.find((c) => getLineKey(c.productId, c.customizations) === getLineKey(item.id));

  const openDetails = () => {
    trackRecentlyViewed(item.id);
    setModalOpen(true);
  };

  const handleAdd = () => {
    if (item.available === false) return;
    addToCart(item.id, 1, []);
    toast(`${item.name} added to cart`);
  };

  const unavailable = item.available === false;

  return (
    <>
      <article
        className={classNames(
          "group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-lift",
          unavailable && "opacity-70"
        )}
      >
        <button
          type="button"
          onClick={openDetails}
          className="relative block cursor-pointer text-left"
          aria-label={`View ${item.name}`}
        >
          <ProductImage
            src={item.image}
            alt={item.name}
            category={item.category}
            className={compact ? "aspect-[4/3]" : "aspect-[16/11]"}
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <DataBadge item={item} />
          </div>
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
            {item.vegetarian && (
              <span
                title="Vegetarian"
                className="grid h-6 w-6 place-items-center rounded-full border border-green-500 bg-ink-dark"
              >
                <Leaf size={14} className="text-green-500" />
              </span>
            )}
          </div>
        </button>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-xs font-semibold text-brand-gray">
              <Star size={13} className="fill-brand-yellow text-brand-yellow" />
              {item.rating.toFixed(1)}
            </span>
          </div>

          <button
            type="button"
            onClick={openDetails}
            className="mt-1.5 text-left font-display text-[17px] font-bold leading-snug text-brand-cream transition-colors hover:text-brand-yellow"
          >
            {item.name}
          </button>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-brand-gray">
            {item.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-2 pt-2">
            <span className="text-lg font-black text-brand-yellow">
              {formatPrice(item.price)}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                onClick={() => {
                  const added = toggleFavorite(item.id);
                  toast(added ? "Added to favourites" : "Removed from favourites");
                }}
                className="grid h-9 w-9 place-items-center rounded-full border border-ink-line text-brand-gray transition-all hover:border-brand-red/50 hover:text-brand-red active:scale-90"
              >
                <Heart
                  size={17}
                  className={isFav ? "fill-brand-red text-brand-red" : ""}
                />
              </button>
              {unavailable ? (
                <span className="text-xs font-bold text-brand-red">
                  Unavailable
                </span>
              ) : line && line.quantity > 0 ? (
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
                  onClick={handleAdd}
                  className="rounded-full bg-brand-yellow px-3.5 py-1.5 text-sm font-bold text-ink-dark transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-light active:scale-95"
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        </div>
      </article>

      {modalOpen && <ProductModal item={item} onClose={() => setModalOpen(false)} />}
    </>
  );
}

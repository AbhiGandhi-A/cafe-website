"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Heart,
  Leaf,
  Flame,
  Minus,
  Plus,
  ShoppingBag,
  Check,
} from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { getCustomizationOptions } from "@/data/customizations";
import { ProductImage } from "./ProductImage";
import { Badge } from "./Badge";
import { formatPrice, lineUnitPrice, classNames } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "./Toast";

const spiceLabels: Record<string, string> = {
  none: "Mild",
  mild: "Mild",
  medium: "Medium",
  hot: "Hot",
};

function SpiceIndicator({ level }: { level: string }) {
  if (!level) return null;
  const count = level === "mild" ? 1 : level === "medium" ? 2 : level === "hot" ? 3 : 0;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-cream/80">
      <Flame size={14} className="text-brand-red" />
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={classNames(
            "h-2 w-2 rounded-full",
            i < count ? "bg-brand-red" : "bg-white/15"
          )}
        />
      ))}
      {spiceLabels[level]}
    </span>
  );
}

export function ProductModal({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const { addToCart, favorites, toggleFavorite } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const options = useMemo(() => getCustomizationOptions(item.category), [item.category]);
  const customizations = options
    .filter((o) => selected.includes(o.code))
    .map((o) => ({ code: o.code, label: o.label, price: o.price }));
  const unit = lineUnitPrice(item.price, customizations);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  const isFav = favorites.includes(item.id);
  const unavailable = item.available === false;

  const toggleOpt = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const addToCartHandler = () => {
    if (unavailable) return;
    addToCart(item.id, qty, customizations);
    toast(`${item.name} added to cart`);
    onClose();
  };

  const groups = options.reduce<string[]>((acc, o) => {
    if (o.group && !acc.includes(o.group)) acc.push(o.group);
    return acc;
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      <div
        className="absolute inset-0 animate-overlay-in bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg animate-pop flex-col overflow-hidden rounded-t-3xl bg-ink-dark shadow-lift md:rounded-3xl">
        <div className="relative">
          <ProductImage
            src={item.image}
            alt={item.name}
            category={item.category}
            className="aspect-[16/9] w-full"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.vegetarian && (
              <Badge tone="green">
                <Leaf size={12} /> Veg
              </Badge>
            )}
            {item.bestseller && <Badge tone="red">Bestseller</Badge>}
            {item.newItem && <Badge tone="new">New</Badge>}
          </div>
          <button
            type="button"
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            onClick={() => {
              const added = toggleFavorite(item.id);
              toast(added ? "Added to favourites" : "Removed from favourites");
            }}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-transform hover:scale-110 active:scale-95"
          >
            <Heart
              size={20}
              className={isFav ? "fill-brand-red text-brand-red" : "text-white"}
            />
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 md:bottom-auto md:top-3 md:right-3 md:left-auto"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-gray">
            <span>{item.category}</span>
          </div>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-brand-cream">
              {item.name}
            </h2>
            <span className="shrink-0 text-xl font-black text-brand-yellow">
              {formatPrice(item.price)}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-brand-gray">
            {item.description}
          </p>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="font-semibold text-brand-yellow">
              ★ {item.rating.toFixed(1)}
            </span>
            {item.spiceLevel && <SpiceIndicator level={item.spiceLevel} />}
            {unavailable && (
              <span className="font-bold text-brand-red">Currently Unavailable</span>
            )}
          </div>

          {options.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-brand-cream/80">
                Customize
              </h3>
              <div className="mt-3 space-y-3">
                {groups.map((group) => (
                  <div key={group}>
                    <p className="text-xs font-semibold uppercase text-brand-gray">
                      {group}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {options
                        .filter((o) => o.group === group)
                        .map((o) => {
                          const on = selected.includes(o.code);
                          return (
                            <button
                              key={o.code}
                              type="button"
                              onClick={() => toggleOpt(o.code)}
                              aria-pressed={on}
                              className={classNames(
                                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                                on
                                  ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow"
                                  : "border-ink-line bg-ink-card text-brand-cream/80 hover:border-white/30"
                              )}
                            >
                              {on && <Check size={13} />}
                              {o.label}
                              {o.price > 0 && (
                                <span className="text-brand-yellow">
                                  +{formatPrice(o.price)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-ink-line bg-ink-card px-5 py-4">
          <div className="inline-flex items-center gap-1 rounded-full border border-ink-line bg-ink-dark p-1">
            <button
              type="button"
              aria-label="Decrease"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10 active:scale-90"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center text-base font-bold tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Increase"
              onClick={() => setQty((q) => q + 1)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10 active:scale-90"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={addToCartHandler}
            disabled={unavailable}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-3 font-bold text-ink-dark transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-light active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <ShoppingBag size={18} />
            {unavailable
              ? "Currently Unavailable"
              : `Add ${qty} — ${formatPrice(unit * qty)}`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

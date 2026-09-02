"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getItemById, menuItems } from "@/data/menu";
import { ProductCard } from "@/components/ui/ProductCard";

const featuredIds = [
  "veg-cheese-grill-sandwich",
  "crazy-cheesy-veggie-delight-pizza",
  "fried-momo-full",
  "oreo-shake",
];

export function BestSellers() {
  const items = featuredIds
    .map((id) => getItemById(id))
    .filter(Boolean)
    .concat(menuItems.filter((m) => m.popular))
    .slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-ink-dark py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* Left Side Header and Call to Action */}
          <div className="text-center lg:text-left">
            <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-yellow lg:justify-start">
              <Sparkles size={14} className="text-brand-yellow" /> CUSTOMER FAVOURITES
            </p>
            <h2 className="font-display mt-2 text-3xl font-black uppercase text-brand-cream sm:text-4xl lg:text-5xl">
              Best <br className="hidden lg:block" />
              <span className="relative inline-block text-brand-yellow">
                Sellers
                <span className="absolute -right-6 -top-3 text-xl">??</span>
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-gray">
              The most loved picks by our cheese lovers.
            </p>
            <div className="mt-6">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3.5 text-sm font-black text-ink-dark shadow-soft transition-all hover:bg-brand-yellow-light hover:shadow-glow active:scale-95"
              >
                View Full Menu
                <span className="transition-transform group-hover:translate-x-1">?</span>
              </Link>
            </div>
          </div>

          {/* Right Side 4-card Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              item ? <ProductCard key={item.id} item={item} compact /> : null
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

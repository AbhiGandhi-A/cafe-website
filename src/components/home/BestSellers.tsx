"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Crown } from "lucide-react";
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
    <section className="relative overflow-hidden bg-[#090909] py-14 sm:py-20 text-white">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr] lg:gap-12 xl:grid-cols-[320px_1fr]">
          {/* Left Side Header and Call to Action */}
          <div className="text-center lg:text-left">
            <p className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-yellow lg:justify-start sm:text-sm">
              <Sparkles size={14} className="text-brand-yellow" /> CUSTOMER FAVOURITES
            </p>
            <h2 className="font-display mt-2 text-4xl font-black uppercase text-white sm:text-5xl lg:text-6xl">
              Best <br className="hidden lg:block" />
              <span className="relative inline-block text-brand-yellow">
                Sellers
                <Crown size={28} className="absolute -right-8 -top-3 text-brand-yellow fill-brand-yellow hidden sm:inline-block" />
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-gray">
              The most loved picks by our cheese lovers.
            </p>
            <div className="mt-8">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-black text-[#090909] shadow-soft transition-all hover:bg-brand-yellow-light hover:shadow-glow active:scale-95"
              >
                View Full Menu
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Side 4-card Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
            {items.map((item) => (
              item ? <ProductCard key={item.id} item={item} compact /> : null
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

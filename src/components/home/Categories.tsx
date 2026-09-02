"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { getItemCountByCategory, images } from "@/data/menu";

const catImage: Record<string, string> = {
  sandwich: images.sandwich,
  "toast-sandwich": images.toast,
  "grill-sandwich": images.grill,
  "garlic-bread": images.garlic,
  "rimzim-special": images.rimzim,
  momos: images.momos,
  "crazy-cheesy-special": images.pizza,
  beverages: images.beverages,
  dessert: images.dessert,
};

export function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-ink-dark py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-yellow sm:text-sm">
              <Sparkles size={14} className="text-brand-yellow" /> EXPLORE OUR MENU
            </p>
            <h2 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-4xl lg:text-5xl">
              Find Your <span className="font-sans italic text-brand-yellow">Craving</span>
            </h2>
            <p className="mt-1 text-sm font-medium text-brand-gray sm:text-base">
              Delicious choices for every mood
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous categories"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-brand-cream transition-all hover:border-brand-yellow hover:bg-brand-yellow hover:text-ink-dark active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next categories"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-brand-cream transition-all hover:border-brand-yellow hover:bg-brand-yellow hover:text-ink-dark active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories Cards Carousel/Grid */}
        <div
          ref={scrollRef}
          className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-4 pt-2 sm:gap-5"
        >
          {categories.map((cat) => {
            const count = getItemCountByCategory(cat.id);
            const imgSrc = catImage[cat.id] ?? images.sandwich;
            return (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className="group relative flex min-w-[150px] shrink-0 flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-yellow/50 hover:bg-white/[0.08] hover:shadow-card sm:min-w-[170px] sm:p-5"
              >
                {/* Food Image Circular/Rounded container */}
                <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-ink-card shadow-soft sm:h-24 sm:w-24">
                  <Image
                    src={imgSrc}
                    alt={cat.name}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Category Name */}
                <h3 className="font-display text-sm font-black uppercase text-brand-cream transition-colors group-hover:text-brand-yellow sm:text-base">
                  {cat.name}
                </h3>

                {/* Item Count */}
                <p className="mt-0.5 text-xs font-semibold text-brand-gray">
                  {count} Items
                </p>

                {/* Bottom yellow accent pill */}
                <span className="mt-2.5 h-1 w-6 rounded-full bg-transparent transition-all group-hover:w-10 group-hover:bg-brand-yellow" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

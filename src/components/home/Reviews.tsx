"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote, Smile } from "lucide-react";

const reviews = [
  {
    name: "Aarav",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    quote: "The grill sandwich is amazing! So cheesy and full of flavour. My go-to cafe for quick bites.",
    rating: 5,
  },
  {
    name: "Neha",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "Absolutely love the momos and cold coffee. Great taste and quick service!",
    rating: 5,
  },
  {
    name: "Rohan",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    quote: "Best pizza in town! Fresh, cheesy and super delicious. Highly recommended!",
    rating: 5,
  },
];

export function Reviews() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="relative overflow-hidden bg-ink-dark py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-black uppercase text-brand-cream sm:text-4xl lg:text-5xl">
            What Our <span className="font-sans italic text-brand-yellow">Cheese Lovers</span> Say
          </h2>
          <p className="mt-2 text-sm text-brand-gray sm:text-base">
            Real cravings. Real happiness. Here's what our customers have to say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/40 hover:bg-white/[0.07]"
            >
              {/* Quote icon on top */}
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow">
                  <Quote size={18} className="rotate-180" />
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-brand-yellow text-brand-yellow"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm font-medium leading-relaxed text-brand-cream/90">
                ?{r.quote}?
              </p>

              {/* User Avatar & Name */}
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-brand-yellow/40">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-extrabold text-brand-cream">{r.name}</p>
                  <p className="text-[11px] font-semibold text-brand-yellow">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}

          {/* Happy Customers Sticker */}
          <div className="absolute -right-4 -top-8 hidden xl:block">
            <div className="flex items-center gap-2 rounded-2xl border border-brand-yellow/30 bg-ink-card p-3 shadow-lift">
              <Smile size={24} className="text-brand-yellow" />
              <div className="leading-tight">
                <p className="text-[11px] font-black uppercase text-brand-cream">Happy Customers</p>
                <p className="text-[10px] font-bold text-brand-yellow">Happier Us! ??</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setActiveDot(idx)}
              className={`h-2.5 rounded-full transition-all ${
                activeDot === idx ? "w-8 bg-brand-yellow" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

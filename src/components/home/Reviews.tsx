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
    <section className="relative overflow-hidden bg-[#FAF8F5] py-14 sm:py-20 text-[#111111]">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-black uppercase text-[#111111] sm:text-4xl lg:text-5xl">
            What Our <span className="font-sans italic text-[#D97706]">Cheese Lovers</span> Say
          </h2>
          <p className="mt-2 text-sm font-semibold text-[#6B7280] sm:text-base">
            Real cravings. Real happiness. Here&apos;s what our cheese lovers have to say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="relative flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC928] hover:shadow-card"
            >
              {/* Quote icon on top */}
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFC928]/20 text-[#B45309]">
                  <Quote size={18} className="rotate-180" />
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-[#FFC928] text-[#FFC928]"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm font-medium leading-relaxed text-[#374151]">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* User Avatar & Name */}
              <div className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#FFC928]">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-extrabold text-[#111111]">{r.name}</p>
                  <p className="text-[11px] font-bold text-[#B45309]">Verified Cheese Lover</p>
                </div>
              </div>
            </div>
          ))}

          {/* Happy Customers Sticker */}
          <div className="absolute -right-4 -top-8 hidden xl:block">
            <div className="flex items-center gap-2.5 rounded-2xl border border-black/10 bg-white p-3.5 shadow-lift">
              <Smile size={24} className="text-[#D97706]" />
              <div className="leading-tight">
                <p className="text-[11px] font-black uppercase text-[#111111]">Happy Customers</p>
                <p className="text-[10px] font-bold text-[#D97706]">Happier Us! &#128522;</p>
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
                activeDot === idx ? "w-8 bg-[#FFC928]" : "w-2.5 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

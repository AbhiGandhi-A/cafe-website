"use client";

import Image from "next/image";
import Link from "next/link";
import { Utensils, Sparkles, ShieldCheck, Clock, Heart, Flame } from "lucide-react";
import { images } from "@/data/menu";
import { cafeInfo } from "@/data/cafe";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Veg",
    desc: "Pure & Fresh",
  },
  {
    icon: Flame,
    title: "Freshly Prepared",
    desc: "Every Order",
  },
  {
    icon: Clock,
    title: "Quick Service",
    desc: "No Long Wait",
  },
  {
    icon: Heart,
    title: "Loved by Many",
    desc: `${cafeInfo.rating} Rating (${cafeInfo.reviewsCount} Reviews)`,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-dark text-brand-cream">
      {/* Background Ambience */}
      <div className="absolute inset-0 brand-dots opacity-30" aria-hidden />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-brand-yellow/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[450px] w-[450px] rounded-full bg-brand-red/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left Column Text */}
          <div className="text-center lg:text-left">
            {/* Tag / Script */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-yellow sm:text-sm">
              <Sparkles size={15} className="animate-spin text-brand-yellow" style={{ animationDuration: "8s" }} />
              <span>Good Food = Good Mood</span>
              <span className="text-sm">??</span>
            </div>

            {/* Giant Heading */}
            <h1 className="font-display mt-5 text-[2.8rem] font-black uppercase leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              CRAZY
              <br />
              <span className="text-brand-yellow">CHEESY</span>
              <br />
              <span className="relative inline-block text-white">
                CAFE
                <span className="absolute -right-7 -top-4 text-2xl sm:text-3xl">??</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-brand-cream/80 sm:text-lg lg:mx-0">
              Loaded sandwiches, pizzas, momos and cafe favourites made fresh for every craving.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-8 py-4 text-base font-black text-ink-dark shadow-glow transition-all hover:bg-brand-yellow-light hover:shadow-lift active:scale-95"
              >
                Order Now
                <span className="transition-transform group-hover:translate-x-1">?</span>
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-brand-cream backdrop-blur-md transition-all hover:border-brand-yellow hover:bg-white/10 active:scale-95"
              >
                <Utensils size={18} className="text-brand-yellow" />
                Explore Menu
              </Link>
            </div>
          </div>

          {/* Right Column Pizza with Cheese Pull */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative">
              {/* Image Container with Glow */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-yellow/25 bg-gradient-to-b from-ink-card to-ink-dark p-3 shadow-lift sm:p-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src={images.pizzaPull}
                    alt="Crazy Cheesy Cafe extra cheesy pizza pull"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/70 via-transparent to-transparent" />
                </div>

                {/* Badge: Extra Cheesy Always */}
                <div className="absolute -bottom-3 -right-2 grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-ink-dark bg-brand-yellow text-center font-black text-ink-dark shadow-lift sm:-bottom-4 sm:-right-4 sm:h-28 sm:w-28">
                  <div className="rotate-[-12deg] leading-tight">
                    <span className="block text-[11px] font-black uppercase tracking-wider sm:text-xs">EXTRA</span>
                    <span className="block text-sm font-black uppercase tracking-tight sm:text-base">CHEESY</span>
                    <span className="block text-[10px] font-extrabold sm:text-[11px]">Always!</span>
                  </div>
                </div>

                {/* Top overlay note */}
                <div className="absolute left-6 top-6 hidden rounded-2xl bg-ink-dark/80 px-3.5 py-2 backdrop-blur-md sm:block">
                  <p className="font-display text-xs font-bold text-brand-yellow">Pizza Makes Everything Better! ??</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Items Bar at Bottom */}
        <div className="mt-14 grid grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:gap-4 md:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 backdrop-blur-sm transition-all hover:border-brand-yellow/30 hover:bg-white/[0.06] sm:p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow">
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-brand-cream">{title}</p>
                <p className="truncate text-xs font-medium text-brand-gray">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

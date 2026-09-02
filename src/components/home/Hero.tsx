"use client";

import Image from "next/image";
import Link from "next/link";
import { Utensils, ShieldCheck, Clock, Heart, Flame, ArrowRight, Crown } from "lucide-react";
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
    <section className="relative overflow-hidden bg-[#090909] text-white">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 brand-dots opacity-20 pointer-events-none" aria-hidden />
      <div className="pointer-events-none absolute -right-16 -top-16 h-[550px] w-[550px] rounded-full bg-brand-yellow/12 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-[500px] w-[500px] rounded-full bg-brand-red/8 blur-[140px]" />

      <div className="relative mx-auto max-w-[1480px] px-4 pt-8 pb-14 sm:px-8 lg:px-12 lg:pt-12 lg:pb-18">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1.1fr] lg:gap-14">
          {/* Left Column Text */}
          <div className="text-center lg:text-left">
            {/* Handwritten / Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-yellow sm:text-sm">
              <span>GOOD FOOD &bull; GOOD MOOD</span>
              <Crown size={15} className="text-brand-yellow fill-brand-yellow" />
            </div>

            {/* Giant Heading */}
            <h1 className="font-display mt-5 text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl">
              CRAZY
              <br />
              <span className="text-brand-yellow">CHEESY</span>
              <br />
              <span className="relative inline-block text-white">
                CAFE
                <Crown size={36} className="absolute -right-10 -top-4 text-brand-yellow fill-brand-yellow hidden sm:inline-block" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-white/80 sm:text-lg lg:mx-0">
              Loaded sandwiches, cheesy pizzas, crispy momos and your favourite cafe bites &mdash; made fresh, made cheesy, made for you.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-yellow px-8 py-4 text-base font-black text-[#090909] shadow-glow transition-all hover:bg-brand-yellow-light hover:shadow-lift active:scale-95"
              >
                ORDER NOW
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-brand-yellow hover:bg-white/10 active:scale-95"
              >
                <Utensils size={18} className="text-brand-yellow" />
                EXPLORE MENU
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Pizza with Cheese Pull */}
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-yellow/30 bg-gradient-to-b from-[#171717] to-[#111111] p-3 shadow-lift sm:p-4">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem]">
                <Image
                  src={images.pizzaPull}
                  alt="Crazy Cheesy Cafe extra cheesy pizza pull"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Badge: Extra Cheesy Always */}
              <div className="absolute -bottom-3 -right-2 grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-[#090909] bg-brand-yellow text-center font-black text-[#090909] shadow-lift sm:-bottom-4 sm:-right-4 sm:h-28 sm:w-28">
                <div className="rotate-[-10deg] leading-tight">
                  <span className="block text-[10px] font-black uppercase tracking-wider sm:text-xs">EXTRA</span>
                  <span className="block text-sm font-black uppercase tracking-tight sm:text-base">CHEESY</span>
                  <span className="block text-[9px] font-extrabold sm:text-[11px]">Always!</span>
                </div>
              </div>

              {/* Top overlay note */}
              <div className="absolute left-6 top-6 hidden rounded-2xl bg-[#090909]/85 px-4 py-2 backdrop-blur-md sm:block border border-white/10">
                <p className="font-display text-xs font-bold text-brand-yellow">Pizza Makes Everything Better! &#127829;</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Items Bar at Bottom */}
        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:gap-4 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.04] p-4 backdrop-blur-sm transition-all hover:border-brand-yellow/30 hover:bg-white/[0.07]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow">
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-white">{title}</p>
                <p className="truncate text-xs font-medium text-brand-gray">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Utensils, ShoppingBag, Bike, ArrowRight } from "lucide-react";
import { images } from "@/data/menu";

const serviceModes = [
  {
    icon: Utensils,
    title: "Dine In",
    desc: "Relax & Enjoy",
  },
  {
    icon: ShoppingBag,
    title: "Take Away",
    desc: "Quick & Easy",
  },
  {
    icon: Bike,
    title: "Delivery",
    desc: "Straight to You",
  },
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#090909] py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-yellow/30 bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] p-6 shadow-lift sm:p-10 lg:p-12">
          {/* Background dots & glow */}
          <div className="absolute inset-0 brand-dots opacity-20 pointer-events-none" aria-hidden />
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-brand-yellow/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-brand-red/15 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1.4fr_1.2fr]">
            {/* Left Column: Offers Info */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-yellow">
                <Sparkles size={14} className="text-brand-yellow" /> Special Offers
              </div>
              <h2 className="font-display mt-2 text-2xl font-black uppercase leading-tight text-white sm:text-3xl lg:text-4xl">
                &amp; Combo Deals
              </h2>
              <p className="mt-2 text-sm text-brand-gray">
                Great Food Better Together
              </p>
              <div className="mt-6">
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3.5 text-sm font-black text-[#090909] shadow-soft transition-all hover:bg-brand-yellow-light hover:shadow-glow active:scale-95"
                >
                  View Offers
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Center Column: Combo Burger & Drink Image + 99 Badge */}
            <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={images.burger}
                  alt="Crazy Cheesy Cafe burger combo deal"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>

              {/* Combo starts at ?99 Seal */}
              <div className="absolute -top-3 -right-2 grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-[#090909] bg-brand-yellow text-center font-black text-[#090909] shadow-lift sm:h-22 sm:w-22">
                <div className="leading-tight">
                  <span className="block text-[9px] font-black uppercase">COMBO</span>
                  <span className="block text-[10px] font-bold">STARTS AT</span>
                  <span className="block text-base font-black">&#8377;99</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Service Modes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1">
              {serviceModes.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.04] p-3 text-center backdrop-blur-sm transition-all hover:border-brand-yellow/30 sm:p-4 lg:flex-row lg:text-left"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow sm:h-11 sm:w-11">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black uppercase text-white sm:text-sm">
                      {title}
                    </p>
                    <p className="truncate text-[11px] font-medium text-brand-gray">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

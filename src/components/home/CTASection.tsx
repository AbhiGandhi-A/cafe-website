"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Utensils,
  ShoppingBag,
  Bike,
  ArrowRight,
  Pizza,
  Coffee,
  Sandwich,
  CupSoda,
  IceCream,
  Croissant,
} from "lucide-react";
import { images } from "@/data/menu";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

// Decorative background food icons
const bgFoodIcons = [
  { Icon: Pizza, top: "8%", left: "4%", size: 36, rotate: "-15deg" },
  { Icon: Coffee, top: "72%", left: "6%", size: 32, rotate: "12deg" },
  { Icon: Sandwich, top: "12%", right: "6%", size: 34, rotate: "18deg" },
  { Icon: CupSoda, top: "75%", right: "5%", size: 36, rotate: "-20deg" },
  { Icon: IceCream, top: "82%", left: "46%", size: 28, rotate: "8deg" },
  { Icon: Croissant, top: "6%", left: "52%", size: 30, rotate: "-10deg" },
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#090909] py-14 sm:py-20 text-white">
      {/* Background Decorative Food Icons / Doodles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {bgFoodIcons.map(({ Icon, top, left, right, size, rotate }, idx) => (
          <div
            key={idx}
            className="absolute text-white/[0.08] transition-transform duration-700 hover:scale-110"
            style={{
              top,
              left,
              right,
              transform: `rotate(${rotate})`,
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </div>
        ))}
        {/* Subtle Warm Glows */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-brand-yellow/10 blur-[120px]" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-brand-red/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-yellow/30 bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] p-6 shadow-lift sm:p-10 lg:p-12">
          {/* Inner ambient dots */}
          <div className="absolute inset-0 brand-dots opacity-20 pointer-events-none" aria-hidden="true" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1.4fr_1.2fr]">
            {/* Left Column: Offers Info */}
            <ScrollReveal direction="left" duration={650}>
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
            </ScrollReveal>

            {/* Center Column: Combo Burger & Drink Image + 99 Badge */}
            <ScrollReveal direction="scale" delay={150} duration={700}>
              <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lift">
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
            </ScrollReveal>

            {/* Right Column: 3 Service Modes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1">
              {serviceModes.map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} direction="right" delay={i * 120} duration={600}>
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.04] p-3 text-center backdrop-blur-sm transition-all hover:border-brand-yellow/30 sm:p-4 lg:flex-row lg:text-left">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

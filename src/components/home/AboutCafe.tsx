"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, UtensilsCrossed, Layers, Flame, Zap, ArrowRight } from "lucide-react";
import { images } from "@/data/menu";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const highlights = [
  { icon: UtensilsCrossed, title: "Fresh Ingredients" },
  { icon: Layers, title: "Generous Portions" },
  { icon: Flame, title: "Cheesy Recipes" },
  { icon: Zap, title: "Quick Service" },
];

export function AboutCafe() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden bg-[#FAF8F5] py-14 sm:py-20 text-[#111111]">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left Column: Story & Features */}
          <ScrollReveal direction="left" duration={650}>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#B45309] sm:text-sm">
                <Sparkles size={14} className="text-[#D97706]" /> ABOUT CRAZY CHEESY CAFE
              </p>

              <h2 className="font-display mt-2 text-3xl font-black uppercase leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
                Made For Your <br />
                <span className="font-sans italic text-[#D97706]">Cheesy</span> Moments
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                From quick evening bites to loaded cheesy cravings, Crazy Cheesy Cafe brings together sandwiches, pizzas, momos, garlic breads, beverages and desserts made to hit the spot.
              </p>

              {/* 4 Circular Feature Pills Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3">
                {highlights.map(({ icon: Icon, title }, idx) => (
                  <ScrollReveal key={title} direction="up" delay={idx * 80} duration={500}>
                    <div className="flex flex-col items-center rounded-2xl border border-black/8 bg-white p-4 text-center shadow-sm transition-all hover:border-[#FFC928] hover:shadow-card">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FFC928]/20 text-[#B45309]">
                        <Icon size={22} />
                      </span>
                      <p className="mt-2 text-xs font-black uppercase text-[#111111]">
                        {title}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-black text-[#090909] shadow-soft transition-all hover:bg-brand-yellow-light hover:shadow-glow active:scale-95"
                >
                  Know More About Us
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: 3-Image Collage */}
          <ScrollReveal direction="right" delay={150} duration={650}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Big Cafe Interior Shot */}
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 shadow-card sm:col-span-1 sm:aspect-[4/5]">
                <Image
                  src={images.cafeInterior}
                  alt="Crazy Cheesy Cafe warm cozy ambient interior"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-xl bg-[#090909]/85 px-3.5 py-1.5 text-xs font-black uppercase text-brand-yellow backdrop-blur-md">
                    Good Food Good People
                  </span>
                </div>
              </div>

              {/* Right stacked 2 smaller images */}
              <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-1 sm:grid-cols-1 sm:gap-4">
                {/* Garlic Bread */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-black/10 shadow-sm">
                  <Image
                    src={images.garlic}
                    alt="Cheesy Garlic Bread"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Iced Chocolate / Shake */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-black/10 shadow-sm">
                  <Image
                    src={images.beverages}
                    alt="Cafe Vibes Great Bites"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-bold text-white">
                      Cafe Vibes Great Bites
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

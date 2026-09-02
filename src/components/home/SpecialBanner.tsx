"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/menu";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SpecialBanner() {
  return (
    <section className="relative overflow-hidden bg-[#090909] py-10 sm:py-16 text-white">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-yellow/30 bg-[#141414] shadow-lift">
          <div className="grid items-stretch lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Side Sandwich Image with Badges */}
            <ScrollReveal direction="left" duration={700}>
              <div className="relative min-h-[340px] p-6 sm:min-h-[420px] sm:p-10">
                <Image
                  src={images.grill}
                  alt="Cheesy loaded grill sandwich"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

                {/* Floating Stamps / Badges */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="inline-block max-w-[240px] rotate-[-5deg] rounded-2xl border-2 border-brand-yellow/80 bg-[#090909]/90 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-brand-yellow shadow-lift backdrop-blur-md sm:text-sm">
                    &#129386; Sandwich That Hits Different!
                  </div>

                  <div className="mt-auto grid h-22 w-22 place-items-center rounded-full border-2 border-dashed border-[#090909] bg-brand-yellow text-center font-black text-[#090909] shadow-lift sm:h-24 sm:w-24">
                    <div className="rotate-[-8deg] leading-tight">
                      <span className="block text-[10px] uppercase">100%</span>
                      <span className="block text-xs font-black uppercase">FRESH</span>
                      <span className="block text-[9px]">Ingredients</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Side Yellow Angle Banner */}
            <ScrollReveal direction="right" delay={150} duration={700}>
              <div className="relative flex h-full flex-col justify-center bg-brand-yellow p-8 text-[#090909] sm:p-12 lg:p-14">
                {/* Subtle cheese texture accent */}
                <div className="pointer-events-none absolute right-6 top-6 text-4xl opacity-25">
                  &#129472;
                </div>

                <h2 className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#090909] sm:text-5xl lg:text-6xl">
                  MORE CHEESE?
                  <br />
                  <span className="text-black">SAY LESS.</span>
                </h2>

                <p className="mt-4 max-w-md text-base font-bold leading-relaxed text-[#090909]/85">
                  Build your next cafe craving in just a few clicks.
                </p>

                <div className="mt-8">
                  <Link
                    href="/menu"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#090909] px-8 py-4 text-base font-black text-brand-yellow shadow-lift transition-all hover:bg-black hover:text-white active:scale-95"
                  >
                    Order Now
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/menu";

export function SpecialBanner() {
  return (
    <section className="relative overflow-hidden bg-ink-dark py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-yellow/30 bg-ink-card shadow-lift">
          <div className="grid items-stretch lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Side Sandwich Image with Badges */}
            <div className="relative min-h-[320px] p-6 sm:min-h-[380px] sm:p-10">
              <Image
                src={images.grill}
                alt="Cheesy loaded sandwich"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Floating Stamps / Badges */}
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="inline-block max-w-[200px] rotate-[-6deg] rounded-2xl border-2 border-brand-yellow/80 bg-ink-dark/85 px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-yellow shadow-lift backdrop-blur-md">
                  ?? Sandwich That Hits Different!
                </div>

                <div className="mt-auto grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-ink-dark bg-brand-yellow text-center font-black text-ink-dark shadow-lift">
                  <div className="rotate-[-8deg] leading-tight">
                    <span className="block text-[10px] uppercase">100%</span>
                    <span className="block text-xs font-black uppercase">FRESH</span>
                    <span className="block text-[9px]">Ingredients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Yellow Angle Banner */}
            <div className="relative flex flex-col justify-center bg-brand-yellow p-8 text-ink-dark sm:p-12 lg:p-14">
              {/* Subtle cheese texture background */}
              <div className="pointer-events-none absolute right-4 top-4 text-4xl opacity-20">
                ??
              </div>

              <h2 className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-ink-dark sm:text-5xl lg:text-5xl">
                MORE CHEESE?
                <br />
                <span className="text-black">SAY LESS.</span>
              </h2>

              <p className="mt-4 max-w-md text-base font-bold leading-relaxed text-ink-dark/80">
                Build your next cafe craving in just a few clicks.
              </p>

              <div className="mt-8">
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-dark px-8 py-4 text-base font-black text-brand-yellow shadow-lift transition-all hover:bg-black hover:text-brand-cream active:scale-95"
                >
                  Order Now
                  <span className="transition-transform group-hover:translate-x-1">?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";
import { images } from "@/data/menu";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const galleryItems = [
  { src: images.pizza, name: "Cheesy Pizza" },
  { src: images.grill, name: "Loaded Sandwich" },
  { src: images.momos, name: "Hot Momos" },
  { src: images.beverages, name: "Chilled Shakes" },
  { src: images.garlic, name: "Garlic Bread" },
  { src: images.burger, name: "Gourmet Burgers" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-20 overflow-hidden bg-[#090909] py-14 sm:py-20 text-white">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        <ScrollReveal direction="left" duration={600}>
          <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl lg:text-5xl">
            Our <span className="font-sans italic text-brand-yellow">Cheesy</span> Moments
          </h2>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 sm:gap-4">
          {galleryItems.map((item, idx) => (
            <ScrollReveal key={item.name + idx} direction="up" delay={idx * 70} duration={500}>
              <div
                className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/50 hover:shadow-card"
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 15vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="absolute bottom-2 left-2 right-2 text-center text-xs font-bold text-brand-yellow opacity-0 transition-opacity group-hover:opacity-100">
                  {item.name}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* 7th CTA Card */}
          <ScrollReveal direction="up" delay={6 * 70} duration={500}>
            <div className="col-span-2 flex aspect-square flex-col items-center justify-center rounded-2xl border border-brand-yellow/30 bg-[#141414] p-4 text-center sm:col-span-1 lg:col-span-1">
              <Crown size={24} className="text-brand-yellow fill-brand-yellow" />
              <p className="font-display mt-2 text-xs font-black uppercase text-white">
                GOOD FOOD
              </p>
              <p className="font-display text-xs font-black uppercase text-brand-yellow">
                GOOD PEOPLE
              </p>
              <Link
                href="/menu"
                className="group mt-3 inline-flex items-center gap-1 rounded-full bg-brand-yellow px-3.5 py-1.5 text-[11px] font-black text-[#090909] transition-all hover:bg-brand-yellow-light"
              >
                Get Gallery <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

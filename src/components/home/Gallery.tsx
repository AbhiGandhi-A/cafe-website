"use client";

import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/menu";

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
    <section id="gallery" className="relative scroll-mt-20 overflow-hidden bg-ink-dark py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-black uppercase text-brand-cream sm:text-4xl">
          Our <span className="font-sans italic text-brand-yellow">Cheesy</span> Moments
        </h2>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 sm:gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={item.name + idx}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/50 hover:shadow-card"
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
          ))}

          {/* 7th CTA Card */}
          <div className="col-span-2 flex aspect-square flex-col items-center justify-center rounded-2xl border border-brand-yellow/30 bg-ink-card p-4 text-center sm:col-span-1 lg:col-span-1">
            <span className="text-2xl">??</span>
            <p className="font-display mt-1 text-xs font-black uppercase text-brand-cream">
              GOOD FOOD
            </p>
            <p className="font-display text-xs font-black uppercase text-brand-yellow">
              GOOD PEOPLE
            </p>
            <Link
              href="/menu"
              className="mt-3 rounded-full bg-brand-yellow px-3 py-1.5 text-[11px] font-black text-ink-dark transition-all hover:bg-brand-yellow-light"
            >
              Get Gallery ?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Star, Navigation, ExternalLink, Utensils, ArrowRight } from "lucide-react";
import { cafeInfo } from "@/data/cafe";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function StoreLocator() {
  return (
    <section id="store-locator" className="relative scroll-mt-20 overflow-hidden bg-[#FAF8F5] py-14 sm:py-20 text-[#111111]">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="left" duration={600}>
          <div className="text-center sm:text-left">
            <h2 className="font-display text-3xl font-black uppercase text-[#111111] sm:text-4xl lg:text-5xl">
              Visit Our <span className="font-sans italic text-[#D97706]">Cafe</span>
            </h2>
            <p className="mt-2 text-sm font-semibold text-[#6B7280] sm:text-base">
              Come for the food, stay for the vibe.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Info & Map Container */}
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:gap-10">
          {/* Left Column: Store Details */}
          <ScrollReveal direction="left" delay={100} duration={650}>
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="space-y-4">
                {/* Location Card */}
                <div className="flex items-start gap-4 rounded-3xl border border-black/8 bg-white p-5 shadow-sm transition-all hover:border-[#FFC928] hover:shadow-card">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#FFC928] text-[#090909] shadow-sm">
                    <MapPin size={24} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-wider text-[#B45309]">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-bold leading-snug text-[#111111]">
                      {cafeInfo.addressLine}
                    </p>
                    <p className="mt-1 text-xs text-[#6B7280]">
                      {cafeInfo.landmark}, {cafeInfo.city}, {cafeInfo.state} - {cafeInfo.pincode}
                    </p>
                  </div>
                </div>

                {/* Call Us & Hours Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Call Us */}
                  <a
                    href={`tel:${cafeInfo.phone}`}
                    className="group flex items-start gap-3.5 rounded-3xl border border-black/8 bg-white p-5 shadow-sm transition-all hover:border-[#FFC928] hover:shadow-card"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FFC928]/20 text-[#B45309] transition-transform group-hover:scale-105">
                      <Phone size={22} />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-[#6B7280]">
                        Call Us
                      </p>
                      <p className="mt-1 text-sm font-black text-[#111111] group-hover:text-[#B45309]">
                        {cafeInfo.phoneFormatted}
                      </p>
                    </div>
                  </a>

                  {/* Opening Hours */}
                  <div className="flex items-start gap-3.5 rounded-3xl border border-black/8 bg-white p-5 shadow-sm transition-all hover:border-[#FFC928] hover:shadow-card">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FFC928]/20 text-[#B45309]">
                      <Clock size={22} />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-[#6B7280]">
                        Opening Hours
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#111111]">
                        {cafeInfo.hoursDetail}
                      </p>
                      <span className="mt-1.5 inline-block rounded-full bg-green-500/15 px-2.5 py-0.5 text-[10px] font-black text-green-700">
                        {cafeInfo.timingDisplay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating Card */}
                <div className="flex items-center justify-between rounded-3xl border border-black/8 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFC928] text-[#090909]">
                      <Star size={20} className="fill-[#090909]" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-[#111111]">
                        {cafeInfo.rating} Rating on Google
                      </p>
                      <p className="text-xs font-semibold text-[#6B7280]">
                        Based on {cafeInfo.reviewsCount} Customer Reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-[#FFC928]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-[#FFC928]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={cafeInfo.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-black text-[#090909] shadow-soft transition-all hover:bg-brand-yellow-light hover:shadow-lift active:scale-95"
                >
                  <Navigation size={18} />
                  Get Directions
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>

                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-bold text-[#111111] shadow-sm transition-all hover:border-[#FFC928] hover:bg-[#F9F9F9] active:scale-95"
                >
                  <Utensils size={16} className="text-[#B45309]" />
                  View Menu
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Styled Interactive Map Box */}
          <ScrollReveal direction="right" delay={150} duration={650}>
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-lift">
              {/* Embedded Google Map iframe focused on Ankleshwar */}
              <iframe
                title="Crazy Cheesy Cafe Ankleshwar Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  "Crazy Cheesy Cafe Signature Galleria Ankleshwar Gujarat 393001"
                )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="h-full w-full border-0 grayscale-[15%] contrast-[1.05]"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Top Cafe Pin Banner */}
              <div className="absolute left-4 top-4 right-4 sm:left-6 sm:top-6 sm:right-auto">
                <a
                  href={cafeInfo.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-brand-yellow/50 bg-[#090909]/95 p-3.5 shadow-lift backdrop-blur-md transition-all hover:border-brand-yellow hover:bg-[#090909]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-yellow text-[#090909] shadow-soft">
                    <MapPin size={20} />
                  </span>
                  <div className="min-w-0 pr-2">
                    <p className="truncate text-xs font-black uppercase tracking-wider text-brand-yellow">
                      Crazy Cheesy Cafe
                    </p>
                    <p className="truncate text-[11px] font-semibold text-white/90">
                      Signature Galleria &middot; Ankleshwar
                    </p>
                  </div>
                  <ExternalLink size={15} className="shrink-0 text-brand-gray transition-colors group-hover:text-brand-yellow" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

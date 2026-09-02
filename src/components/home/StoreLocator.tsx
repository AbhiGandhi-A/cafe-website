"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Star, Navigation, ExternalLink, Utensils } from "lucide-react";
import { cafeInfo } from "@/data/cafe";

export function StoreLocator() {
  return (
    <section id="store-locator" className="relative scroll-mt-20 overflow-hidden bg-ink-dark py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center sm:text-left">
          <h2 className="font-display text-3xl font-black uppercase text-brand-cream sm:text-4xl lg:text-5xl">
            Visit Our <span className="font-sans italic text-brand-yellow">Cafe</span>
          </h2>
          <p className="mt-2 text-sm font-medium text-brand-gray sm:text-base">
            Come for the food, stay for the vibe.
          </p>
        </div>

        {/* 2-Column Info & Map Container */}
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:gap-10">
          {/* Left Column: Store Details */}
          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-4">
              {/* Location Card */}
              <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all hover:border-brand-yellow/40 hover:bg-white/[0.07]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-yellow text-ink-dark shadow-soft">
                  <MapPin size={24} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-wider text-brand-yellow">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-brand-cream">
                    {cafeInfo.addressLine}
                  </p>
                  <p className="mt-1 text-xs text-brand-gray">
                    {cafeInfo.landmark}, {cafeInfo.city}, {cafeInfo.state} - {cafeInfo.pincode}
                  </p>
                </div>
              </div>

              {/* Call Us & Hours Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Call Us */}
                <a
                  href={`tel:${cafeInfo.phone}`}
                  className="group flex items-start gap-3.5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all hover:border-brand-yellow/40 hover:bg-white/[0.07]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-yellow/15 text-brand-yellow transition-transform group-hover:scale-105">
                    <Phone size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-brand-gray">
                      Call Us
                    </p>
                    <p className="mt-1 text-sm font-black text-brand-cream group-hover:text-brand-yellow">
                      {cafeInfo.phoneFormatted}
                    </p>
                  </div>
                </a>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all hover:border-brand-yellow/40 hover:bg-white/[0.07]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-yellow/15 text-brand-yellow">
                    <Clock size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-brand-gray">
                      Opening Hours
                    </p>
                    <p className="mt-1 text-xs font-bold text-brand-cream">
                      {cafeInfo.hoursDetail}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-black text-green-400">
                      {cafeInfo.timingDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Card */}
              <div className="flex items-center justify-between rounded-3xl border border-brand-yellow/30 bg-gradient-to-r from-brand-yellow/15 via-brand-yellow/5 to-transparent p-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-yellow text-ink-dark">
                    <Star size={20} className="fill-ink-dark" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-brand-cream">
                      {cafeInfo.rating} Rating on Google
                    </p>
                    <p className="text-xs text-brand-gray">
                      Based on {cafeInfo.reviewsCount} Customer Reviews
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 text-brand-yellow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-brand-yellow" />
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
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-black text-ink-dark shadow-glow transition-all hover:bg-brand-yellow-light hover:shadow-lift active:scale-95"
              >
                <Navigation size={18} />
                Get Directions
                <span className="transition-transform group-hover:translate-x-1">?</span>
              </a>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-brand-cream transition-all hover:border-brand-yellow hover:bg-white/10 active:scale-95"
              >
                <Utensils size={16} className="text-brand-yellow" />
                View Menu
              </Link>
            </div>
          </div>

          {/* Right Column: Styled Interactive Map Box */}
          <div className="relative min-h-[380px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-ink-card shadow-lift">
            {/* Embedded Google Map iframe focused on Ankleshwar */}
            <iframe
              title="Crazy Cheesy Cafe Ankleshwar Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                "Crazy Cheesy Cafe Signature Galleria Ankleshwar Gujarat 393001"
              )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="h-full w-full border-0 grayscale-[20%] contrast-[1.05] filter"
              loading="lazy"
              allowFullScreen
            />

            {/* Floating Top Cafe Pin Banner */}
            <div className="absolute left-4 top-4 right-4 sm:left-6 sm:top-6 sm:right-auto">
              <a
                href={cafeInfo.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-brand-yellow/40 bg-ink-dark/95 p-3.5 shadow-lift backdrop-blur-md transition-all hover:border-brand-yellow hover:bg-ink-dark"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-yellow text-ink-dark shadow-soft">
                  <MapPin size={20} />
                </span>
                <div className="min-w-0 pr-2">
                  <p className="truncate text-xs font-black uppercase tracking-wider text-brand-yellow">
                    Crazy Cheesy Cafe
                  </p>
                  <p className="truncate text-[11px] font-semibold text-brand-cream/90">
                    Signature Galleria ? Ankleshwar
                  </p>
                </div>
                <ExternalLink size={15} className="shrink-0 text-brand-gray transition-colors group-hover:text-brand-yellow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

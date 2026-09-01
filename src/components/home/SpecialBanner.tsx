import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/menu";

export function SpecialBanner() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-card to-ink-dark shadow-lift lg:grid-cols-2">
          <div className="brand-dots absolute inset-0 opacity-40" aria-hidden />
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-yellow/20 blur-3xl" />
          <div className="relative flex flex-col justify-center gap-4 p-8 sm:p-12 lg:p-16">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow">
              Limited Craving
            </p>
            <h2 className="font-display text-4xl font-black uppercase leading-[1.02] text-brand-cream sm:text-5xl lg:text-6xl">
              More Cheese?
              <br />
              <span className="gradient-text">Say Less.</span>
            </h2>
            <p className="max-w-md text-base text-brand-cream/70">
              Build your next cafe craving in just a few clicks.
            </p>
            <div className="mt-2">
              <Button href="/menu" variant="primary" size="lg">
                Start Ordering
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Image
              src={images.pizza}
              alt="Cheesy pizza"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-dark to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

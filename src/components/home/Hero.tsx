import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Star, Leaf, Flame } from "lucide-react";
import { images } from "@/data/menu";

const trustItems = [
  { icon: Star, label: "4.8 Customer Favourite" },
  { icon: Flame, label: "Freshly Prepared" },
  { icon: Leaf, label: "100% Veg" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-dark text-brand-cream">
      <div className="absolute inset-0 brand-dots" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-yellow/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-24 lg:px-8">
        <div className="animate-fade-up text-center lg:text-left">
          <Badge tone="yellow" className="mb-5">
            🔥 Crazy Good. Extra Cheesy.
          </Badge>
          <h1 className="font-display text-shadow-brand text-[2.6rem] font-black uppercase leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Cheesy
            <br />
            Cravings.
            <br />
            <span className="gradient-text">Crazy Good.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-cream/75 sm:text-lg lg:mx-0">
            Loaded sandwiches, pizzas, momos and cafe favourites made fresh for
            every craving.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="/menu" variant="primary" size="lg">
              Order Now
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              Explore Menu
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-cream/80 lg:justify-start">
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon
                  size={16}
                  className={label.startsWith("4.8") ? "text-brand-yellow" : "text-brand-yellow"}
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up lg:max-w-none">
          <div className="relative" style={{ animationDelay: "0.2s" }}>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-lift">
              <Image
                src={images.grill}
                alt="A loaded cheesy grilled sandwich"
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
                priority
              />
            </div>

            <div className="absolute -left-3 top-6 animate-float rounded-2xl bg-ink-card p-3 shadow-lift sm:-left-6">
              <Badge tone="red">Bestseller</Badge>
              <p className="mt-2 text-[11px] font-bold text-brand-cream/80">
                Veg Cheese
                <br />
                Grill Sandwich
              </p>
              <p className="mt-1 text-lg font-black text-brand-yellow">₹150</p>
            </div>

            <div
              className="absolute -bottom-5 right-3 animate-float rounded-2xl bg-brand-yellow p-3 text-ink-dark shadow-lift sm:right-8"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wide">
                Freshly Made
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs font-black">
                <Flame size={13} /> Just for you
              </p>
            </div>

            <div
              className="absolute -right-2 top-1/3 hidden -translate-y-1/2 animate-float rounded-2xl bg-ink-card px-4 py-3 text-center shadow-lift sm:block"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-2xl font-black text-brand-yellow">4.8★</p>
              <p className="text-[10px] font-semibold text-brand-gray">Customer</p>
            </div>

            <div
              className="absolute left-6 top-1/2 hidden h-4 w-4 animate-ping rounded-full bg-brand-yellow/40 lg:block"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

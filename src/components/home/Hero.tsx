import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pizza } from "lucide-react";
import { images } from "@/data/menu";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-charcoal text-brand-cream">
      <div className="absolute inset-0 brand-dots" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-yellow/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div className="animate-fade-up text-center lg:text-left">
          <Badge tone="yellow" className="mb-5">
            Hot & Fresh · Made to order
          </Badge>
          <h1 className="text-shadow-brand text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Cheesy Cravings,
            <br />
            <span className="text-brand-yellow">Made Crazy Good.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-cream/80 sm:text-lg lg:mx-0">
            Fresh sandwiches, loaded pizzas, crispy momos and your favourite
            cafe bites — all made with extra cheesy goodness.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="/menu" variant="primary" size="lg">
              Explore Menu
            </Button>
            <Button href="/checkout" variant="outline" size="lg" className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-charcoal">
              Order Now
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up lg:max-w-none">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={images.pizza}
                alt="A loaded cheesy pizza"
                width={600}
                height={450}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
                priority
              />
            </div>

            <div className="absolute -left-4 top-6 animate-float rounded-2xl bg-white p-3 shadow-lift sm:-left-8">
              <Badge tone="red">Best Seller</Badge>
              <p className="mt-2 text-xs font-bold text-brand-charcoal">
                Crazy Cheesy
                <br />
                Veggie Pizza
              </p>
            </div>

            <div
              className="absolute -bottom-5 right-4 animate-float rounded-2xl bg-brand-yellow p-3 shadow-lift sm:right-8"
              style={{ animationDelay: "1.2s" }}
            >
              <Badge tone="dark">Freshly Made</Badge>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-brand-charcoal">
                <Pizza size={14} /> Just for you
              </p>
            </div>

            <div
              className="absolute -right-3 top-1/2 hidden -translate-y-1/2 animate-float rounded-full bg-white px-4 py-3 text-center shadow-lift sm:block"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-2xl font-black text-brand-red">4.9</p>
              <p className="text-[10px] font-semibold text-brand-gray">Rated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

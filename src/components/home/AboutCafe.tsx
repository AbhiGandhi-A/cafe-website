import Image from "next/image";
import { BadgeCheck, ChefHat, Flame } from "lucide-react";
import { images } from "@/data/menu";

const points = [
  { icon: BadgeCheck, title: "Quality Ingredients", desc: "Handpicked, fresh produce." },
  { icon: ChefHat, title: "Freshly Prepared", desc: "Cooked to order, never stale." },
  { icon: Flame, title: "Cheesy & Delicious", desc: "Bold flavours every time." },
];

export function AboutCafe() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src={images.garlic}
              alt="Cheesy garlic bread at Crazy Cheesy Cafe"
              width={600}
              height={450}
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-brand-dark px-5 py-4 text-brand-yellow shadow-lift sm:-right-6">
            <p className="text-3xl font-black">9+</p>
            <p className="text-xs font-semibold uppercase tracking-wider">
              Cheesy Categories
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-red">
            About the Cafe
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase text-brand-charcoal sm:text-4xl">
            Made For Your Cheesy Moments
          </h2>
          <p className="mt-4 text-brand-gray">
            From quick evening bites to loaded cheesy cravings, Crazy Cheesy
            Cafe brings together sandwiches, pizzas, momos, garlic breads,
            beverages and desserts made to hit the spot.
          </p>
          <ul className="mt-6 space-y-4">
            {points.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-yellow/25 text-brand-charcoal">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="font-extrabold text-brand-charcoal">{title}</p>
                  <p className="text-sm text-brand-gray">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

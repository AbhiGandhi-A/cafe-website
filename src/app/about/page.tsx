import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
  Heart,
  Flame,
  Leaf,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OpenStatusPill } from "@/components/ui/OpenStatus";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { cafeInfo, openingHours } from "@/data/cafe";

const values = [
  {
    icon: Flame,
    title: "Extra Cheesy",
    desc: "Every bite stacked with real, gooey cheese — never skimped.",
  },
  {
    icon: Leaf,
    title: "Fresh Always",
    desc: "Veggies chopped in-house, bakes made to order every single day.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Small-batch recipes crafted by people, not machines.",
  },
  {
    icon: Star,
    title: "Loved Locally",
    desc: "Rated 4.8+ by thousands of happy, hungry regulars.",
  },
];

export const metadata = {
  title: "About Us | Crazy Cheesy Cafe",
  description: "The story, values and people behind Crazy Cheesy Cafe — extra cheesy, always fresh.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow">Our Story</p>
        <h1 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-5xl">
          About Crazy Cheesy Cafe
        </h1>
        <div className="mt-4 flex justify-center">
          <OpenStatusPill />
        </div>
      </div>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-brand-cream/85">
          <p className="text-lg font-semibold text-brand-cream">
            It started with one obsession: how much cheese can we squeeze into one bite?
          </p>
          <p className="leading-relaxed text-brand-gray">
            Crazy Cheesy Cafe began as a tiny counter serving loaded sandwiches and piping hot momos to
            late-night snackers. Word spread fast — about the stretchy cheese pulls, the crackling thin-crust
            pizzas, and the warm, friendly crew behind the counter.
          </p>
          <p className="leading-relaxed text-brand-gray">
            Today we&apos;re a neighbourhood favourite, but the rule stays the same: everything is made fresh,
            made with care, and made extra cheesy. No shortcuts, no pre-made mush — just good food, fast.
          </p>
          <ul className="space-y-2.5">
            {[
              "Handmade dough and sauces, prepared daily",
              "Generous portions at honest prices",
              "Pickup in ~15 mins, or hot delivery to your door",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 font-medium text-brand-cream/85">
                <ChevronRight size={16} className="shrink-0 text-brand-yellow" /> {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-dark overflow-hidden">
          <div className="bg-brand-yellow p-8 text-ink-dark">
            <div className="flex items-center gap-3">
              <BrandLogo />
            </div>
            <h3 className="font-display mt-4 text-2xl font-black uppercase">Visit Us Today</h3>
            <p className="mt-1 font-semibold">{cafeInfo.tagline}</p>
          </div>
          <div className="space-y-4 p-8">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-yellow" />
              <p className="text-brand-cream/85">{cafeInfo.addressLine}</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brand-yellow" />
              <div>
                <p className="text-brand-cream/85">{openingHours.days}: {openingHours.open} – {openingHours.close}</p>
                <p className="text-xs text-brand-gray">Demo hours shown for preview</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-brand-yellow" />
              <p className="text-brand-cream/85">{cafeInfo.phone}</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-brand-yellow" />
              <p className="text-brand-cream/85">{cafeInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-center text-2xl font-black uppercase text-brand-cream">
          What We Stand For
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-dark p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-yellow/15 text-brand-yellow">
                <Icon size={26} />
              </div>
              <h3 className="mt-4 font-display text-lg font-black text-brand-cream">{title}</h3>
              <p className="mt-2 text-sm text-brand-gray">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button href="/menu" variant="primary" size="lg">
          <ShoppingBag size={18} /> Browse the Full Menu
        </Button>
      </div>
    </div>
  );
}

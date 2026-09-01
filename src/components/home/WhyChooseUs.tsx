import { Leaf, UtensilsCrossed, Sparkles, Zap } from "lucide-react";

const reasons = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "Everything starts with fresh, quality ingredients.",
  },
  {
    icon: UtensilsCrossed,
    title: "Generous Portions",
    desc: "Big servings that keep you full and happy.",
  },
  {
    icon: Sparkles,
    title: "Cheesy Recipes",
    desc: "Signature recipes loaded with real cheese.",
  },
  {
    icon: Zap,
    title: "Quick Service",
    desc: "Hot and ready, without the long wait.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-ink-dark py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-yellow">
            Why Us
          </p>
          <h2 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-4xl">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-yellow text-ink-dark">
                <Icon size={26} />
              </span>
              <h3 className="font-display mt-4 text-lg font-extrabold text-brand-cream">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-brand-cream/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Clock, Sparkles, Zap, Heart } from "lucide-react";

const stats = [
  { icon: Clock, title: "Freshly Prepared", desc: "Made when you order" },
  { icon: Sparkles, title: "Cheesy Goodness", desc: "Extra cheese, every time" },
  { icon: Zap, title: "Quick Service", desc: "Fast & friendly" },
  { icon: Heart, title: "Made With Love", desc: "Quality in every bite" },
];

export function QuickStats() {
  return (
    <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-card"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-yellow/20 text-brand-charcoal">
              <Icon size={24} />
            </span>
            <div>
              <p className="text-sm font-extrabold text-brand-charcoal sm:text-base">
                {title}
              </p>
              <p className="text-xs text-brand-gray">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";

const quick = [
  { emoji: "🥪", label: "Sandwich", id: "sandwich" },
  { emoji: "🍕", label: "Pizza", id: "crazy-cheesy-special" },
  { emoji: "🥟", label: "Momos", id: "momos" },
  { emoji: "🧀", label: "Garlic Bread", id: "garlic-bread" },
  { emoji: "🥤", label: "Beverages", id: "beverages" },
  { emoji: "🍨", label: "Dessert", id: "dessert" },
];

export function QuickOrder() {
  return (
    <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-ink-line bg-ink-card p-5 shadow-card sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-gray">
          Quick Order
        </h2>
        <div className="no-scrollbar mt-4 flex gap-2.5 overflow-x-auto pb-1 sm:flex-wrap">
          {quick.map(({ emoji, label, id }) => (
            <Link
              key={id}
              href={`/menu?category=${id}`}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-line bg-ink-charcoal px-4 py-2.5 text-sm font-semibold text-brand-cream transition-all hover:-translate-y-0.5 hover:border-brand-yellow hover:bg-brand-yellow/10 hover:text-brand-yellow"
            >
              <span className="text-lg">{emoji}</span>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

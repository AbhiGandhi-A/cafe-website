import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { getItemCountByCategory } from "@/data/menu";

export function Categories() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-red">
              Categories
            </p>
            <h2 className="mt-1 text-3xl font-black uppercase text-brand-charcoal sm:text-4xl">
              What are you craving?
            </h2>
          </div>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-1 text-sm font-bold text-brand-red"
          >
            View all
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => {
            const count = getItemCountByCategory(cat.id);
            return (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className="group flex flex-col items-start gap-3 rounded-3xl border border-brand-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow hover:shadow-lift"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-charcoal text-3xl transition-transform duration-300 group-hover:scale-110">
                  <span aria-hidden>{cat.emoji}</span>
                </span>
                <div>
                  <h3 className="text-base font-extrabold leading-tight text-brand-charcoal">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-brand-gray">
                    {count} items
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-brand-red opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

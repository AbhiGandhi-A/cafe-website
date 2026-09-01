import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { getItemCountByCategory, images } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";

const catImage: Record<string, string> = {
  sandwich: images.sandwich,
  "toast-sandwich": images.toast,
  "grill-sandwich": images.grill,
  "garlic-bread": images.garlic,
  "rimzim-special": images.rimzim,
  momos: images.momos,
  "crazy-cheesy-special": images.pizza,
  beverages: images.beverages,
  dessert: images.dessert,
};

export function Categories() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Popular Categories"
          title="Pick Your Craving"
          description="Explore our freshly made lineup — from loaded sandwiches to cheesy desserts."
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((cat) => {
            const count = getItemCountByCategory(cat.id);
            return (
              <a
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-[1.4rem] border border-white/10 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:h-44"
              >
                <Image
                  src={catImage[cat.id] ?? images.sandwich}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="relative p-4">
                  <span className="text-2xl" aria-hidden>
                    {cat.emoji}
                  </span>
                  <h3 className="font-display mt-1 text-lg font-bold uppercase leading-tight text-white">
                    {cat.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-white/70">{count} items</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-yellow text-ink-dark opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { menuItems, getItemCountByCategory } from "@/data/menu";

const previewCategoryIds = ["sandwich", "momos", "crazy-cheesy-special", "dessert"];

export function MenuPreview() {
  return (
    <section className="bg-ink-dark py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-yellow">
              Menu Preview
            </p>
            <h2 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-4xl">
              Something For Every Craving
            </h2>
          </div>
          <Button href="/menu" variant="primary" size="md">
            View Full Menu
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {previewCategoryIds.map((catId) => {
            const cat = categories.find((c) => c.id === catId);
            if (!cat) return null;
            const items = menuItems.filter((i) => i.category === cat.name);
            const featured = items[0];
            return (
              <div
                key={catId}
                className="group overflow-hidden rounded-3xl border border-ink-line bg-ink-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                {featured && (
                  <div className="relative h-40 overflow-hidden sm:h-44">
                    <Image
                      src={featured.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="font-display text-lg font-bold uppercase">{cat.name}</p>
                      <p className="text-xs text-white/80">
                        {getItemCountByCategory(catId)} items
                      </p>
                    </div>
                  </div>
                )}
                <div className="space-y-1.5 p-4">
                  {items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="truncate font-medium text-brand-cream/85">
                        {item.name}
                      </span>
                      <span className="shrink-0 font-bold text-brand-yellow">
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

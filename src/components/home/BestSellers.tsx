import { popularItems } from "@/data/menu";
import { ProductCard } from "@/components/ui/ProductCard";

export function BestSellers() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-red">
            Fan Favourites
          </p>
          <h2 className="mt-1 text-3xl font-black uppercase text-brand-charcoal sm:text-4xl">
            Best Sellers
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-gray">
            The cheesy bites our customers keep coming back for.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularItems.slice(0, 8).map((item) => (
            <ProductCard key={item.id} item={item} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

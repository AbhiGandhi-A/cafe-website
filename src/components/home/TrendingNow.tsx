import { menuItems } from "@/data/menu";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const trendingIds = [
  "veg-cheese-grill-sandwich",
  "paneer-tandoori-club-sandwich",
  "cheese-garlic-bread",
  "fried-momo-full",
  "crazy-cheesy-veggie-delight-pizza",
  "oreo-shake",
];

export function TrendingNow() {
  const items = trendingIds
    .map((id) => menuItems.find((i) => i.id === id))
    .filter((i) => i !== undefined);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Trending Now"
          title="🔥 What Everyone's Ordering"
          description="The bestsellers our cheese lovers can't stop adding to cart."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

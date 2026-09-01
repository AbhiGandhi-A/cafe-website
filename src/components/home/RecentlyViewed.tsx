"use client";

import { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { menuItems } from "@/data/menu";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export function RecentlyViewed() {
  const { recentlyViewed } = useCart();
  const [hydrated, setHydrated] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHydrated(true), []);

  const items = recentlyViewed
    .map((id) => menuItems.find((i) => i.id === id))
    .filter((i) => i !== undefined)
    .slice(0, 4);

  if (!hydrated || items.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            label="Recently Viewed"
            title="🕘 Picked Up Again"
            description="Jump right back into the dishes you were just craving."
          />
          <Button href="/menu" variant="outline" size="sm" className="hidden sm:inline-flex">
            View All Menu <ArrowRight size={16} />
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} compact />
          ))}
        </div>
        <div className="mt-6 flex justify-center sm:hidden">
          <Button href="/menu" variant="outline" size="sm">
            View All Menu <ArrowRight size={16} />
          </Button>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-gray">
          <Clock size={13} /> Tracks your last viewed items on this device
        </p>
      </div>
    </section>
  );
}

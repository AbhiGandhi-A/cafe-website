"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { Button } from "@/components/ui/Button";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

export default function FavoritesPage() {
  const { favorites } = useCart();
  const [hydrated, setHydrated] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHydrated(true), []);

  const items = menuItems.filter((i) => favorites.includes(i.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow">
          <Heart size={15} className="mr-1 inline" /> Saved
        </p>
        <h1 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-4xl">
          Your Favorites
        </h1>
        <p className="mt-2 text-brand-gray">Everything you loved, all in one place.</p>
      </div>

      <div className="mt-10">
        {!hydrated ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 animate-shimmer rounded-3xl border border-ink-line bg-ink-card" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-yellow/10 text-brand-yellow">
              <Heart size={44} />
            </div>
            <h2 className="font-display mt-4 text-xl font-black text-brand-cream">No favorites yet</h2>
            <p className="mt-2 text-brand-gray">
              Tap the heart icon on any item to save it here.
            </p>
            <Button href="/menu" variant="primary" size="lg" className="mt-6">
              Explore Menu
            </Button>
          </div>
        ) : (
          <MenuGrid items={items} onClearSearch={() => {}} />
        )}
      </div>
    </div>
  );
}

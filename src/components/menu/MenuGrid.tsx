"use client";

import type { MenuItem } from "@/data/menu";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { Pizza } from "lucide-react";

export function MenuGrid({
  items,
  onClearSearch,
}: {
  items: MenuItem[];
  onClearSearch: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-brand-yellow/20 text-brand-charcoal">
          <Pizza size={36} />
        </div>
        <p className="text-xl font-bold text-brand-charcoal">
          No cheesy cravings found.
        </p>
        <p className="text-sm text-brand-gray">
          Try a different search term or category.
        </p>
        <Button variant="primary" onClick={onClearSearch} className="mt-2">
          Clear Search
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

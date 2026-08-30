"use client";

import { useState } from "react";
import Image from "next/image";
import { images as fallbackImages } from "@/data/menu";
import { Salad } from "lucide-react";
import { classNames } from "@/lib/utils";

const categoryFallback = (category: string) => {
  const key = category.toLowerCase();
  if (key.includes("toast")) return fallbackImages.toast;
  if (key.includes("grill")) return fallbackImages.grill;
  if (key.includes("garlic")) return fallbackImages.garlic;
  if (key.includes("rimzim")) return fallbackImages.rimzim;
  if (key.includes("momo")) return fallbackImages.momos;
  if (key.includes("cheesy") || key.includes("pizza"))
    return fallbackImages.pizza;
  if (key.includes("beverage") || key.includes("shake"))
    return fallbackImages.beverages;
  if (key.includes("dessert") || key.includes("brownie"))
    return fallbackImages.dessert;
  return fallbackImages.sandwich;
};

export function ProductImage({
  src,
  alt,
  category,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  category: string;
  className?: string;
  priority?: boolean;
}) {
  const [useCategoryFallback, setUseCategoryFallback] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  if (showPlaceholder) {
    return (
      <div
        className={classNames(
          "grid place-items-center bg-brand-charcoal text-brand-yellow",
          className
        )}
      >
        <Salad size={48} />
      </div>
    );
  }

  return (
    <div className={classNames("relative overflow-hidden", className)}>
      <Image
        src={useCategoryFallback ? categoryFallback(category) : src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
        className="object-cover"
        priority={priority}
        onError={() => {
          if (!useCategoryFallback) {
            setUseCategoryFallback(true);
          } else {
            setShowPlaceholder(true);
          }
        }}
      />
    </div>
  );
}

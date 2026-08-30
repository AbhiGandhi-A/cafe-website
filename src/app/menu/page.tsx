"use client";

import { Suspense } from "react";
import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { MenuSearch } from "@/components/menu/MenuSearch";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { categoryTabs } from "@/data/categories";
import { getItemsByCategory, menuItems } from "@/data/menu";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const tabs = [
  { id: "all", label: "ALL" },
  ...categoryTabs(),
];

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const hydrated = useHydrated();

  useEffect(() => {
    const q = searchParams.get("search") ?? "";
    const c = searchParams.get("category") ?? "all";
    setSearch(q);
    if (tabs.some((t) => t.id === c)) setCategory(c);
  }, [searchParams]);

  const updateCategory = (id: string) => {
    setCategory(id);
    setSearch("");
    router.replace(`/menu?category=${id}`);
  };

  const updateSearch = (v: string) => {
    setSearch(v);
    router.replace(v ? `/menu?search=${encodeURIComponent(v)}` : "/menu");
  };

  const filtered = useMemo(() => {
    let items = getItemsByCategory(category);
    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [category, search]);

  const resultLabel = menuItems.length;

  return (
    <>
      <MenuHero />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          <MenuSearch
            value={hydrated ? search : ""}
            onChange={updateSearch}
            onClear={() => setSearch("")}
          />
          <CategoryTabs tabs={tabs} active={category} onChange={updateCategory} />
        </div>

        {!hydrated ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-3xl bg-brand-border/60"
              />
            ))}
          </div>
        ) : (
          <>
            <p className="mt-8 text-sm text-brand-gray">
              Showing {filtered.length} of {resultLabel} items
              {category !== "all" &&
                ` in ${categoryLabel(category)}`}
            </p>
            <div className="mt-4">
              <MenuGrid items={filtered} onClearSearch={() => setSearch("")} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

function categoryLabel(id: string) {
  const tab = tabs.find((t) => t.id === id);
  return tab ? tab.label.toLowerCase() : id;
}

function useHydrated() {
  const [h, setH] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setH(true), []);
  return h;
}

export default function MenuPage() {
  return (
    <Suspense>
      <MenuContent />
    </Suspense>
  );
}

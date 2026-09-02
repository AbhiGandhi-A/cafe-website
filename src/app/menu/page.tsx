"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { MenuSearch } from "@/components/menu/MenuSearch";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { MenuListRow } from "@/components/menu/MenuList";
import { categoryTabs } from "@/data/categories";
import { getItemsByCategory, menuItems } from "@/data/menu";
import { useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid, List, ChevronDown, Heart } from "lucide-react";
import { getRecentSearches, addRecentSearch, classNames } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const tabs = [{ id: "all", label: "ALL" }, ...categoryTabs(), { id: "favorites", label: "♥ FAVORITES" }];

type SortKey = "recommended" | "price-asc" | "price-desc" | "popular";

function highlightMatch(name: string, q: string): string {
  if (!q) return name;
  const lower = name.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx === -1) return name;
  return (
    name.slice(0, idx) +
    "<b>" +
    name.slice(idx, idx + q.length) +
    "</b>" +
    name.slice(idx + q.length)
  );
}

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [recent, setRecent] = useState<string[]>([]);
  const hydrated = useHydrated();
  const { favorites } = useCart();
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams.get("search") ?? "";
    const c = searchParams.get("category") ?? "all";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(q);
    if (tabs.some((t) => t.id === c)) {
      setCategory(c);
    }
    setRecent(getRecentSearches());
  }, [searchParams]);

  const updateCategory = (id: string) => {
    setCategory(id);
    setSearch("");
    router.replace(`/menu?category=${id}`);
  };

  const updateSearch = (v: string) => {
    setSearch(v);
    if (v.trim()) {
      router.replace(`/menu?search=${encodeURIComponent(v)}&category=${category !== "all" ? category : ""}`);
    } else {
      router.replace(category !== "all" ? `/menu?category=${category}` : "/menu");
    }
  };

  const selectTerm = (term: string) => {
    addRecentSearch(term);
    setRecent(getRecentSearches());
    setSearch(term);
    router.replace(`/menu?search=${encodeURIComponent(term)}`);
  };

  const suggestions = useMemo(() => {
    const q = search.trim();
    if (!q) return [];
    return menuItems
      .filter((i) => i.name.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 5)
      .map((i) => ({ id: i.id, name: i.name, matched: highlightMatch(i.name, q) }));
  }, [search]);

  const filtered = useMemo(() => {
    let items = category === "favorites"
      ? menuItems.filter((i) => favorites.includes(i.id))
      : getItemsByCategory(category);
    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    else if (sort === "popular") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [category, search, sort, favorites]);

  return (
    <>
      <MenuHero />
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-8 lg:px-12">
        <div className="space-y-4">
          <MenuSearch
            value={hydrated ? search : ""}
            onChange={updateSearch}
            onClear={() => {
              setSearch("");
              router.replace(category !== "all" ? `/menu?category=${category}` : "/menu");
            }}
            suggestions={suggestions}
            recentSearches={recent}
            onSelect={(name) => selectTerm(name)}
            onSelectRecent={(term) => selectTerm(term)}
          />
          <div
            ref={toolbarRef}
            className="sticky top-[60px] z-30 -mx-4 border-b border-ink-line bg-ink-dark/95 px-4 py-2 backdrop-blur-lg sm:mx-0 sm:rounded-2xl sm:border sm:px-3"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <CategoryTabs tabs={tabs} active={category} onChange={updateCategory} />
              <div className="flex shrink-0 items-center gap-2">
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    aria-label="Sort products"
                    className="appearance-none rounded-full border border-ink-line bg-ink-card py-2 pl-4 pr-9 text-sm font-semibold text-brand-cream focus:border-brand-yellow focus:outline-none"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="popular">Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray"
                  />
                </div>
                <div className="hidden items-center gap-1 rounded-full border border-ink-line bg-ink-card p-1 sm:flex">
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setView("grid")}
                    className={classNames(
                      "grid h-8 w-8 place-items-center rounded-full transition-colors",
                      view === "grid" ? "bg-brand-yellow text-ink-dark" : "text-brand-gray hover:text-brand-cream"
                    )}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => setView("list")}
                    className={classNames(
                      "grid h-8 w-8 place-items-center rounded-full transition-colors",
                      view === "list" ? "bg-brand-yellow text-ink-dark" : "text-brand-gray hover:text-brand-cream"
                    )}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!hydrated ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-shimmer rounded-3xl border border-ink-line bg-ink-card" />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between text-sm text-brand-gray">
              <p>
                {category === "all"
                  ? `Showing ${filtered.length} of ${menuItems.length} items`
                  : `Showing ${filtered.length} item${filtered.length === 1 ? "" : "s"} in ${categoryLabel(category)}`}
              </p>
              {category === "favorites" && filtered.length === 0 && (
                <span className="inline-flex items-center gap-1 text-brand-yellow">
                  <Heart size={14} /> Tap the heart on anything delicious
                </span>
              )}
            </div>
            <div className="mt-4">
              {view === "grid" ? (
                <MenuGrid items={filtered} onClearSearch={() => selectTerm("")} />
              ) : (
                <div className="space-y-2.5">
                  {filtered.map((item) => (
                    <MenuListRow key={item.id} item={item} />
                  ))}
                  {filtered.length === 0 && (
                    <div className="py-16 text-center text-brand-gray">
                      No items match your search.
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function categoryLabel(id: string) {
  if (id === "favorites") return "Favourites";
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

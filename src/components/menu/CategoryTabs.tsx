"use client";

import { classNames } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

export function CategoryTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={classNames(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200",
              isActive
                ? "border-brand-yellow bg-brand-yellow text-ink-dark"
                : "border-ink-line bg-ink-card text-brand-cream/70 hover:border-white/30 hover:text-brand-cream"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

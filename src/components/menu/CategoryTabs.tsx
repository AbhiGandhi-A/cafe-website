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
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={classNames(
              "shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-200",
              isActive
                ? "border-brand-charcoal bg-brand-charcoal text-brand-yellow"
                : "border-brand-border bg-white text-brand-charcoal/70 hover:border-brand-charcoal/40 hover:text-brand-charcoal"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { Search, X } from "lucide-react";

export function MenuSearch({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search menu..."
        aria-label="Search menu"
        className="w-full rounded-full border-2 border-brand-border bg-white py-3 pl-12 pr-12 text-brand-charcoal placeholder:text-brand-gray focus:border-brand-yellow focus:outline-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/5 text-brand-charcoal transition-colors hover:bg-black/10"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

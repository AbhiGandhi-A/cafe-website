"use client";

import { Search, X, TrendingUp } from "lucide-react";

export function MenuSearch({
  value,
  onChange,
  onClear,
  suggestions,
  recentSearches,
  onSelect,
  onSelectRecent,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  suggestions: { id: string; name: string; matched: string }[];
  recentSearches: string[];
  onSelect: (name: string) => void;
  onSelectRecent: (term: string) => void;
}) {
  const showPanel = (value.trim().length > 0 || recentSearches.length > 0);

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
        placeholder="Search sandwiches, pizza, momos..."
        aria-label="Search menu"
        autoComplete="off"
        className="w-full rounded-2xl border border-ink-line bg-ink-card py-3 pl-12 pr-12 text-brand-cream placeholder:text-brand-gray focus:border-brand-yellow focus:outline-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/5 text-brand-cream transition-colors hover:bg-white/10"
        >
          <X size={16} />
        </button>
      )}

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-ink-line bg-ink-card shadow-lift">
          {value.trim().length > 0 && suggestions.length > 0 && (
            <div className="px-2 py-2">
              <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wide text-brand-gray">
                Suggestions
              </p>
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelect(s.name)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-brand-cream transition-colors hover:bg-white/5"
                >
                  <Search size={14} className="text-brand-gray" />
                  <span className="flex-1">
                    {s.matched.split(/<b>|<\/b>/).map((part, i) =>
                      i % 2 === 1 ? (
                        <b key={i} className="text-brand-yellow">
                          {part}
                        </b>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}
          {value.trim().length === 0 && recentSearches.length > 0 && (
            <div className="px-2 py-2">
              <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wide text-brand-gray">
                Recent Searches
              </p>
              {recentSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSelectRecent(s)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-brand-cream transition-colors hover:bg-white/5"
                >
                  <TrendingUp size={14} className="text-brand-gray" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

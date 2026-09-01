export const STORAGE_KEYS = {
  cart: "ccc_cart",
  favorites: "ccc_favorites",
  orders: "ccc_orders",
  customer: "ccc_customer",
  recentlyViewed: "ccc_recently_viewed",
  recentSearches: "ccc_recent_searches",
  lastOrder: "ccc_last_order",
} as const;

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / availability errors
  }
}

export function removeStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

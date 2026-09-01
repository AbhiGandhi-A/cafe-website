import { openingHours } from "@/data/cafe";
import { readStorage, writeStorage } from "./storage";

export * from "./currency";
export * from "./cart";

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string): boolean =>
  /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""));

export const isValidPincode = (pincode: string): boolean =>
  /^[1-9][0-9]{5}$/.test(pincode.trim());

export const classNames = (
  ...classes: Array<string | false | undefined | null>
) => classes.filter(Boolean).join(" ");

export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  const parsed = readStorage<string[]>("ccc_favorites", []);
  return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
};

export const toggleFavorite = (id: string): boolean => {
  const favs = getFavorites();
  const exists = favs.includes(id);
  const next = exists ? favs.filter((f) => f !== id) : [...favs, id];
  writeStorage("ccc_favorites", next);
  return !exists;
};

export const isFavorite = (id: string): boolean => getFavorites().includes(id);

export const getRecentlyViewed = (): string[] => {
  return readStorage<string[]>("ccc_recently_viewed", []);
};

export const addRecentlyViewed = (id: string): void => {
  const list = getRecentlyViewed().filter((x) => x !== id);
  writeStorage("ccc_recently_viewed", [id, ...list].slice(0, 6));
};

export const getRecentSearches = (): string[] => {
  return readStorage<string[]>("ccc_recent_searches", []);
};

export const addRecentSearch = (term: string): void => {
  const t = term.trim();
  if (!t) return;
  const list = getRecentSearches().filter((x) => x !== t);
  writeStorage("ccc_recent_searches", [t, ...list].slice(0, 5));
};

export const getCustomerDetails = (): Record<string, string> => {
  return readStorage<Record<string, string>>("ccc_customer", {});
};

export const saveCustomerDetails = (details: Record<string, string>): void => {
  const allowed = ["name", "phone", "email", "address", "city", "pincode"];
  const clean: Record<string, string> = {};
  allowed.forEach((k) => {
    if (details[k]) clean[k] = details[k];
  });
  writeStorage("ccc_customer", clean);
};

export const clearCustomerDetails = (): void => {
  try {
    window.localStorage.removeItem("ccc_customer");
  } catch {
    // ignore
  }
};

export interface OpenStatus {
  isOpen: boolean;
  label: string;
  closesAt?: string;
  opensAt?: string;
}
export const getSavedCouponCode = (): string => {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem("ccc_coupon") ?? "";
  } catch {
    return "";
  }
};

export const saveCouponCode = (code: string): void => {
  try {
    window.localStorage.setItem("ccc_coupon", code.trim().toUpperCase());
  } catch {
    // ignore
  }
};

export const clearCouponCode = (): void => {
  try {
    window.localStorage.removeItem("ccc_coupon");
  } catch {
    // ignore
  }
};

export const getOpenStatus = (now: Date = new Date()): OpenStatus => {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const openMin = toMinutes(openingHours.open);
  const closeMin = toMinutes(openingHours.close);
  if (nowMin >= openMin && nowMin < closeMin) {
    return { isOpen: true, label: "Open Now", closesAt: openingHours.close };
  }
  return { isOpen: false, label: "Currently Closed", opensAt: openingHours.open };
};

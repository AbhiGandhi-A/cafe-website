import { storeConfig } from "@/data/cafe";

export const formatPrice = (amount: number): string =>
  `${storeConfig.currency}${Math.round(amount)}`;

export interface CartLine {
  productId: string;
  quantity: number;
}

export const getSubtotal = (lines: CartLine[], priceLookup: (id: string) => number) =>
  lines.reduce((sum, line) => sum + priceLookup(line.productId) * line.quantity, 0);

export const getTax = (subtotal: number) => Math.round(subtotal * storeConfig.taxRate);

export const getDeliveryFee = (subtotal: number, isDelivery: boolean) => {
  if (!isDelivery) return 0;
  if (subtotal >= storeConfig.freeDeliveryAbove) return 0;
  return storeConfig.deliveryFee;
};

export const getTotal = (subtotal: number, tax: number, delivery: number) =>
  subtotal + tax + delivery;

export const generateOrderId = (): string => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `CCC-2026-${num}`;
};

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string): boolean =>
  /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""));

export const isValidPincode = (pincode: string): boolean =>
  /^[1-9][0-9]{5}$/.test(pincode.trim());

export const classNames = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(" ");

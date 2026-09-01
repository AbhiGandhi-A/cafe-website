import { storeConfig, type Coupon } from "@/data/cafe";

export interface CartCustomization {
  code: string;
  label: string;
  price: number;
}

export interface CartLine {
  productId: string;
  quantity: number;
  customizations: CartCustomization[];
}

export const getCustomizations = (
  customizations?: CartCustomization[] | null
): CartCustomization[] => customizations ?? [];

export const lineUnitPrice = (
  basePrice: number,
  customizations?: CartCustomization[] | null
) => basePrice + getCustomizations(customizations).reduce((s, c) => s + c.price, 0);

export const lineTotal = (
  basePrice: number,
  quantity: number,
  customizations?: CartCustomization[] | null
) => lineUnitPrice(basePrice, customizations) * quantity;

export const getSubtotal = (
  lines: CartLine[],
  priceLookup: (id: string) => number
) =>
  lines.reduce(
    (sum, line) =>
      sum +
      lineTotal(priceLookup(line.productId), line.quantity, line.customizations),
    0
  );

export const getTax = (subtotal: number) =>
  Math.round(subtotal * storeConfig.taxRate);

export const getDeliveryFee = (subtotal: number, isDelivery: boolean) => {
  if (!isDelivery) return 0;
  if (subtotal >= storeConfig.freeDeliveryAbove) return 0;
  return storeConfig.deliveryFee;
};

export const getTotal = (
  subtotal: number,
  tax: number,
  delivery: number,
  discount = 0
) => Math.max(subtotal - discount, 0) + tax + delivery;

export interface QuantityBreakdown {
  subtotal: number;
  discount: number;
  delivery: number;
  tax: number;
  total: number;
}

export const calculateTotals = (
  lines: CartLine[],
  priceLookup: (id: string) => number,
  isDelivery: boolean,
  coupon: Coupon | null
): QuantityBreakdown => {
  const subtotal = getSubtotal(lines, priceLookup);
  const discount = coupon ? applyCoupon(coupon, subtotal) : 0;
  const afterDiscount = Math.max(subtotal - discount, 0);
  const delivery = getDeliveryFee(subtotal, isDelivery);
  const tax = getTax(afterDiscount);
  const total = Math.max(afterDiscount + tax + delivery, 0);
  return { subtotal, discount, delivery, tax, total };
};

export const applyCoupon = (coupon: Coupon, subtotal: number): number => {
  if (subtotal < coupon.minimum) return 0;
  if (coupon.type === "percentage") {
    return Math.round((subtotal * coupon.value) / 100);
  }
  return Math.min(coupon.value, subtotal);
};

export interface CouponResult {
  valid: boolean;
  message: string;
  coupon: Coupon | null;
}

export const validateCoupon = (code: string, subtotal: number, coupons: Coupon[]): CouponResult => {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { valid: false, message: "", coupon: null };
  const coupon = coupons.find((c) => c.id === trimmed);
  if (!coupon) return { valid: false, message: "Invalid coupon code.", coupon: null };
  if (subtotal < coupon.minimum) {
    return {
      valid: false,
      message: `Minimum order of ₹${coupon.minimum} required for this coupon.`,
      coupon: null,
    };
  }
  return { valid: true, message: `Coupon ${coupon.id} applied!`, coupon };
};

export const generateOrderId = (): string => {
  const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
  return `CCC-${randomPart}`;
};

export * from "./currency";
export { storeConfig };

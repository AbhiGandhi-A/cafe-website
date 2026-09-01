import { menuItems } from "@/data/menu";
import { readStorage, writeStorage, STORAGE_KEYS } from "./storage";
import type { CartLine } from "./cart";

export type OrderStatus = "confirmed" | "preparing" | "ready" | "delivered";

export interface SavedOrder {
  id: string;
  items: CartLine[];
  subtotal: number;
  discount: number;
  delivery: number;
  tax: number;
  total: number;
  orderType: "pickup" | "delivery";
  paymentMethod: string;
  details: Record<string, string>;
  couponCode?: string;
  createdAt: string;
}

export const getOrders = (): SavedOrder[] => {
  return readStorage<SavedOrder[]>(STORAGE_KEYS.orders, []);
};

export const saveOrder = (order: SavedOrder): void => {
  const orders = getOrders();
  writeStorage(STORAGE_KEYS.orders, [order, ...orders]);
  writeStorage(STORAGE_KEYS.lastOrder, order);
};

export const getLastOrder = (): SavedOrder | null => {
  return readStorage<SavedOrder | null>(STORAGE_KEYS.lastOrder, null);
};

export const getOrderById = (id: string): SavedOrder | undefined => {
  return getOrders().find((o) => o.id === id);
};

export const statusTimeline: OrderStatus[] = [
  "confirmed",
  "preparing",
  "ready",
  "delivered",
];

export const getStatusIndex = (status: OrderStatus): number =>
  statusTimeline.indexOf(status);

export const getCurrentStatus = (createdAt: string): OrderStatus => {
  const minutes = (Date.now() - new Date(createdAt).getTime()) / 60000;
  if (minutes < 1) return "confirmed";
  if (minutes < 2) return "preparing";
  if (minutes < 3) return "ready";
  return "delivered";
};

export const getStatusLabel = (status: OrderStatus): string =>
  status === "confirmed"
    ? "Order Confirmed"
    : status === "preparing"
      ? "Preparing"
      : status === "ready"
        ? "Ready / Out for Delivery"
        : "Delivered";

export const reorderItems = (order: SavedOrder): CartLine[] => {
  return order.items
    .filter((line) => menuItems.some((m) => m.id === line.productId))
    .map((line) => ({ ...line }));
};

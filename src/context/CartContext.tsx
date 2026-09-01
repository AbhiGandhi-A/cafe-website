"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { menuItems, getItemById } from "@/data/menu";
import type { CartLine, CartCustomization } from "@/lib/cart";
import {
  readStorage,
  writeStorage,
  STORAGE_KEYS,
} from "@/lib/storage";

export const getLineKey = (productId: string, customizations: CartCustomization[] = []) =>
  `${productId}|${customizations.map((c) => c.code).sort().join(",")}`;

interface CartContextValue {
  cart: CartLine[];
  addToCart: (
    productId: string,
    quantity?: number,
    customizations?: CartCustomization[]
  ) => boolean;
  removeFromCart: (key: string) => void;
  increaseQuantity: (key: string) => void;
  decreaseQuantity: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => boolean;
  recentlyViewed: string[];
  trackRecentlyViewed: (id: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(readStorage<CartLine[]>(STORAGE_KEYS.cart, []));
    setFavorites(readStorage<string[]>(STORAGE_KEYS.favorites, []));
    setRecentlyViewed(
      readStorage<string[]>(STORAGE_KEYS.recentlyViewed, [])
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.cart, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.recentlyViewed, recentlyViewed);
  }, [recentlyViewed, hydrated]);

  const addToCart = useCallback(
    (
      productId: string,
      quantity = 1,
      customizations: CartCustomization[] = []
    ): boolean => {
      const product = getItemById(productId);
      if (!product || product.available === false) return false;
      const key = getLineKey(productId, customizations);
      setCart((prev) => {
        const existing = prev.find((item) => getLineKey(item.productId, item.customizations) === key);
        if (existing) {
          return prev.map((item) =>
            getLineKey(item.productId, item.customizations) === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { productId, quantity, customizations }];
      });
      return true;
    },
    []
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) =>
      prev.filter((item) => getLineKey(item.productId, item.customizations) !== key)
    );
  }, []);

  const increaseQuantity = useCallback((key: string) => {
    setCart((prev) =>
      prev.map((item) =>
        getLineKey(item.productId, item.customizations) === key
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((key: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          getLineKey(item.productId, item.customizations) === key
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback((id: string): boolean => {
    let added = false;
    setFavorites((prev) => {
      const exists = prev.includes(id);
      added = !exists;
      return exists ? prev.filter((f) => f !== id) : [...prev, id];
    });
    return added;
  }, []);

  const trackRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 6));
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartCount,
      isCartOpen,
      openCart,
      closeCart,
      favorites,
      toggleFavorite,
      recentlyViewed,
      trackRecentlyViewed,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartCount,
      isCartOpen,
      openCart,
      closeCart,
      favorites,
      toggleFavorite,
      recentlyViewed,
      trackRecentlyViewed,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export { menuItems };

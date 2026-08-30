"use client";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/Toast";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        {children}
        <CartDrawer />
      </ToastProvider>
    </CartProvider>
  );
}

"use client";

import { useCart } from "@/context/CartContext";
import { CartItemView } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { cart, getCartSubtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black uppercase text-brand-charcoal sm:text-4xl">
            Your Cart
          </h1>
        </div>
        <EmptyCart />
      </div>
    );
  }

  const subtotal = getCartSubtotal();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-red">
          Review your order
        </p>
        <h1 className="mt-1 text-3xl font-black uppercase text-brand-charcoal sm:text-4xl">
          Your Cart
        </h1>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <CartItemView
                key={item.productId}
                productId={item.productId}
                quantity={item.quantity}
              />
            ))}
          </ul>
        </div>
        <div className="lg:sticky lg:top-20">
          <CartSummary subtotal={subtotal} isDelivery={false} />
        </div>
      </div>
    </div>
  );
}

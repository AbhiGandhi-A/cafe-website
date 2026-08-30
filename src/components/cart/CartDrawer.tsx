"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getItemById } from "@/data/menu";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import {
  formatPrice,
  getDeliveryFee,
  getTax,
  getTotal,
} from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartSubtotal,
  } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const delivery = getDeliveryFee(subtotal, true);
  const tax = getTax(subtotal);
  const total = getTotal(subtotal, tax, delivery);

  const goCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 animate-overlay-in bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md animate-drawer-in flex-col bg-white shadow-lift"
      >
        <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-red" />
            <h2 className="text-lg font-extrabold uppercase tracking-wide text-brand-charcoal">
              Your Cart
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full bg-black/5 text-brand-charcoal transition-colors hover:bg-black/10"
          >
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-brand-yellow/20 text-brand-red">
              <ShoppingBag size={36} />
            </div>
            <p className="text-lg font-bold text-brand-charcoal">
              Your cart is empty
            </p>
            <p className="text-sm text-brand-gray">
              Add some cheesy goodness to get started.
            </p>
            <Button
              href="/menu"
              onClick={closeCart}
              variant="primary"
              className="mt-2"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {cart.map((item) => {
                  const product = getItemById(item.productId);
                  if (!product) return null;
                  return (
                    <li
                      key={item.productId}
                      className="flex gap-3 rounded-2xl border border-brand-border p-3"
                    >
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        className="h-20 w-20 shrink-0 rounded-xl"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-brand-charcoal">
                            {product.name}
                          </p>
                          <button
                            type="button"
                            aria-label={`Remove ${product.name} from cart`}
                            onClick={() => removeFromCart(item.productId)}
                            className="text-brand-gray transition-colors hover:text-brand-red"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-brand-red">
                          {formatPrice(product.price)}
                        </p>
                        <div className="mt-auto pt-2">
                          <QuantitySelector
                            small
                            quantity={item.quantity}
                            onIncrease={() => increaseQuantity(item.productId)}
                            onDecrease={() => decreaseQuantity(item.productId)}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-3 border-t border-brand-border px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-brand-gray">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-charcoal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-brand-gray">
                  <span>Delivery</span>
                  <span className="font-semibold text-brand-charcoal">
                    {delivery === 0 ? "FREE" : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-dashed border-brand-border pt-1.5 text-base font-extrabold text-brand-charcoal">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button
                href="/cart"
                variant="outline"
                size="full"
                onClick={closeCart}
              >
                View Cart
              </Button>
              <Button variant="primary" size="full" onClick={goCheckout}>
                Checkout <ArrowRight size={18} />
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

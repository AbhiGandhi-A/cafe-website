"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Home, Soup, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getItemById } from "@/data/menu";
import { orderTimings } from "@/data/cafe";
import { formatPrice } from "@/lib/utils";

interface SavedOrder {
  id: string;
  items: { productId: string; quantity: number }[];
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  orderType: "pickup" | "delivery";
  paymentMethod: string;
}

const ORDER_KEY = "ccc-last-order";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ORDER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setOrder(JSON.parse(raw) as SavedOrder);
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrder(null);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-brand-border" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-2xl font-black text-brand-charcoal">
          No recent order found
        </p>
        <p className="mt-2 text-brand-gray">
          Looks like you haven&apos;t placed an order yet.
        </p>
        <Button href="/menu" variant="primary" size="lg" className="mt-6">
          Browse Menu
        </Button>
      </div>
    );
  }

  const isOnline = order.paymentMethod === "online";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="text-center">
        <div className="mx-auto grid h-24 w-24 animate-pop place-items-center rounded-full bg-green-500/15 text-green-600">
          <CheckCircle2 size={56} strokeWidth={2} />
        </div>
        <h1 className="mt-6 text-3xl font-black uppercase text-brand-charcoal sm:text-4xl">
          Order Placed!
        </h1>
        <p className="mt-2 text-brand-gray">
          Thank you for ordering from Crazy Cheesy Cafe.
        </p>
        {isOnline && (
          <p className="mt-1 text-sm font-bold text-green-600">
            Payment Successful
          </p>
        )}
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-brand-border bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-brand-border bg-brand-dark px-6 py-4 text-brand-cream">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-gray">
            Order ID
          </span>
          <span className="text-lg font-black text-brand-yellow">{order.id}</span>
        </div>

        <div className="space-y-3 px-6 py-5">
          {order.items.map((item) => {
            const product = getItemById(item.productId);
            if (!product) return null;
            return (
              <div key={item.productId} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-yellow text-xs font-black text-brand-charcoal">
                  {item.quantity}
                </span>
                <span className="flex-1 truncate font-semibold text-brand-charcoal">
                  {product.name}
                </span>
                <span className="font-bold text-brand-charcoal">
                  {formatPrice(product.price * item.quantity)}
                </span>
              </div>
            );
          })}

          <div className="mt-2 space-y-1.5 border-t border-dashed border-brand-border pt-3 text-sm">
            <div className="flex justify-between text-brand-gray">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-brand-gray">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-brand-gray">
              <span>Delivery</span>
              <span>
                {order.delivery === 0 ? "FREE" : formatPrice(order.delivery)}
              </span>
            </div>
            <div className="flex justify-between border-t border-dashed border-brand-border pt-2 text-lg font-black text-brand-charcoal">
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-brand-border bg-brand-border sm:grid-cols-3">
          <div className="bg-white p-4">
            <p className="text-xs font-bold uppercase text-brand-gray">Order Type</p>
            <p className="mt-1 font-extrabold capitalize text-brand-charcoal">
              {order.orderType}
            </p>
          </div>
          <div className="bg-white p-4">
            <p className="text-xs font-bold uppercase text-brand-gray">
              Payment Method
            </p>
            <p className="mt-1 font-extrabold capitalize text-brand-charcoal">
              {order.paymentMethod === "online" ? "Online" : "Cash"}
            </p>
          </div>
          <div className="col-span-2 bg-white p-4 sm:col-span-1">
            <p className="text-xs font-bold uppercase text-brand-gray">
              {order.orderType === "delivery"
                ? "Estimated Delivery"
                : "Preparation Time"}
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-extrabold text-brand-charcoal">
              <PackageCheck size={16} className="text-brand-red" />
              {order.orderType === "delivery"
                ? orderTimings.deliveryTime
                : orderTimings.pickupPreparation}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/" variant="outline" size="lg">
          <Home size={18} /> Back to Home
        </Button>
        <Button href="/menu" variant="primary" size="lg">
          <Soup size={18} /> Order More
        </Button>
      </div>
    </div>
  );
}

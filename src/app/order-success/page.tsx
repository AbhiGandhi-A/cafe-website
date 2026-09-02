"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Home, MapPin, PackageCheck, RefreshCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getItemById } from "@/data/menu";
import { orderTimings } from "@/data/cafe";
import { formatPrice } from "@/lib/utils";
import { getOrderById, getLastOrder, type SavedOrder } from "@/lib/orders";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

const timeline = ["Order Placed", "Preparing", "Ready / Out for Delivery", "Delivered"];

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    let o = null;
    if (orderIdParam) {
      o = getOrderById(orderIdParam);
    }
    if (!o) {
      o = getLastOrder();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(o ?? null);
    setLoaded(true);
  }, [orderIdParam]);

  if (!loaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-ink-card" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-2xl font-black text-brand-cream">No recent order found</p>
        <p className="mt-2 text-brand-gray">Looks like you haven&apos;t placed an order yet.</p>
        <Button href="/menu" variant="primary" size="lg" className="mt-6">
          Browse Menu
        </Button>
      </div>
    );
  }

  const isDelivery = order.orderType === "delivery";
  const orderDate = new Date(order.createdAt).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const reorder = () => {
    order.items.forEach((item) => addToCart(item.productId, item.quantity, item.customizations));
    toast("Items added back to your cart");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="text-center">
        <div className="mx-auto grid h-24 w-24 animate-pop place-items-center rounded-full bg-green-500/15 text-green-500">
          <CheckCircle2 size={56} strokeWidth={2} />
        </div>
        <h1 className="font-display mt-6 text-3xl font-black uppercase text-brand-cream sm:text-4xl">
          Your order is confirmed!
        </h1>
        <p className="mt-2 text-brand-gray">
          Thank you for ordering from Crazy Cheesy Cafe.
        </p>
        <p className="mt-3 inline-block rounded-full bg-brand-yellow/15 px-4 py-1.5 text-sm font-bold text-brand-yellow">
          Order ID: {order.id}
        </p>
        <p className="mt-3 text-sm text-brand-gray">
          Estimated time:{" "}
          <span className="font-bold text-brand-cream">
            {isDelivery ? orderTimings.deliveryTime : orderTimings.pickupPreparation}
          </span>
        </p>
      </div>

      <div className="card-dark mt-8 p-6">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-gray">
          Order Status
        </h2>
        <div className="mt-5">
          {timeline.map((step, i) => {
            const active = i === 0;
            return (
              <div key={step} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={
                      "grid h-9 w-9 place-items-center rounded-full border " +
                      (active
                        ? "border-brand-yellow bg-brand-yellow text-ink-dark"
                        : "border-ink-line bg-ink-card text-brand-gray")
                    }
                  >
                    {active ? <CheckCircle2 size={16} /> : i + 1}
                  </span>
                  {i < timeline.length - 1 && (
                    <span className="w-0.5 flex-1 bg-ink-line" />
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <p className={"font-semibold " + (active ? "text-brand-cream" : "text-brand-gray")}>
                    {step}
                  </p>
                  {active && (
                    <p className="text-xs text-brand-gray">{isDelivery ? "Confirmed" : "Confirmed"}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-dark mt-6 overflow-hidden">
        <div className="border-b border-ink-line px-6 py-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
            Order Summary
          </h2>
        </div>
        <div className="space-y-3 px-6 py-5">
          {order.items.map((item, idx) => {
            const product = getItemById(item.productId);
            if (!product) return null;
            const unit = product.price + (item.customizations ?? []).reduce((s, c) => s + c.price, 0);
            return (
              <div key={item.productId + idx} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-yellow text-xs font-black text-ink-dark">
                  {item.quantity}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-brand-cream">{product.name}</p>
                  {(item.customizations ?? []).length > 0 && (
                    <p className="truncate text-[11px] text-brand-gray">
                      {item.customizations!.map((c) => c.label).join(", ")}
                    </p>
                  )}
                </div>
                <span className="font-bold text-brand-cream">
                  {formatPrice(unit * item.quantity)}
                </span>
              </div>
            );
          })}

          {order.details?.orderNotes && (
            <p className="rounded-xl bg-ink-charcoal px-3 py-2 text-xs text-brand-gray">
              <span className="font-bold text-brand-cream">Note:</span> {order.details.orderNotes}
            </p>
          )}

          <div className="mt-2 space-y-1.5 border-t border-dashed border-ink-line pt-3 text-sm">
            <div className="flex justify-between text-brand-gray">
              <span>Subtotal</span>
              <span className="text-brand-cream">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>?{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-brand-gray">
              <span>Tax</span>
              <span className="text-brand-cream">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-brand-gray">
              <span>Delivery</span>
              <span className="text-brand-cream">
                {order.delivery === 0 ? "FREE" : formatPrice(order.delivery)}
              </span>
            </div>
            <div className="flex justify-between border-t border-dashed border-ink-line pt-2 text-lg font-black text-brand-cream">
              <span>Total Paid</span>
              <span className="text-brand-yellow">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-dark mt-6 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold uppercase text-brand-gray">Customer</p>
            <p className="mt-1 font-extrabold text-brand-cream">{order.details?.name}</p>
            <p className="text-sm text-brand-gray">{order.details?.phone}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-gray">Payment</p>
            <p className="mt-1 font-extrabold capitalize text-brand-cream">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-gray">Order Type</p>
            <p className="mt-1 flex items-center gap-1.5 font-extrabold capitalize text-brand-cream">
              <PackageCheck size={15} className="text-brand-yellow" /> {order.orderType}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-gray">Placed On</p>
            <p className="mt-1 font-extrabold text-brand-cream">{orderDate}</p>
          </div>
        </div>
        {isDelivery && order.details?.address && (
          <div className="mt-4 flex items-start gap-2 border-t border-ink-line pt-4 text-sm">
            <MapPin size={16} className="mt-0.5 shrink-0 text-brand-yellow" />
            <p className="text-brand-cream/85">
              {order.details.address}
              {order.details.landmark ? `, ${order.details.landmark}` : ""}, {order.details.city} -{" "}
              {order.details.pincode}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href={`/order/${order.id}`} variant="primary" size="lg">
          <Truck size={18} /> Track Order
        </Button>
        <Button variant="secondary" size="lg" onClick={reorder}>
          <RefreshCw size={18} /> Order Again
        </Button>
        <Button href="/" variant="outline" size="lg">
          <Home size={18} /> Back Home
        </Button>
      </div>
    </div>
  );
}

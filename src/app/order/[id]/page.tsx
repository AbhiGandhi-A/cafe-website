"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, Circle, Home, RefreshCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getItemById } from "@/data/menu";
import { formatPrice } from "@/lib/utils";
import { getOrderById, getCurrentStatus, getStatusLabel, statusTimeline, type SavedOrder, type OrderStatus } from "@/lib/orders";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<OrderStatus>("confirmed");
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const o = getOrderById(id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(o ?? null);
    setLoaded(true);
    if (o) {
      setStatus(getCurrentStatus(o.createdAt));
      const t = setInterval(() => setStatus(getCurrentStatus(o.createdAt)), 5000);
      return () => clearInterval(t);
    }
  }, [id]);

  const reorder = () => {
    if (!order) return;
    order.items.forEach((item) => addToCart(item.productId, item.quantity, item.customizations));
    toast("Items added back to your cart");
  };

  if (!loaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-ink-card" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-2xl font-black text-brand-cream">Order not found</p>
        <p className="mt-2 text-brand-gray">We couldn&apos;t find that order on this device.</p>
        <Button href="/orders" variant="primary" size="lg" className="mt-6">
          View Your Orders
        </Button>
      </div>
    );
  }

  const currentIdx = statusTimeline.indexOf(status);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow">Demo Order Tracking</p>
        <h1 className="font-display mt-2 text-3xl font-black uppercase text-brand-cream">Order #{order.id}</h1>
        <p className="mt-1 text-sm text-brand-gray">Crazy Cheesy Cafe</p>
      </div>

      <div className="card-dark mt-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-gray">Live Status</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-bold text-brand-yellow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-yellow" />
            </span>
            {getStatusLabel(status)}
          </span>
        </div>

        <div>
          {statusTimeline.map((s, i) => {
            const done = i <= currentIdx;
            const active = i === currentIdx;
            return (
              <div key={s} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={
                      "grid h-10 w-10 place-items-center rounded-full border transition-all " +
                      (done
                        ? "border-brand-yellow bg-brand-yellow text-ink-dark"
                        : "border-ink-line bg-ink-card text-brand-gray")
                    }
                  >
                    {done ? <CheckCircle2 size={18} /> : <Circle size={16} />}
                  </span>
                  {i < statusTimeline.length - 1 && (
                    <span className={"w-0.5 flex-1 " + (done ? "bg-brand-yellow" : "bg-ink-line")} />
                  )}
                </div>
                <div className={"pb-6 pt-1 " + (active ? "" : "")}>
                  <p className={"font-bold " + (done ? "text-brand-cream" : "text-brand-gray")}>{getStatusLabel(s)}</p>
                  <p className="text-xs text-brand-gray">{done ? "Done" : "Pending"}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 rounded-xl bg-ink-charcoal px-3 py-2 text-xs text-brand-gray">
          Demo simulation: status advances after ~1 minute (Confirmed), 2 minutes (Preparing), 3 minutes (Ready).
        </p>
      </div>

      <div className="card-dark mt-6 p-6">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-gray">Order Items</h2>
        <div className="mt-4 space-y-2">
          {order.items.map((item, idx) => {
            const product = getItemById(item.productId);
            if (!product) return null;
            const unit = product.price + (item.customizations ?? []).reduce((s, c) => s + c.price, 0);
            return (
              <div key={item.productId + idx} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 flex-1 truncate text-brand-cream">
                  <span className="font-bold text-brand-yellow">{item.quantity}×</span> {product.name}
                </span>
                <span className="font-semibold text-brand-cream">{formatPrice(unit * item.quantity)}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between border-t border-dashed border-ink-line pt-3 text-base font-black text-brand-cream">
          <span>Total</span>
          <span className="text-brand-yellow">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/orders" variant="primary" size="lg">
          <Truck size={18} /> Order History
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

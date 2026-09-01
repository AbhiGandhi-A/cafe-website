"use client";

import { useEffect, useState } from "react";
import { PackageOpen, RefreshCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getItemById } from "@/data/menu";
import { formatPrice } from "@/lib/utils";
import { getOrders, getCurrentStatus, getStatusLabel, type SavedOrder } from "@/lib/orders";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getOrders());
    setLoaded(true);
  }, []);

  const reorder = (order: SavedOrder) => {
    order.items.forEach((item) => addToCart(item.productId, item.quantity, item.customizations));
    toast("Items added back to your cart");
  };

  if (!loaded) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-ink-card" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-yellow/10 text-brand-yellow">
          <PackageOpen size={44} />
        </div>
        <h1 className="font-display mt-4 text-2xl font-black text-brand-cream">No orders yet</h1>
        <p className="mt-2 text-brand-gray">Your placed orders will appear here.</p>
        <Button href="/menu" variant="primary" size="lg" className="mt-6">
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow">History</p>
        <h1 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-4xl">
          Your Orders
        </h1>
        <p className="mt-2 text-brand-gray">Track and reorder from your past purchases.</p>
      </div>

      <div className="mt-10 space-y-4">
        {orders.map((order) => {
          const status = getCurrentStatus(order.createdAt);
          const orderDate = new Date(order.createdAt).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          const count = order.items.reduce((s, i) => s + i.quantity, 0);
          return (
            <div key={order.id} className="card-dark p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-black text-brand-cream">#{order.id}</p>
                  <p className="text-xs text-brand-gray">{orderDate} · {order.orderType} · {count} item{count > 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-brand-yellow">{formatPrice(order.total)}</span>
                  <span className="rounded-full bg-ink-charcoal px-3 py-1 text-xs font-bold text-brand-cream">
                    {getStatusLabel(status)}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {order.items.map((item, idx) => {
                  const product = getItemById(item.productId);
                  if (!product) return null;
                  return (
                    <span key={item.productId + idx} className="rounded-full border border-ink-line px-2.5 py-0.5 text-xs text-brand-cream/80">
                      {product.name} ×{item.quantity}
                    </span>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button href={`/order/${order.id}`} variant="primary" size="sm">
                  <Truck size={15} /> Track
                </Button>
                <Button variant="secondary" size="sm" onClick={() => reorder(order)}>
                  <RefreshCw size={15} /> Reorder
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

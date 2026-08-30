import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-yellow/20 text-brand-charcoal">
        <ShoppingBag size={44} />
      </div>
      <h1 className="text-2xl font-black text-brand-charcoal sm:text-3xl">
        Your cart is feeling a little empty.
      </h1>
      <p className="max-w-sm text-brand-gray">
        Fill it up with some cheesy goodness from our menu.
      </p>
      <Button href="/menu" variant="primary" size="lg" className="mt-3">
        Browse Menu
      </Button>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | Crazy Cheesy Cafe",
  description:
    "Review the items in your cart, apply a coupon code and checkout for pickup or delivery from Crazy Cheesy Cafe.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

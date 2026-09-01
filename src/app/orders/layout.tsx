import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Orders | Crazy Cheesy Cafe",
  description:
    "View your past orders from Crazy Cheesy Cafe, track their status and reorder your favourite items with one tap.",
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

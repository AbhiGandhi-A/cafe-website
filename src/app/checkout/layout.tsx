import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Crazy Cheesy Cafe",
  description:
    "Place your order at Crazy Cheesy Cafe. Choose pickup or delivery and pay at counter or online.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

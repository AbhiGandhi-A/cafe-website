import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | Crazy Cheesy Cafe",
  description:
    "Review the cheesy goodness in your cart at Crazy Cheesy Cafe and proceed to checkout.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

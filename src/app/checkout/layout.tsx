import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Crazy Cheesy Cafe",
  description:
    "Confirm your delivery or pickup details, choose a payment method and place your order at Crazy Cheesy Cafe.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

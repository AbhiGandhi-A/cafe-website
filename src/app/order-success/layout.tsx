import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | Crazy Cheesy Cafe",
  description:
    "Your Crazy Cheesy Cafe order has been placed. Track its status here.",
  robots: { index: false, follow: false },
};

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

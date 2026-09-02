import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Order Confirmed | Crazy Cheesy Cafe",
  description:
    "Your Crazy Cheesy Cafe order has been placed. Track its status here.",
  robots: { index: false, follow: false },
};

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-brand-yellow/20" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

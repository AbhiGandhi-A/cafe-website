import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Food Online | Menu | Crazy Cheesy Cafe",
  description:
    "Explore sandwiches, pizzas, momos, garlic bread, beverages and desserts. Search, filter, sort and add your favourites to the cart.",
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

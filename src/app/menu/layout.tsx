import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Crazy Cheesy Cafe",
  description:
    "Browse sandwiches, pizzas, momos, garlic bread, beverages and desserts at Crazy Cheesy Cafe. Find your next cheesy favourite.",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

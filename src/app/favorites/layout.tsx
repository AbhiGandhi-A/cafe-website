import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Favorites | Crazy Cheesy Cafe",
  description:
    "All your hearted dishes from Crazy Cheesy Cafe, kept in one place for quick reordering.",
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

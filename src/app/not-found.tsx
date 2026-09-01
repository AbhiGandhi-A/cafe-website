import { Pizza } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-yellow/15 text-brand-yellow">
        <Pizza size={48} />
      </div>
      <p className="font-display mt-6 text-7xl font-black text-brand-yellow">404</p>
      <h1 className="font-display mt-2 text-2xl font-black uppercase text-brand-cream">
        This slice doesn&apos;t exist
      </h1>
      <p className="mt-2 max-w-sm text-brand-gray">
        The page you&apos;re looking for has melted away. Let&apos;s get you back to something delicious.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="primary" size="lg">
          Back Home
        </Button>
        <Button href="/menu" variant="outline" size="lg">
          Browse Menu
        </Button>
      </div>
    </div>
  );
}

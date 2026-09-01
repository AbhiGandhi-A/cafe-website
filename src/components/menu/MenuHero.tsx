import { Badge } from "@/components/ui/Badge";

export function MenuHero() {
  return (
    <section className="relative overflow-hidden bg-ink-dark text-brand-cream">
      <div className="absolute inset-0 brand-dots" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-yellow/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        <Badge tone="yellow" className="mb-4">
          Fresh & cheesy, always
        </Badge>
        <h1 className="font-display text-shadow-brand text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
          Our Menu
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-brand-cream/80">
          Pick your craving.
        </p>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-ink-line bg-gradient-to-br from-ink-card to-ink-dark px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <div className="absolute inset-0 brand-dots opacity-30" aria-hidden />
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-yellow">
              Don&apos;t wait
            </p>
            <h2 className="font-display mt-3 text-4xl font-black uppercase leading-tight text-brand-cream sm:text-5xl lg:text-6xl">
              Ready to get
              <br />
              <span className="gradient-text">cheesy?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-brand-cream/70">
              Your next favourite bite is just a few clicks away.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/menu" variant="primary" size="lg">
                Order Now
              </Button>
              <Button href="/menu" variant="outline" size="lg">
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-yellow px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <div className="absolute inset-0 brand-dots opacity-30" aria-hidden />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
              Don&apos;t wait
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-tight text-brand-charcoal sm:text-5xl lg:text-6xl">
              Ready to get cheesy?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-brand-charcoal/80">
              Your next favourite bite is just a few clicks away.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/checkout" variant="dark" size="lg">
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

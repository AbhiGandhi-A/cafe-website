import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reviews = [
  {
    quote: "Perfect evening snack spot. The grill sandwich is seriously loaded.",
    name: "Aarav M.",
  },
  {
    quote: "Momos + cold coffee = the perfect combo. Can't get enough!",
    name: "Sneha K.",
  },
  {
    quote: "That cheese pull on the garlic bread is unreal. Highly recommend.",
    name: "Rohan S.",
  },
];

export function Reviews() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Loved By Cheese Lovers"
          title="What People Are Saying"
        />
        <p className="-mt-6 mb-10 text-center text-xs font-medium uppercase tracking-wider text-brand-gray">
          Sample customer feedback
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-ink-line bg-ink-card p-6 shadow-card"
            >
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-brand-yellow text-brand-yellow"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-brand-cream/90">
                  “{r.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-5 text-sm font-bold text-brand-cream/70">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

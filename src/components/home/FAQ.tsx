"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { classNames } from "@/lib/utils";

const faqs = [
  {
    q: "Do you offer pickup?",
    a: "Yes! You can choose pickup at checkout and collect your order from the cafe when it's ready.",
  },
  {
    q: "Do you deliver?",
    a: "Yes, delivery is available to nearby areas. Delivery is FREE on orders above the free-delivery threshold, otherwise a small fixed fee applies.",
  },
  {
    q: "Can I pay by cash?",
    a: "Absolutely. We support cash on delivery / pay at counter as well as online demo payment.",
  },
  {
    q: "Do you accept online payment?",
    a: "Yes, this demo supports UPI, card and net-banking as a frontend-only mock. No real payment is processed.",
  },
  {
    q: "Can I customize my order?",
    a: "For sandwiches, pizzas and selected items you can add extras like extra cheese or paneer, and adjust spice or toppings.",
  },
  {
    q: "Do you have vegetarian items?",
    a: "Yes, our menu is vegetarian-focused. All items carry a clear vegetarian indicator.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQs"
          title="Good To Know"
          description="Quick answers to your ordering questions."
        />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-ink-line bg-ink-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-brand-cream">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={classNames(
                      "shrink-0 text-brand-yellow transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="animate-fade-in px-5 pb-5 text-sm leading-relaxed text-brand-gray">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

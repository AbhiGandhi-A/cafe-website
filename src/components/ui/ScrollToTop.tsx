"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { classNames } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={classNames(
        "fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand-yellow text-ink-dark shadow-soft transition-all hover:-translate-y-0.5 md:bottom-6 md:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp size={20} />
    </button>
  );
}

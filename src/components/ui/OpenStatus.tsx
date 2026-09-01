"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/utils";

export function OpenStatusPill({
  className,
}: {
  className?: string;
}) {
  const [status, setStatus] = useState(() => getOpenStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 30000);
    return () => clearInterval(id);
  }, []);

  const dot = status.isOpen ? "bg-green-500" : "bg-brand-red";

  return (
    <span
      className={
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold " +
        (className ?? "")
      }
      title={status.isOpen ? `Closes at ${status.closesAt}` : `Opens at ${status.opensAt}`}
    >
      <span className={`relative flex h-2 w-2`}>
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      <span className="text-brand-cream/90">
        {status.isOpen ? "Open Now" : "Closed"}
      </span>
      <span className="text-brand-gray">
        {status.isOpen ? `closes ${status.closesAt}` : `opens ${status.opensAt}`}
      </span>
    </span>
  );
}

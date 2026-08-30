"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Dialog"}
    >
      <div
        className="absolute inset-0 animate-overlay-in bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg animate-pop rounded-t-3xl bg-white shadow-lift md:rounded-3xl">
        <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
          <h2 className="text-lg font-extrabold uppercase tracking-wide text-brand-charcoal">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-black/5 text-brand-charcoal transition-colors hover:bg-black/10"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}

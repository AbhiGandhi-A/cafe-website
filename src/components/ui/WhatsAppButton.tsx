"use client";

import { MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function WhatsAppButton() {
  const { toast } = useToast();

  return (
    <button
      type="button"
      aria-label="Chat on WhatsApp (demo)"
      title="WhatsApp order support (demo)"
      onClick={() => toast("WhatsApp ordering is a demo — full support coming soon.")}
      className="fixed bottom-24 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-20"
    >
      <MessageCircle size={24} />
    </button>
  );
}

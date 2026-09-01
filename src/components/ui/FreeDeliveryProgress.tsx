import { storeConfig } from "@/data/cafe";
import { classNames, formatPrice } from "@/lib/utils";

export function FreeDeliveryProgress({
  subtotal,
}: {
  subtotal: number;
}) {
  const threshold = storeConfig.freeDeliveryAbove;
  const remaining = Math.max(threshold - subtotal, 0);
  const pct = Math.min((subtotal / threshold) * 100, 100);
  const unlocked = subtotal >= threshold;

  return (
    <div className="rounded-2xl border border-ink-line bg-ink-charcoal p-3">
      <p className="text-xs font-semibold text-brand-cream/90">
        {unlocked ? (
          <span className="text-green-500">🎉 You&apos;ve unlocked FREE delivery!</span>
        ) : (
          <>
            You&apos;re <span className="text-brand-yellow">{formatPrice(remaining)}</span>{" "}
            away from FREE delivery!
          </>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={classNames(
            "h-full rounded-full transition-all duration-500",
            unlocked ? "bg-green-500" : "bg-brand-yellow"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

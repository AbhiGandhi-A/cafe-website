"use client";

import { useState } from "react";
import { Banknote, CreditCard, Wallet, Landmark, Loader2, ShieldCheck } from "lucide-react";
import { classNames, formatPrice } from "@/lib/utils";

export type PaymentMethodType = "cash" | "online";
export type OnlineMode = "upi" | "card" | "netbanking";

const inputBase = "input-dark";

const upiApps = [
  { id: "gpay", label: "Google Pay" },
  { id: "phonepe", label: "PhonePe" },
  { id: "paytm", label: "Paytm" },
];

export function PaymentMethod({
  method,
  onMethodChange,
  total,
  onPay,
  processing,
  error,
}: {
  method: PaymentMethodType;
  onMethodChange: (m: PaymentMethodType) => void;
  total: number;
  onPay: (details: { mode: OnlineMode; upi: string; card: string }) => void;
  processing: boolean;
  error?: string;
}) {
  const [onlineMode, setOnlineMode] = useState<OnlineMode>("upi");
  const [upi, setUpi] = useState("");
  const [upiApp, setUpiApp] = useState<string>("gpay");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [localError, setLocalError] = useState("");

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length >= 3) return d.slice(0, 2) + "/" + d.slice(2);
    return d;
  };

  const handleOnlinePay = () => {
    if (onlineMode === "upi") {
      const upiValue = upi.trim() || `${upiApp}@oksbi`;
      setLocalError("");
      onPay({ mode: onlineMode, upi: upiValue, card: "" });
    } else if (onlineMode === "card") {
      const cleaned = cardNumber.replace(/\s/g, "");
      if (cleaned.length < 12 && !cardNumber) {
        setCardNumber("4242 4242 4242 4242");
        setCardName("Crazy Cheese Lover");
        setExpiry("12/28");
        setCvv("123");
        setLocalError("");
        onPay({ mode: onlineMode, upi: "", card: "4242 4242 4242 4242" });
        return;
      }
      setLocalError("");
      onPay({ mode: onlineMode, upi: "", card: cardNumber.trim() || "4242 4242 4242 4242" });
    } else {
      setLocalError("");
      onPay({ mode: onlineMode, upi: "", card: "" });
    }
  };

  return (
    <div className="card-dark p-6">
      <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-cream">
        Payment Method
      </h2>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-gray">
        <ShieldCheck size={14} className="text-green-500" /> ?? Secure demo payment ? no real charge
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(
          [
            { id: "cash" as const, icon: Banknote, title: "Pay at Counter / Cash", desc: "Pay at counter or on delivery" },
            { id: "online" as const, icon: Wallet, title: "Online Payment", desc: "UPI, Card or Net Banking (demo)" },
          ]
        ).map(({ id, icon: Icon, title, desc }) => {
          const selected = method === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onMethodChange(id)}
              aria-pressed={selected}
              className={classNames(
                "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                selected ? "border-brand-yellow bg-brand-yellow/10" : "border-ink-line hover:border-white/30"
              )}
            >
              <span
                className={classNames(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
                  selected ? "bg-brand-yellow text-ink-dark" : "bg-ink-charcoal text-brand-cream"
                )}
              >
                <Icon size={24} />
              </span>
              <span>
                <span className="block font-extrabold text-brand-cream">{title}</span>
                <span className="block text-sm text-brand-gray">{desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      {method === "online" && (
        <div className="mt-5 animate-fade-in rounded-2xl border border-ink-line bg-ink-charcoal p-4">
          <p className="text-sm font-bold text-brand-cream">
            Payment Amount:{" "}
            <span className="text-lg font-black text-brand-yellow">{formatPrice(total)}</span>
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                { id: "upi" as const, label: "UPI", icon: Wallet },
                { id: "card" as const, label: "Card", icon: CreditCard },
                { id: "netbanking" as const, label: "Net Banking", icon: Landmark },
              ]
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setOnlineMode(id)}
                aria-pressed={onlineMode === id}
                className={classNames(
                  "flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-bold transition-all",
                  onlineMode === id
                    ? "border-brand-yellow bg-brand-yellow/15 text-brand-yellow"
                    : "border-ink-line bg-ink-card text-brand-cream/70 hover:border-white/30"
                )}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {onlineMode === "upi" && (
              <div>
                <div className="mb-1.5 flex flex-wrap gap-2">
                  {upiApps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setUpiApp(app.id)}
                      aria-pressed={upiApp === app.id}
                      className={classNames(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                        upiApp === app.id
                          ? "border-brand-yellow bg-brand-yellow/15 text-brand-yellow"
                          : "border-ink-line text-brand-cream/70"
                      )}
                    >
                      {app.label}
                    </button>
                  ))}
                </div>
                <label className="mb-1 block text-sm font-bold text-brand-cream">UPI ID</label>
                <input
                  type="text"
                  className={inputBase}
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                  placeholder="yourname@upi"
                  aria-label="UPI ID"
                />
                <p className="mt-1 text-xs text-brand-gray">
                  Demo ? enter any UPI ID or select an app above
                </p>
              </div>
            )}

            {onlineMode === "card" && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-bold text-brand-cream">Card Number</label>
                  <input
                    type="text"
                    className={inputBase}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    aria-label="Card number"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-brand-cream">Cardholder Name</label>
                  <input
                    type="text"
                    className={inputBase}
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on card"
                    aria-label="Cardholder name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-bold text-brand-cream">Expiry</label>
                    <input
                      type="text"
                      className={inputBase}
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      aria-label="Card expiry"
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-brand-cream">CVV</label>
                    <input
                      type="password"
                      className={inputBase}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="123"
                      aria-label="CVV"
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <p className="mt-1 text-[11px] text-brand-gray">
                  Card details are never stored on this device.
                </p>
              </>
            )}

            {onlineMode === "netbanking" && (
              <div>
                <label className="mb-1 block text-sm font-bold text-brand-cream">Select Bank</label>
                <select className={inputBase} aria-label="Select bank" defaultValue="">
                  <option value="" disabled>Choose your bank</option>
                  <option value="demo">Demo Bank</option>
                  <option value="example">Example National Bank</option>
                </select>
              </div>
            )}
          </div>

          {(localError || error) && (
            <p className="mt-3 rounded-xl bg-brand-red/10 px-3 py-2 text-sm font-medium text-brand-red" role="alert">
              {localError || error}
            </p>
          )}

          <button
            type="button"
            onClick={handleOnlinePay}
            disabled={processing}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 py-3.5 font-bold text-ink-dark transition-all hover:-translate-y-0.5 hover:bg-brand-yellow-light active:scale-95 disabled:opacity-60"
          >
            {processing ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Processing Payment...
              </>
            ) : (
              <>Pay {formatPrice(total)}</>
            )}
          </button>
          <p className="mt-2 text-center text-xs text-brand-gray">
            Frontend mock ? the payment does not actually charge you.
          </p>
        </div>
      )}
    </div>
  );
}

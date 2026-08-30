"use client";

import { useState } from "react";
import { Banknote, CreditCard, Wallet, Landmark, Loader2 } from "lucide-react";
import { classNames } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

export type PaymentMethodType = "cash" | "online";
export type OnlineMode = "upi" | "card" | "netbanking";

const inputBase =
  "w-full rounded-2xl border-2 border-brand-border bg-white px-4 py-3 text-brand-charcoal placeholder:text-brand-gray focus:border-brand-yellow focus:outline-none transition-colors";

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
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [localError, setLocalError] = useState("");

  const handleOnlinePay = () => {
    if (onlineMode === "upi") {
      if (!/^[\w.\-]+@[\w]+$/.test(upi.trim())) {
        setLocalError("Please enter a valid UPI ID (e.g. name@upi).");
        return;
      }
    } else if (onlineMode === "card") {
      if (cardNumber.replace(/\s/g, "").length < 12) {
        setLocalError("Please enter a valid card number.");
        return;
      }
      if (!expiry.trim()) {
        setLocalError("Please enter card expiry.");
        return;
      }
      if (cvv.length < 3) {
        setLocalError("Please enter a valid CVV.");
        return;
      }
    }
    setLocalError("");
    onPay({ mode: onlineMode, upi: upi.trim(), card: cardNumber.trim() });
  };

  return (
    <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-card">
      <h2 className="text-lg font-extrabold uppercase tracking-wide text-brand-charcoal">
        Payment Method
      </h2>
      <p className="mt-1 text-sm text-brand-gray">
        This is a frontend demo — no real payment is processed.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onMethodChange("cash")}
          aria-pressed={method === "cash"}
          className={classNames(
            "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
            method === "cash"
              ? "border-brand-charcoal bg-brand-yellow/15"
              : "border-brand-border hover:border-brand-charcoal/40"
          )}
        >
          <span
            className={classNames(
              "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
              method === "cash"
                ? "bg-brand-charcoal text-brand-yellow"
                : "bg-black/5 text-brand-charcoal"
            )}
          >
            <Banknote size={24} />
          </span>
          <span>
            <span className="block font-extrabold text-brand-charcoal">
              Pay at Counter / Cash
            </span>
              <span className="block text-sm text-brand-gray">
                Pay at counter
              </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => onMethodChange("online")}
          aria-pressed={method === "online"}
          className={classNames(
            "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
            method === "online"
              ? "border-brand-charcoal bg-brand-yellow/15"
              : "border-brand-border hover:border-brand-charcoal/40"
          )}
        >
          <span
            className={classNames(
              "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
              method === "online"
                ? "bg-brand-charcoal text-brand-yellow"
                : "bg-black/5 text-brand-charcoal"
            )}
          >
            <Wallet size={24} />
          </span>
          <span>
            <span className="block font-extrabold text-brand-charcoal">
              Online Payment
            </span>
            <span className="block text-sm text-brand-gray">
              UPI, Card or Net Banking (demo)
            </span>
          </span>
        </button>
      </div>

      {method === "online" && (
        <div className="mt-5 animate-fade-in rounded-2xl border border-brand-border bg-brand-cream/50 p-4">
          <p className="text-sm font-bold text-brand-charcoal">
            Payment Amount:{" "}
            <span className="text-lg font-black text-brand-red">
              {formatPrice(total)}
            </span>
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                { id: "upi", label: "UPI", icon: Wallet },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "netbanking", label: "Net Banking", icon: Landmark },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setOnlineMode(id)}
                aria-pressed={onlineMode === id}
                className={classNames(
                  "flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-xs font-bold transition-all",
                  onlineMode === id
                    ? "border-brand-charcoal bg-brand-charcoal text-brand-yellow"
                    : "border-brand-border bg-white text-brand-charcoal/70 hover:border-brand-charcoal/40"
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
                <label className="mb-1 block text-sm font-bold text-brand-charcoal">
                  UPI ID
                </label>
                <input
                  type="text"
                  className={inputBase}
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                  placeholder="yourname@upi"
                  aria-label="UPI ID"
                />
                <p className="mt-1 text-xs text-brand-gray">
                  Demo — enter any UPI ID like example@upi
                </p>
              </div>
            )}

            {onlineMode === "card" && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-bold text-brand-charcoal">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className={inputBase}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    aria-label="Card number"
                    inputMode="numeric"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-bold text-brand-charcoal">
                      Expiry
                    </label>
                    <input
                      type="text"
                      className={inputBase}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      aria-label="Card expiry"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-brand-charcoal">
                      CVV
                    </label>
                    <input
                      type="password"
                      className={inputBase}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      aria-label="CVV"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </>
            )}

            {onlineMode === "netbanking" && (
              <div>
                <label className="mb-1 block text-sm font-bold text-brand-charcoal">
                  Select Bank
                </label>
                <select
                  className={inputBase}
                  aria-label="Select bank"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose your bank
                  </option>
                  <option>Demo Bank</option>
                  <option>Example National Bank</option>
                </select>
              </div>
            )}
          </div>

          {(localError || error) && (
            <p
              className="mt-3 rounded-xl bg-brand-red/10 px-3 py-2 text-sm font-medium text-brand-red"
              role="alert"
            >
              {localError || error}
            </p>
          )}

          <button
            type="button"
            onClick={handleOnlinePay}
            disabled={processing}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-charcoal px-6 py-3.5 font-bold text-brand-yellow transition-all hover:-translate-y-0.5 hover:bg-brand-dark active:scale-95 disabled:opacity-60"
          >
            {processing ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Processing...
              </>
            ) : (
              <>Pay {formatPrice(total)}</>
            )}
          </button>
          <p className="mt-2 text-center text-xs text-brand-gray">
            Frontend mock — the payment does not actually charge you.
          </p>
        </div>
      )}
    </div>
  );
}

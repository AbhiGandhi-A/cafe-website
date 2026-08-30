"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CustomerDetailsForm, type FieldError } from "@/components/checkout/CustomerDetailsForm";
import {
  PaymentMethod,
  type PaymentMethodType,
  type OnlineMode,
} from "@/components/checkout/PaymentMethod";
import { OrderSummaryView } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import {
  formatPrice,
  generateOrderId,
  getTax,
  getTotal,
  isValidEmail,
  isValidPhone,
} from "@/lib/utils";

const ORDER_KEY = "ccc-last-order";
const steps = ["Cart", "Details", "Payment", "Confirmation"];

const initialValues: Record<string, string> = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
};

export default function CheckoutPage() {
  const { cart, getCartSubtotal, clearCart } = useCart();
  const router = useRouter();

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<FieldError>({});
  const [method, setMethod] = useState<PaymentMethodType>("cash");
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const subtotal = useMemo(() => getCartSubtotal(), [getCartSubtotal]);
  const orderType: "pickup" | "delivery" = "pickup";
  const isDelivery = false;
  const delivery = 0;
  const tax = getTax(subtotal);
  const total = getTotal(subtotal, tax, delivery);

  const setField = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: FieldError = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.phone.trim()) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(values.phone))
      next.phone = "Please enter a valid 10 digit mobile number.";
    if (values.email.trim() && !isValidEmail(values.email))
      next.email = "Please enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const saveOrder = (paymentMethod: string, details: Record<string, string>) => {
    const order = {
      id: generateOrderId(),
      items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      subtotal,
      tax,
      delivery,
      total,
      orderType,
      paymentMethod,
      details,
      createdAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch {
      // ignore
    }
  };

  const placeOrder = (paymentMethod: string, paymentDetails: Record<string, string>) => {
    if (!validate()) return;
    saveOrder(paymentMethod, paymentDetails);
    clearCart();
    router.push("/order-success");
  };

  const handleCashOrder = () => {
    placeOrder("cash", {});
  };

  const handleOnlinePay = (onlineDetails: {
    mode: OnlineMode;
    upi: string;
    card: string;
  }) => {
    if (!validate()) return;
    setProcessing(true);
    setPaymentError("");
    setTimeout(() => {
      const success = Math.random() > 0.15;
      setProcessing(false);
      if (success) {
        placeOrder("online", { mode: onlineDetails.mode, upi: onlineDetails.upi });
      } else {
        setPaymentError(
          "Payment failed. Please check your details and try again."
        );
      }
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-yellow/20 text-brand-charcoal">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="mt-4 text-2xl font-black text-brand-charcoal">
          Your cart is empty
        </h1>
        <p className="mt-2 text-brand-gray">
          Add items to your cart before checking out.
        </p>
        <Button href="/menu" variant="primary" size="lg" className="mt-5">
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-red">
          Almost there
        </p>
        <h1 className="mt-1 text-3xl font-black uppercase text-brand-charcoal sm:text-4xl">
          Checkout
        </h1>
      </div>      <div className="mx-auto mb-8 flex max-w-lg items-center justify-between">
        {steps.map((step, i) => {
          const idx = i + 1;
          const active = idx === 3;
          const done = idx < 3;
          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-center">
                {idx > 1 && (
                  <div className={"h-0.5 flex-1 " + (done ? "bg-brand-yellow" : "bg-brand-border")} />
                )}
                <span
                  className={
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold " +
                    (done
                      ? "bg-brand-yellow text-brand-charcoal"
                      : active
                        ? "bg-brand-charcoal text-brand-yellow"
                        : "bg-brand-border text-brand-gray")
                  }
                >
                  {done ? "✓" : idx}
                </span>
                {idx < 4 && (
                  <div className={"h-0.5 flex-1 " + (done ? "bg-brand-yellow" : "bg-brand-border")} />
                )}
              </div>
              <span className="hidden text-[10px] font-bold uppercase text-brand-gray sm:block">
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <CustomerDetailsForm
            values={values}
            errors={errors}
            onChange={setField}
            isDelivery={isDelivery}
          />
          <PaymentMethod
            method={method}
            onMethodChange={(m) => {
              setMethod(m);
              setPaymentError("");
            }}
            total={total}
            onPay={handleOnlinePay}
            processing={processing}
            error={paymentError}
          />

          {method === "cash" && (
            <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-card">
              <Button
                variant="primary"
                size="full"
                onClick={handleCashOrder}
                className="py-4 text-lg"
              >
                Place Order — {formatPrice(total)}
              </Button>
              <p className="mt-2 text-center text-xs text-brand-gray">
                Pay at counter.
              </p>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-20">
          <OrderSummaryView
            lines={cart}
            subtotal={subtotal}
            delivery={delivery}
            tax={tax}
            total={total}
            paymentLabel={method}
          />
        </div>
      </div>
    </div>
  );
}

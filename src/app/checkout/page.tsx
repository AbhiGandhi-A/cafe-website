"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CustomerDetailsForm, type FieldError } from "@/components/checkout/CustomerDetailsForm";
import { DeliveryOptions } from "@/components/checkout/DeliveryOptions";
import { PaymentMethod, type PaymentMethodType, type OnlineMode } from "@/components/checkout/PaymentMethod";
import { OrderSummaryView } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import { coupons, storeConfig } from "@/data/cafe";
import { getItemById } from "@/data/menu";
import {
  calculateTotals,
  isValidEmail,
  isValidPhone,
  isValidPincode,
  formatPrice,
  generateOrderId,
  getSavedCouponCode,
  getCustomerDetails,
  saveCustomerDetails,
  clearCustomerDetails,
} from "@/lib/utils";
import { saveOrder } from "@/lib/orders";
import { useToast } from "@/components/ui/Toast";

const steps = ["Cart", "Details", "Payment", "Done"];

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [values, setValues] = useState<Record<string, string>>({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    deliveryInstructions: "",
    orderNotes: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [method, setMethod] = useState<PaymentMethodType>("cash");
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [remember, setRemember] = useState(false);
  const [coupon] = useState(() => coupons.find((c) => c.id === getSavedCouponCode()) ?? null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    const saved = getCustomerDetails();
    if (saved && Object.keys(saved).length > 0) {
      setValues((prev) => ({ ...prev, ...saved }));
      setRemember(true);
    }
  }, []);

  const isDelivery = orderType === "delivery";
  const lookup = (id: string) => getItemById(id)?.price ?? 0;
  const totals = useMemo(
    () => calculateTotals(cart, lookup, isDelivery, coupon),
    [cart, isDelivery, coupon]
  );
  const subtotal = totals.subtotal;
  const minimumNotMet = isDelivery && subtotal < storeConfig.minimumDeliveryOrder;

  const setField = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: FieldError = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.phone.trim()) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(values.phone)) next.phone = "Please enter a valid 10 digit mobile number.";
    if (values.email.trim() && !isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (isDelivery) {
      if (!values.address.trim()) next.address = "Please enter your delivery address.";
      if (!values.city.trim()) next.city = "Please enter your city.";
      if (!values.pincode.trim()) next.pincode = "Please enter your pincode.";
      else if (!isValidPincode(values.pincode)) next.pincode = "Please enter a valid 6 digit pincode.";
    }
    setErrors(next);
    const valid = Object.keys(next).length === 0;
    if (!valid) {
      toast("Please fill in the required customer details above.");
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
    return valid;
  };

  const finalizeOrder = (paymentLabel: string, paymentDetail: string) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setOrderPlaced(true);

    if (remember) {
      saveCustomerDetails({
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        city: values.city,
        pincode: values.pincode,
      });
    }

    const orderId = generateOrderId();
    const order = {
      id: orderId,
      items: cart.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        customizations: i.customizations,
      })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      delivery: totals.delivery,
      tax: totals.tax,
      total: totals.total,
      orderType,
      paymentMethod: paymentLabel,
      couponCode: coupon?.id,
      details: {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        landmark: values.landmark,
        city: values.city,
        pincode: values.pincode,
        deliveryInstructions: values.deliveryInstructions,
        orderNotes: values.orderNotes,
        paymentDetail,
      },
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    clearCart();
    toast("Order placed successfully! Redirecting...");
    setTimeout(() => {
      router.push(`/order-success?orderId=${orderId}`);
    }, 150);
  };

  const handleCashOrder = () => {
    if (!validate()) return;
    if (minimumNotMet) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      finalizeOrder("Cash", isDelivery ? "Cash on delivery" : "Pay at counter");
    }, 400);
  };

  const handleOnlinePay = (details: { mode: OnlineMode; upi: string; card: string }) => {
    if (!validate()) return;
    if (minimumNotMet) return;
    setProcessing(true);
    setPaymentError("");
    setTimeout(() => {
      setProcessing(false);
      finalizeOrder("Online", details.mode.toUpperCase() + (details.upi ? ` (${details.upi})` : ""));
    }, 800);
  };

  const cancelOnline = () => {
    setProcessing(false);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-yellow/10 text-brand-yellow">
          <CheckCircle2 size={44} />
        </div>
        <h1 className="font-display mt-4 text-2xl font-black text-brand-cream">Your cart is empty.</h1>
        <p className="mt-2 text-brand-gray">Add items to your cart before checking out.</p>
        <Button href="/menu" variant="primary" size="lg" className="mt-5">
          Browse Menu
        </Button>
      </div>
    );
  }

  const canOrder = !minimumNotMet && !processing;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-yellow">Almost there</p>
        <h1 className="font-display mt-1 text-3xl font-black uppercase text-brand-cream sm:text-4xl">
          Checkout
        </h1>
      </div>

      <div className="mx-auto mb-8 flex max-w-lg items-center justify-between">
        {steps.map((step, i) => {
          const idx = i + 1;
          const done = idx <= 2;
          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-center">
                {idx > 1 && <div className={"h-0.5 flex-1 " + (done ? "bg-brand-yellow" : "bg-ink-line")} />}
                <span
                  className={
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold " +
                    (done ? "bg-brand-yellow text-ink-dark" : "bg-ink-card text-brand-gray")
                  }
                >
                  {done ? "?" : idx}
                </span>
                {idx < 4 && <div className={"h-0.5 flex-1 " + (done ? "bg-brand-yellow" : "bg-ink-line")} />}
              </div>
              <span className="hidden text-[10px] font-bold uppercase text-brand-gray sm:block">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <DeliveryOptions value={orderType} onChange={setOrderType} subtotal={subtotal} />

          <CustomerDetailsForm
            values={values}
            errors={errors}
            onChange={setField}
            isDelivery={isDelivery}
            remember={remember}
            onRememberChange={setRemember}
            onClearSaved={() => {
              clearCustomerDetails();
              setRemember(false);
              setValues((prev) => ({
                ...prev,
                name: "",
                phone: "",
                email: "",
                address: "",
                landmark: "",
                city: "",
                pincode: "",
              }));
              toast("Saved details cleared");
            }}
          />

          {isDelivery && minimumNotMet && (
            <div className="rounded-2xl border border-brand-red/40 bg-brand-red/10 p-4 text-sm font-semibold text-brand-red">
              Minimum {formatPrice(storeConfig.minimumDeliveryOrder)} required for delivery. Pickup is always available.
            </div>
          )}

          <PaymentMethod
            method={method}
            onMethodChange={(m) => {
              setMethod(m);
              setPaymentError("");
            }}
            total={totals.total}
            onPay={handleOnlinePay}
            processing={processing}
            error={paymentError}
          />

          {method === "cash" && (
            <div className="card-dark p-6">
              <Button
                variant="primary"
                size="full"
                onClick={() => {
                  cancelOnline();
                  handleCashOrder();
                }}
                disabled={!canOrder}
                className="py-4 text-lg"
              >
                {processing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Placing Order...
                  </>
                ) : (
                  <>Place Order ? {formatPrice(totals.total)}</>
                )}
              </Button>
              <p className="mt-2 text-center text-xs text-brand-gray">
                {isDelivery ? "Pay cash on delivery." : "Pay at counter."}
              </p>
            </div>
          )}

          <p className="flex items-center justify-center gap-1.5 text-xs text-brand-gray">
            <Lock size={12} /> This is a frontend demo ? no real payment or delivery occurs.
          </p>
        </div>

        <div className="lg:sticky lg:top-20">
          <OrderSummaryView
            lines={cart}
            subtotal={totals.subtotal}
            discount={totals.discount}
            delivery={totals.delivery}
            tax={totals.tax}
            total={totals.total}
            couponLabel={coupon ? coupon.id : undefined}
            paymentLabel={method}
          />
        </div>
      </div>
    </div>
  );
}

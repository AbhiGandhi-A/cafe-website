"use client";

import { classNames } from "@/lib/utils";

export interface FieldError {
  [key: string]: string | undefined;
}

const inputBase =
  "input-dark";

function Field({
  label,
  error,
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (cls: string) => React.ReactNode;
}) {
  return (
    <div className={classNames("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-bold text-brand-cream">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {children(classNames(inputBase, error ? "!border-brand-red/60" : ""))}
      {error && <p className="text-xs font-medium text-brand-red">{error}</p>}
    </div>
  );
}

export function CustomerDetailsForm({
  values,
  errors,
  onChange,
  isDelivery,
  remember,
  onRememberChange,
  onClearSaved,
}: {
  values: Record<string, string>;
  errors: FieldError;
  onChange: (field: string, value: string) => void;
  isDelivery: boolean;
  remember: boolean;
  onRememberChange: (v: boolean) => void;
  onClearSaved: () => void;
}) {
  return (
    <div className="card-dark p-6">
      <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-cream">
        Customer Details
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.name} className="sm:col-span-2">
          {(cls) => (
            <input
              type="text"
              className={cls}
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Your full name"
              aria-label="Full name"
            />
          )}
        </Field>

        <Field label="Phone Number" required error={errors.phone}>
          {(cls) => (
            <input
              type="tel"
              className={cls}
              value={values.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="10 digit mobile number"
              aria-label="Phone number"
              inputMode="numeric"
            />
          )}
        </Field>

        <Field label="Email" error={errors.email}>
          {(cls) => (
            <input
              type="email"
              className={cls}
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@example.com (optional)"
              aria-label="Email"
            />
          )}
        </Field>

        {isDelivery && (
          <>
            <Field label="Address" required error={errors.address} className="sm:col-span-2">
              {(cls) => (
                <textarea
                  className={classNames(cls, "resize-none")}
                  rows={3}
                  value={values.address}
                  onChange={(e) => onChange("address", e.target.value)}
                  placeholder="House no, street, area"
                  aria-label="Address"
                />
              )}
            </Field>

            <Field label="Landmark">
              {(cls) => (
                <input
                  type="text"
                  className={cls}
                  value={values.landmark}
                  onChange={(e) => onChange("landmark", e.target.value)}
                  placeholder="Near ... (optional)"
                  aria-label="Landmark"
                />
              )}
            </Field>

            <Field label="City" required error={errors.city}>
              {(cls) => (
                <input
                  type="text"
                  className={cls}
                  value={values.city}
                  onChange={(e) => onChange("city", e.target.value)}
                  placeholder="City"
                  aria-label="City"
                />
              )}
            </Field>

            <Field label="Pincode" required error={errors.pincode} className="sm:col-span-2">
              {(cls) => (
                <input
                  type="text"
                  className={cls}
                  value={values.pincode}
                  onChange={(e) => onChange("pincode", e.target.value)}
                  placeholder="6 digit pincode"
                  aria-label="Pincode"
                  inputMode="numeric"
                />
              )}
            </Field>
          </>
        )}

        <Field label="Delivery Instructions" className="sm:col-span-2">
          {(cls) => (
            <div>
              <textarea
                className={classNames(cls, "resize-none")}
                rows={2}
                maxLength={150}
                value={values.deliveryInstructions}
                onChange={(e) => onChange("deliveryInstructions", e.target.value)}
                placeholder="Gate number, landmark, call when nearby..."
                aria-label="Delivery instructions"
              />
              <p className="mt-1 text-right text-[11px] text-brand-gray">
                {values.deliveryInstructions?.length ?? 0}/150
              </p>
            </div>
          )}
        </Field>

        <Field label="Order Notes" className="sm:col-span-2">
          {(cls) => (
            <div>
              <textarea
                className={classNames(cls, "resize-none")}
                rows={2}
                maxLength={150}
                value={values.orderNotes}
                onChange={(e) => onChange("orderNotes", e.target.value)}
                placeholder="Please make it less spicy..."
                aria-label="Order notes"
              />
              <p className="mt-1 text-right text-[11px] text-brand-gray">
                {values.orderNotes?.length ?? 0}/150
              </p>
            </div>
          )}
        </Field>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-ink-line pt-4">
        <label className="flex items-center gap-2 text-sm text-brand-cream/85">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => onRememberChange(e.target.checked)}
            className="h-4 w-4 accent-brand-yellow"
          />
          Save these details on this device
        </label>
        <button
          type="button"
          onClick={onClearSaved}
          className="w-fit text-xs font-semibold text-brand-gray underline-offset-2 hover:text-brand-red hover:underline"
        >
          Clear saved details
        </button>
      </div>
    </div>
  );
}

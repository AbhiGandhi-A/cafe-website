"use client";

import { classNames } from "@/lib/utils";

export interface FieldError {
  [key: string]: string | undefined;
}

const inputBase =
  "w-full rounded-2xl border-2 border-brand-border bg-white px-4 py-3 text-brand-charcoal placeholder:text-brand-gray focus:border-brand-yellow focus:outline-none transition-colors";

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
      <label className="text-sm font-bold text-brand-charcoal">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {children(
        classNames(inputBase, error ? "border-brand-red/60" : undefined)
      )}
      {error && <p className="text-xs font-medium text-brand-red">{error}</p>}
    </div>
  );
}

export function CustomerDetailsForm({
  values,
  errors,
  onChange,
  isDelivery,
}: {
  values: Record<string, string>;
  errors: FieldError;
  onChange: (field: string, value: string) => void;
  isDelivery: boolean;
}) {
  return (
    <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-card">
      <h2 className="text-lg font-extrabold uppercase tracking-wide text-brand-charcoal">
        Customer Details
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Full Name"
          required
          error={errors.name}
          className="sm:col-span-2"
        >
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
            <Field
              label="Address"
              required
              error={errors.address}
              className="sm:col-span-2"
            >
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

            <Field label="Pincode" required error={errors.pincode}>
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
      </div>
    </div>
  );
}

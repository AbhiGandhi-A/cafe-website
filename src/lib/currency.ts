export const formatINR = (amount: number): string => {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted.replace(".00", "");
};

export const formatPrice = (amount: number): string => {
  const formatted = formatINR(amount);
  return formatted;
};

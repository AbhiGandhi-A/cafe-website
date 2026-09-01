export const cafeInfo = {
  name: "Crazy Cheesy Cafe",
  tagline: "Cheesy cravings, made crazy good.",
  shortDescription:
    "Fresh sandwiches, loaded pizzas, crispy momos and your favourite cafe bites — all made with extra cheesy goodness.",
  phone: "+91 XXXXX XXXXX",
  email: "hello@crazycheesycafe.com",
  location: "Your Cafe Location",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  whatsapp: "https://wa.me/91XXXXXXXXXX",
  addressLine: "Shop No. 00, Example Street, Your City",
};

export const storeConfig = {
  taxRate: 0.05,
  deliveryFee: 30,
  freeDeliveryAbove: 500,
  minimumDeliveryOrder: 150,
  phone: "",
  currency: "₹",
};

export const orderTimings = {
  pickupPreparation: "15–20 mins",
  deliveryTime: "30–40 mins",
};

export const openingHours = {
  open: "10:00",
  close: "23:00",
  days: "Mon–Sun",
};

export const coupons: Coupon[] = [
  {
    id: "CHEESY10",
    type: "percentage",
    value: 10,
    minimum: 200,
    label: "10% off",
  },
  {
    id: "WELCOME50",
    type: "fixed",
    value: 50,
    minimum: 300,
    label: "₹50 off",
  },
];

export interface Coupon {
  id: string;
  type: "percentage" | "fixed";
  value: number;
  minimum: number;
  label: string;
}

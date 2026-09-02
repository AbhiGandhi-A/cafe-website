export const cafeInfo = {
  name: "Crazy Cheesy Cafe",
  tagline: "Good Food = Good Mood",
  shortDescription:
    "Loaded sandwiches, pizzas, momos and cafe favourites made fresh for every craving.",
  phone: "091064 39844",
  phoneFormatted: "+91 91064 39844",
  email: "hello@crazycheesycafe.com",
  location: "Signature Galleria, Ankleshwar, Gujarat",
  addressLine: "Ground floor, Signature Galleria, A-33, near Mahavir Turning, Happy Nagar, Ankleshwar, Gujarat 393001",
  landmark: "Near Mahavir Turning, Happy Nagar",
  city: "Ankleshwar",
  state: "Gujarat",
  pincode: "393001",
  timingDisplay: "Open · Closes 11 pm",
  hoursDetail: "Mon – Sun: 10:00 AM – 11:00 PM",
  rating: 5.0,
  reviewsCount: 14,
  mapQuery: "Crazy Cheesy Cafe Signature Galleria Ankleshwar Gujarat 393001",
  mapDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Crazy+Cheesy+Cafe+Ground+floor+Signature+Galleria+A-33+near+Mahavir+Turning+Happy+Nagar+Ankleshwar+Gujarat+393001",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  whatsapp: "https://wa.me/919106439844",
};

export const storeConfig = {
  taxRate: 0.05,
  deliveryFee: 30,
  freeDeliveryAbove: 500,
  minimumDeliveryOrder: 150,
  phone: "091064 39844",
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
  status: "Open · Closes 11 pm",
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

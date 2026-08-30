export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export const categories: Category[] = [
  {
    id: "sandwich",
    name: "Sandwich",
    description: "Classic fresh sandwiches",
    emoji: "🥪",
  },
  {
    id: "toast-sandwich",
    name: "Toast Sandwich",
    description: "Warm & grilled toasty bites",
    emoji: "🍞",
  },
  {
    id: "grill-sandwich",
    name: "Grill Sandwich",
    description: "Loaded & press-grilled",
    emoji: "🔥",
  },
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    description: "Cheesy, garlicky & irresistible",
    emoji: "🧄",
  },
  {
    id: "rimzim-special",
    name: "Rimzim Sandwich Special",
    description: "The cafe's signature creations",
    emoji: "✨",
  },
  {
    id: "momos",
    name: "Momos",
    description: "Steamed or fried, always juicy",
    emoji: "🥟",
  },
  {
    id: "crazy-cheesy-special",
    name: "Crazy Cheesy Special",
    description: "Pizzas & street-favourite specials",
    emoji: "🧀",
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Shakes & cold coffee",
    emoji: "🥤",
  },
  {
    id: "dessert",
    name: "Dessert",
    description: "Sweet endings",
    emoji: "🍧",
  },
];

export const getCategoryById = (id: string) =>
  categories.find((c) => c.id === id);

export const categoryTabs = () =>
  categories.map((c) => ({ id: c.id, label: c.name.toUpperCase() }));

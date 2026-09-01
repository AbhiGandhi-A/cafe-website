export interface CustomizationOption {
  code: string;
  label: string;
  price: number;
  group?: string;
  noPrice?: boolean;
}

export const customizationGroups: Record<string, CustomizationOption[]> = {
  sandwich: [
    { code: "extra-cheese", label: "Extra Cheese", price: 30, group: "Add-ons" },
    { code: "extra-paneer", label: "Extra Paneer", price: 40, group: "Add-ons" },
    { code: "no-onion", label: "No Onion", price: 0, group: "Preferences" },
    { code: "no-capsicum", label: "No Capsicum", price: 0, group: "Preferences" },
    { code: "extra-spicy", label: "Extra Spicy", price: 0, group: "Taste" },
  ],
  "toast sandwich": [
    { code: "extra-cheese", label: "Extra Cheese", price: 30, group: "Add-ons" },
    { code: "extra-spicy", label: "Extra Spicy", price: 0, group: "Taste" },
  ],
  "grill sandwich": [
    { code: "extra-cheese", label: "Extra Cheese", price: 30, group: "Add-ons" },
    { code: "extra-paneer", label: "Extra Paneer", price: 40, group: "Add-ons" },
    { code: "no-onion", label: "No Onion", price: 0, group: "Preferences" },
    { code: "extra-spicy", label: "Extra Spicy", price: 0, group: "Taste" },
  ],
  "garlic bread": [
    { code: "extra-cheese", label: "Extra Cheese", price: 30, group: "Add-ons" },
    { code: "extra-spicy", label: "Extra Spicy", price: 0, group: "Taste" },
  ],
  "rimzim sandwich special": [
    { code: "extra-cheese", label: "Extra Cheese", price: 30, group: "Add-ons" },
    { code: "extra-paneer", label: "Extra Paneer", price: 40, group: "Add-ons" },
    { code: "extra-spicy", label: "Extra Spicy", price: 0, group: "Taste" },
  ],
  momos: [
    { code: "extra-chutney", label: "Extra Chutney", price: 10, group: "Add-ons" },
    { code: "extra-spicy", label: "Extra Spicy", price: 0, group: "Taste" },
  ],
  "crazy cheesy special": [
    { code: "extra-cheese", label: "Extra Cheese", price: 40, group: "Add-ons" },
    { code: "extra-spicy", label: "Extra Spicy", price: 0, group: "Taste" },
  ],
  beverages: [
    { code: "large", label: "Large Size", price: 30, group: "Size" },
    { code: "less-sugar", label: "Less Sugar", price: 0, group: "Taste" },
  ],
  dessert: [
    { code: "extra-scoop", label: "Extra Scoop", price: 20, group: "Add-ons" },
  ],
};

export const getCustomizationOptions = (
  category: string
): CustomizationOption[] =>
  customizationGroups[category.toLowerCase()] ?? [];

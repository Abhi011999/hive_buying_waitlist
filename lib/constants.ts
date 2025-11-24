// Product categories
export const PRODUCT_CATEGORIES = [
  "Phones",
  "Laptops/Tablets",
  "Gadgets",
  "Home Appliances",
  "Scooty/Bike",
  "Cars",
  "Other Products",
  "Exploring for now"
] as const;

// Locations
export const LOCATIONS = [
  "Bangalore",
  "Delhi",
  "Mumbai",
  "Chennai",
  "Other City",
] as const;

// Type exports for TypeScript
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
export type Location = typeof LOCATIONS[number];


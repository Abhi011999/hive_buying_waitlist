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

// Home Appliances sub-categories
export const HOME_APPLIANCES_SUBCATEGORIES = [
  "AC",
  "TV",
  "Refrigerator",
  "Washing Machine",
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
export type HomeAppliancesSubcategory = typeof HOME_APPLIANCES_SUBCATEGORIES[number];
export type Location = typeof LOCATIONS[number];


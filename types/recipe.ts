export type Category =
  | "Italian"
  | "Asian"
  | "Mexican"
  | "Quick"
  | "Healthy"
  | "Pasta"
  | "Meat";

export type Course =
  | "Appetizer"
  | "Starter"
  | "Main"
  | "Side"
  | "Dessert"
  | "Snack"
  | "Drink";

export type Unit =
  | "g"
  | "ml"
  | "tsp"
  | "tbsp"
  | "cup"
  | "pinch"
  | "clove";

export type Dietary =
  | "Vegan"
  | "Vegetarian"
  | "Meat"
  | "Pescatarian"
  | "Gluten-Free"
  | "Lactose-Free";

export interface Ingredient {
  item: string;
  amount: number;
  unit: Unit;
}

export interface RecipeDuration {
  prep: number;
  cook: number;
  total: number;
}

export interface Chef {
  name: string;
  instagramUrl?: string;
  websiteUrl?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  sourceUrl?: string;
  chef: Chef;
  servings: number;
  mainImage: string;
  images: string[];
  dietaries: Dietary[];
  categories: Category[];
  duration: RecipeDuration;
  ingredients: Ingredient[];
  instructions: string[];
}

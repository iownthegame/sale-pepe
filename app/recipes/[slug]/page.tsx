import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";
import { notFound } from "next/navigation";
import RecipeClientLayout from "./RecipeClientLayout";

// Cast the JSON data to our Recipe array type
const recipes = recipesData as Recipe[];

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Grab the slug from the URL
  const { slug } = await params;
  // 2. Find the recipe that matches the slug
  const recipe = recipes.find((r) => r.slug === slug);

  // 3. Handle cases where the recipe doesn't exist
  if (!recipe) return notFound();

  // 4. Render the content
  return <RecipeClientLayout recipe={recipe} />;
}

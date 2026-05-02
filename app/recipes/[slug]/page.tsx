import { notFound } from "next/navigation";
import RecipeClientLayout from "./RecipeClientLayout";
import { supabase, recipeFromDb } from "@/lib/supabase";

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return notFound();

  return <RecipeClientLayout recipe={recipeFromDb(data)} />;
}

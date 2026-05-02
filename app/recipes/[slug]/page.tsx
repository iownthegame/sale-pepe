"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Recipe } from "@/types/recipe";
import RecipeClientLayout from "./RecipeClientLayout";
import { supabase, recipeFromDb } from "@/lib/supabase";

export default function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    supabase
      .from("recipes")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFoundState(true);
        } else {
          setRecipe(recipeFromDb(data));
        }
      });
  }, [slug]);

  if (notFoundState) return notFound();
  if (!recipe) return (
    <div className="min-h-screen bg-background animate-pulse" />
  );

  return <RecipeClientLayout recipe={recipe} />;
}

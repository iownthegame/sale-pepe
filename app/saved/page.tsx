"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { supabase, recipeFromDb } from "@/lib/supabase";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const { isSaved, isLoaded } = useSavedRecipes();

  useEffect(() => {
    supabase.from("recipes").select("*").then(({ data }) => {
      if (data) setAllRecipes(data.map(recipeFromDb));
    });
  }, []);

  const savedRecipes = allRecipes.filter((recipe) => isSaved(recipe.id));

  if (!isLoaded) {
    return (
      <div className="p-6 flex flex-col gap-8">
        <h1 className="text-3xl font-bold">My saved recipes</h1>
        <div className="grid gap-6">
          <div className="aspect-[16/10] w-full bg-foreground/5 animate-pulse rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6 pb-12 min-h-screen">
      <header>
        <h1 className="text-3xl font-bold">My saved recipes</h1>
      </header>

      {savedRecipes.length > 0 ? (
        <section className="grid gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="p-6 rounded-full bg-foreground/5 text-gray-400">
            <Bookmark size={40} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">No recipes saved</h2>
            <p className="text-gray-500 text-sm">
              Your bookmarked recipes will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

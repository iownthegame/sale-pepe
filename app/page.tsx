"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";
import { supabase, recipeFromDb } from "@/lib/supabase";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    supabase.from("recipes").select("*").order("id").then(({ data }) => {
      if (data) setRecipes(data.map(recipeFromDb));
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 p-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Our secret recipes
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Welcome back, Chef.
        </p>
      </header>

      <section className="grid gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </section>
    </div>
  );
}

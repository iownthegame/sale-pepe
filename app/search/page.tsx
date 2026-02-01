"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // A small delay (100ms) often helps if Next.js is still rendering the page
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredRecipes = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    return (recipesData as Recipe[]).filter((r) => {
      // Use ?. and ?? "" to handle missing titles or names
      const titleMatch = r.title?.toLowerCase().includes(query) ?? false;

      const ingredientMatch = r.ingredients?.some(i =>
        i.name?.toLowerCase().includes(query)
      ) ?? false;

      return titleMatch || ingredientMatch;
    });
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-8 p-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Find a recipe
        </h1>
      </header>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ingredients, dish names, chefs..."
          className="h-14 w-full bg-gray-100 border border-black/5 rounded-xl px-6 text-black text-lg outline-none focus:bg-white focus:border-black/10 transition-all shadow-sm"
          style={{
            caretColor: 'black',
            WebkitAppearance: 'none',
          }}
        />
      </div>

      <div className="mt-12">
        {searchQuery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (null)}
      </div>
    </div>
  );
}

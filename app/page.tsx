"use client";

import { useEffect, useState, useMemo } from "react";
import { Recipe, Category, Dietary, Course } from "@/types/recipe";
// Category, Dietary, Course used as generic type constraints via useMemo casts
import RecipeCard from "@/components/RecipeCard";
import { supabase, recipeFromDb } from "@/lib/supabase";


function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30"
      }`}
    >
      {label}
    </button>
  );
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set());
  const [activeDietaries, setActiveDietaries] = useState<Set<Dietary>>(new Set());
  const [activeCourses, setActiveCourses] = useState<Set<Course>>(new Set());

  const categories = useMemo(() => [...new Set(recipes.flatMap(r => r.categories))].sort() as Category[], [recipes]);
  const dietaries = useMemo(() => [...new Set(recipes.flatMap(r => r.dietaries))].sort() as Dietary[], [recipes]);
  const courses = useMemo(() => [...new Set(recipes.map(r => r.course))].sort() as Course[], [recipes]);

  useEffect(() => {
    supabase.from("recipes").select("*").order("id").then(({ data }) => {
      if (data) setRecipes(data.map(recipeFromDb));
    });
  }, []);

  const toggleCategory = (c: Category) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(c)) { next.delete(c); } else { next.add(c); }
      return next;
    });
  };

  const toggleDietary = (d: Dietary) => {
    setActiveDietaries(prev => {
      const next = new Set(prev);
      if (next.has(d)) { next.delete(d); } else { next.add(d); }
      return next;
    });
  };

  const toggleCourse = (c: Course) => {
    setActiveCourses(prev => {
      const next = new Set(prev);
      if (next.has(c)) { next.delete(c); } else { next.add(c); }
      return next;
    });
  };

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      if (activeCategories.size > 0 && !r.categories.some(c => activeCategories.has(c))) return false;
      if (activeDietaries.size > 0 && !r.dietaries.some(d => activeDietaries.has(d))) return false;
      if (activeCourses.size > 0 && !activeCourses.has(r.course)) return false;
      return true;
    });
  }, [recipes, activeCategories, activeDietaries, activeCourses]);

  return (
    <div className="flex flex-col gap-6 p-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Our secret recipes
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Welcome back, Chef.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(c => (
            <FilterChip key={c} label={c} active={activeCategories.has(c)} onClick={() => toggleCategory(c)} />
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {dietaries.map(d => (
            <FilterChip key={d} label={d} active={activeDietaries.has(d)} onClick={() => toggleDietary(d)} />
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {courses.map(c => (
            <FilterChip key={c} label={c} active={activeCourses.has(c)} onClick={() => toggleCourse(c)} />
          ))}
        </div>
      </div>

      <section className="grid gap-6">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {filtered.length === 0 && recipes.length > 0 && (
          <p className="text-center text-foreground/40 py-12 text-sm">No recipes match your filters.</p>
        )}
      </section>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import {
  Clock, Users, Flame, Utensils,
  ListChecks, Bookmark, BookmarkCheck
} from "lucide-react";
import Image from "next/image";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";

export default function RecipeClientLayout({ recipe }: { recipe: Recipe }) {
  const { toggleSave, isSaved } = useSavedRecipes();
  const saved = isSaved(recipe.id);

  const [hasMounted, setHasMounted] = useState(false);

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src={recipe.mainImage}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="px-6 -mt-12 relative z-10 space-y-8 max-w-2xl mx-auto">
        {/* Title & Save Button Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex gap-2">
                {recipe.dietaries.map(diet => (
                  <span key={diet} className="text-[10px] font-bold uppercase tracking-widest bg-foreground/5 text-foreground/60 px-3 py-1 rounded-full border border-foreground/5">
                    {diet}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold tracking-tight leading-tight">
                {recipe.title}
              </h1>
            </div>

            <button
              onClick={() => toggleSave(recipe.id)}
              className="mt-2 p-4 rounded-full bg-background border border-foreground/10 shadow-xl hover:scale-105 active:scale-95 transition-all group"
            >
              {saved ? (
                <BookmarkCheck className="text-foreground" size={24} fill="currentColor" />
              ) : (
                <Bookmark className="text-foreground/40 group-hover:text-foreground" size={24} />
              )}
            </button>
          </div>
          <p className="text-foreground/50 leading-relaxed">{recipe.description}</p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 text-center">
          <div className="space-y-1">
            <Clock size={18} className="mx-auto text-foreground/40" />
            <p className="text-xs font-bold">{recipe.duration.total}m</p>
            <p className="text-[10px] text-foreground/40 uppercase">Cook</p>
          </div>
          <div className="space-y-1 border-x border-foreground/10">
            <Users size={18} className="mx-auto text-foreground/40" />
            <p className="text-xs font-bold">{recipe.servings}</p>
            <p className="text-[10px] text-foreground/40 uppercase">Serves</p>
          </div>
          <div className="space-y-1">
            <Flame size={18} className="mx-auto text-foreground/40" />
            <p className="text-xs font-bold truncate px-1">{recipe.categories[0]}</p>
            <p className="text-[10px] text-foreground/40 uppercase">Style</p>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Utensils size={20} /> Ingredients
          </h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="h-2 w-2 rounded-full bg-primary/40" />
                <span className="flex-1 text-sm text-gray-500">
                  <span className="font-bold text-foreground">{ing.amount} {ing.unit}</span> {ing.item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ListChecks size={20} /> Instrucstions
          </h3>

          <div className="space-y-10">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                {/* Ordered Step Number */}
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-blck/10 select-none transition-colors">
                    {i + 1}
                  </span>
                </div>

                {/* Step Content - Increased contrast to text-zinc-300 */}
                <p className="text-base leading-relaxed text-gray-500 pt-1 border-l border-white/5 pl-6 group-hover:border-white/20 transition-colors">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ChevronRight } from "lucide-react";
import { Recipe } from "@/types/recipe";
import RecipeSaveButton from "./RecipeSaveButton";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="relative group">
      <div className="absolute top-4 right-4 z-20">
        <RecipeSaveButton id={recipe.id} />
      </div>

      <Link
        href={`/recipes/${recipe.slug}`}
        className="block bg-card rounded-[2rem] border border-white/5 overflow-hidden transition-all active:scale-[0.98]"
      >
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={recipe.mainImage}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />

          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
              {recipe.course}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold leading-tight pr-4">
              {recipe.title}
            </h2>
            <ChevronRight className="text-gray-600 mt-1" size={18} />
          </div>

          <div className="flex items-center gap-4 text-gray-500 text-xs font-medium">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{recipe.duration.total}m</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{recipe.servings} Servings</span>
            </div>
            <div className="ml-auto flex gap-1">
              {recipe.dietaries.slice(0, 2).map(diet => (
                <span key={diet} className="text-[9px] bg-white/5 px-2 py-0.5 rounded uppercase">
                  {diet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

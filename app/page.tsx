import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";
import Link from "next/link";
import { Clock, Users, ChevronRight } from "lucide-react";
import Image from "next/image"

export default function Home() {
  // Cast the JSON data to our Recipe array type
  const recipes = recipesData as Recipe[];

  return (
    <div className="flex flex-col gap-8 p-6 pb-12">
      {/* Header Section */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Our secret recipes
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Welcome back, Chef.
        </p>
      </header>

      {/* Recipe Grid */}
      <section className="grid gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.slug}`}
            className="group block bg-card rounded-[2rem] border border-white/5 overflow-hidden transition-all active:scale-[0.98]"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={recipe.mainImage}
                alt={recipe.title}
                fill // 2. Fill the container
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={recipe.id === "1"} // 3. Optimize LCP for the first image
              />
              {/* Floating Badge for Course */}
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                  {recipe.course}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold leading-tight pr-4">
                  {recipe.title}
                </h2>
                <ChevronRight className="text-gray-600 mt-1" size={18} />
              </div>

              {/* Meta Info Row */}
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
        ))}
      </section>
    </div>
  );
}

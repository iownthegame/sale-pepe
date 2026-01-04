import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";
import { Clock, Users, ChevronLeft, Flame, Utensils, ListChecks, ChefHat, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

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

      {/* Content */}
      <div className="px-6 -mt-12 relative z-10 space-y-8 max-w-2xl mx-auto">
        {/* Title & Description */}
        <section className="space-y-3">
          <div className="flex gap-2">
            {recipe.dietaries.map(diet => (
              <span key={diet} className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                {diet}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            {recipe.title}
          </h1>
          <p className="text-gray-400 leading-relaxed">
            {recipe.description}
          </p>
        </section>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-[2rem] bg-card border border-white/5">
          <div className="flex flex-col items-center justify-center space-y-1">
            <Clock size={18} className="text-gray-400" />
            <span className="text-xs font-bold">{recipe.duration.total}m</span>
            <span className="text-[10px] text-gray-500 uppercase">Cook</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 border-x border-white/10">
            <Users size={18} className="text-gray-400" />
            <span className="text-xs font-bold">{recipe.servings}</span>
            <span className="text-[10px] text-gray-500 uppercase">Serves</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <Flame size={18} className="text-gray-400" />
            <span className="text-xs font-bold">{recipe.categories[0]}</span>
            <span className="text-[10px] text-gray-500 uppercase">Style</span>
          </div>
        </div>

        {/* Ingredients */}
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

        {/* Instructions */}
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

import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";

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
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </section>
    </div>
  );
}

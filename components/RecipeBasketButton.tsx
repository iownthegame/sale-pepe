"use client";
import { useGrocery } from "@/context/GroceryContext";
import { ShoppingBasket } from "lucide-react";
import { Recipe } from "@/types/recipe";

export default function RecipeBasketButton({ recipe }: { recipe: Recipe }) {
  const { list, addToCard, removeRecipe } = useGrocery();
  const isInList = !!list[recipe.id];

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInList) {
      removeRecipe(recipe.id);
    } else {
      addToCard(recipe.id, recipe.title, recipe.slug, recipe.ingredients);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-sm active:scale-90
        ${isInList
          ? "bg-background/90 border-foreground/20 text-foreground"
          : "bg-background/60 border-white/20 text-foreground/40 hover:text-foreground"
        }`}
    >
      <ShoppingBasket
        size={18}
        strokeWidth={isInList ? 2.5 : 2}
        // This is the key: fill the icon with color only when selected
        fill={isInList ? "currentColor" : "none"}
        className={`transition-all duration-300 ${isInList ? "scale-110" : ""}`}
      />
    </button>
  );
}

"use client";
import { useGrocery } from "@/context/GroceryContext";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

export default function GroceryPage() {
  const { list, toggleItem, removeRecipe } = useGrocery();
  const recipeIds = Object.keys(list);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-32">
      {/* Clean Header Area */}
      <header className="flex justify-between items-end mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Grocery List</h1>
          <p className="text-gray-500 text-sm font-medium">
            {recipeIds.length} {recipeIds.length === 1 ? 'dish' : 'dishes'} in basket
          </p>
        </div>
      </header>

      {recipeIds.length === 0 ? (
        <div className="text-center py-24 bg-foreground/[0.02] rounded-[3rem] border border-dashed border-foreground/10">
          <p className="text-foreground/40 italic mb-6">Your list is currently empty.</p>
          <Link href="/" className="bg-foreground text-background px-8 py-3 rounded-full font-bold text-sm transition-all active:scale-95 inline-block">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="space-y-16">
          {recipeIds.map((id) => {
            const group = list[id];
            const checkedCount = group.ingredients.filter(i => i.checked).length;
            const progress = (checkedCount / group.ingredients.length) * 100;

            return (
              <section key={id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Recipe Header */}
                <div className="flex justify-between items-start mb-6 px-1">
                  <div className="space-y-2 flex-1">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
                      {group.recipeTitle}
                    </h2>
                    {/* Minimal Progress Line */}
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-20 bg-foreground/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-700 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">
                        {checkedCount} / {group.ingredients.length}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeRecipe(id)}
                    className="p-2 text-foreground/10 hover:text-red-500 transition-colors"
                    title="Remove from list"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Ingredient Buttons */}
                <div className="grid gap-3">
                  {group.ingredients.map((ing) => (
                    <button
                      key={ing.id}
                      onClick={() => toggleItem(id, ing.id)}
                      className={`flex items-center gap-4 p-5 rounded-[2.2rem] border transition-all text-left
                        ${ing.checked
                          ? 'bg-foreground/[0.01] border-transparent opacity-30 scale-[0.98]'
                          : 'bg-card border-foreground/5 shadow-sm active:scale-95'}`}
                    >
                      <div className="shrink-0">
                        {ing.checked ? (
                          <CheckCircle2 className="text-primary" size={26} />
                        ) : (
                          <Circle className="text-foreground/10" size={26} />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-base font-semibold ${ing.checked ? 'line-through decoration-1' : ''}`}>
                          {ing.item}
                        </span>
                        <span className="text-xs font-bold text-foreground/30 font-mono uppercase tracking-tighter">
                          {ing.amount} {ing.unit}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

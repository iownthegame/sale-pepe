"use client";
import { Terminal, Trash2, Database, ArrowLeft, ChefHat } from "lucide-react";
import Link from "next/link";
import { useGrocery } from "@/context/GroceryContext";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
// Assuming this is where your data lives
import recipesData from "@/data/recipes.json";

export default function DevToolsPage() {
  const { list } = useGrocery();

  const getSavedCount = () => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('saved-recipes');
    if (!saved) return 0;
    try {
      return JSON.parse(saved).length;
    } catch {
      return 0;
    }
  };

  const clearAllData = () => {
    if (confirm("Are you sure? This will wipe ALL grocery items and saved recipes.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const stats = [
    { label: "Total Recipes", value: recipesData.length }, // New Stat
    { label: "Saved Recipes", value: getSavedCount() },
    { label: "Grocery Dishes", value: Object.keys(list).length },
    { label: "Local Storage Used", value: typeof window !== 'undefined' ? `${JSON.stringify(localStorage).length} bytes` : '0' },
  ];

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8 pb-32">
      {/* Header */}
      <header className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <Terminal size={32} />
          <h1 className="text-2xl font-black uppercase tracking-tighter">Test Kitchen / Debug</h1>
        </div>
      </header>

      <div className="grid gap-8">
        {/* System Stats Card */}
        <section className="border border-green-500/20 bg-green-500/5 p-6 rounded-2xl">
          <h2 className="text-xs font-bold uppercase mb-4 opacity-50 flex items-center gap-2">
            <Database size={14} /> System_Stats
          </h2>
          {/* Changed to grid-cols-2 md:grid-cols-4 for the 4 stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label}>
                <p className="text-[10px] uppercase opacity-40">{stat.label}</p>
                <p className="text-2xl font-bold tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dangerous Actions */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase opacity-50">Critical_Procedures</h2>
          <div className="flex">
            <button
              onClick={clearAllData}
              className="flex items-center gap-3 bg-red-950/30 border border-red-500/50 text-red-500 px-6 py-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
              <Trash2 size={20} />
              <span className="font-bold uppercase tracking-tight">Nuke_Local_Storage</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

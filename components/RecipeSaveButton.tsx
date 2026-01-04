"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";

export default function RecipeSaveButton({ id }: { id: string }) {
  const { toggleSave, isSaved, isLoaded } = useSavedRecipes();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop the <Link> from triggering
    e.stopPropagation(); // Stop the event from bubbling up
    toggleSave(id);
  };

  return (
    <button
      onClick={handleSave}
      className="p-2.5 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-foreground transition-all active:scale-90 hover:bg-background/90"
    >
      {isLoaded && isSaved(id) ? (
        <BookmarkCheck size={18} fill="currentColor" className="animate-in zoom-in duration-200" />
      ) : (
        <Bookmark size={18} className="opacity-70" />
      )}
    </button>
  );
}

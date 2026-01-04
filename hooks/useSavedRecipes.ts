"use client";
import { useState, useEffect } from "react";

export function useSavedRecipes() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial Load: Only runs once on mount
  useEffect(() => {
    const stored = localStorage.getItem("saved-recipes");
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSavedIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved recipes", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Sync to Storage: Only runs when savedIds change,
  // and ONLY after the initial load is complete.
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("saved-recipes", JSON.stringify(savedIds));
  }, [savedIds, isLoaded]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return { toggleSave, isSaved, isLoaded };
}

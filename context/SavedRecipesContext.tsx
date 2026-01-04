"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SavedContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  isLoaded: boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedRecipesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from Storage
  useEffect(() => {
    const stored = localStorage.getItem("saved-recipes");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      try { setSavedIds(JSON.parse(stored)); } catch (e) { }
    }
    setIsLoaded(true);
  }, []);

  // Sync to Storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("saved-recipes", JSON.stringify(savedIds));
    }
  }, [savedIds, isLoaded]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved, isLoaded }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedRecipes() {
  const context = useContext(SavedContext);
  if (!context) throw new Error("useSavedRecipes must be used within Provider");
  return context;
}

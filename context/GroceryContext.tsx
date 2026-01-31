"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ingredient } from '@/types/recipe';

interface GroceryItem extends Ingredient {
  id: string;
  checked: boolean;
}

interface GroceryGroup {
  recipeTitle: string;
  ingredients: GroceryItem[];
}

interface GroceryContextType {
  list: Record<string, GroceryGroup>;
  addToCard: (recipeId: string, title: string, ingredients: Ingredient[]) => void;
  toggleItem: (recipeId: string, itemId: string) => void;
  removeRecipe: (recipeId: string) => void;
  totalItems: number;
}

const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export function GroceryProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<Record<string, GroceryGroup>>({});

  useEffect(() => {
    const saved = localStorage.getItem('sale-pepe-grocery');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setList(JSON.parse(saved));
    }
  }, []);

  const saveAndSet = (newList: Record<string, GroceryGroup>) => {
    setList(newList);
    localStorage.setItem('sale-pepe-grocery', JSON.stringify(newList));
  };

  const addToCard = (recipeId: string, title: string, ingredients: Ingredient[]) => {
    const newList = { ...list };
    newList[recipeId] = {
      recipeTitle: title,
      ingredients: ingredients.map((ing, idx) => ({
        ...ing,
        checked: false,
        id: `${recipeId}-${idx}`
      }))
    };
    saveAndSet(newList);
  };

  const toggleItem = (recipeId: string, itemId: string) => {
    const newList = { ...list };
    if (!newList[recipeId]) return;
    newList[recipeId].ingredients = newList[recipeId].ingredients.map(ing =>
      ing.id === itemId ? { ...ing, checked: !ing.checked } : ing
    );
    saveAndSet(newList);
  };

  const removeRecipe = (recipeId: string) => {
    const newList = { ...list };
    delete newList[recipeId];
    saveAndSet(newList);
  };

  const totalItems = Object.values(list).reduce((acc, group) => acc + group.ingredients.length, 0);

  return (
    <GroceryContext.Provider value={{ list, addToCard, toggleItem, removeRecipe, totalItems }}>
      {children}
    </GroceryContext.Provider>
  );
}

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) throw new Error("useGrocery must be used within a GroceryProvider");
  return context;
};

import { SavedRecipesProvider } from './SavedRecipesContext';
import { GroceryProvider } from './GroceryContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SavedRecipesProvider>
      <GroceryProvider>
        {children}
      </GroceryProvider>
    </SavedRecipesProvider>
  );
}

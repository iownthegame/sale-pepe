import { SavedRecipesProvider } from './SavedRecipesContext';
import { GroceryProvider } from './GroceryContext';
import { AuthProvider } from './AuthContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SavedRecipesProvider>
        <GroceryProvider>
          {children}
        </GroceryProvider>
      </SavedRecipesProvider>
    </AuthProvider>
  );
}

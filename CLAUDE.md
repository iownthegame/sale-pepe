# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # start local dev server at localhost:3000
bun build      # production build
bun lint       # run ESLint
bun add <pkg>  # install a package
```

The pre-commit hook runs `bun lint` automatically via husky — commits will be blocked if lint fails.

## Local Development

Requires a running Supabase instance. Start the local stack (requires Docker):

```bash
supabase start        # starts local Supabase at http://127.0.0.1:54321
supabase db reset     # applies migrations and resets data
bun supabase/seed.ts  # seeds recipes from data/recipes.json
```

Create `.env.local` with the local keys (printed by `supabase start`):

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local anon key>
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=<google oauth secret>
```

Then run `bun dev`.

## Production

- **Frontend**: Vercel — pushes to `main` auto-deploy to `salepepe.nl`
- **Database**: Hosted Supabase project at `xaueopasgjpeooadbhbb.supabase.co`

To push schema changes to production:

```bash
supabase link --project-ref xaueopasgjpeooadbhbb
supabase db push
```

To reseed production recipes:

```bash
SUPABASE_URL=https://xaueopasgjpeooadbhbb.supabase.co SUPABASE_SERVICE_KEY=<secret key> bun supabase/seed.ts
```

## Architecture

SalePepe is a **Next.js app** (App Router, no static export) backed by Supabase. All data fetching happens client-side using the Supabase JS client with RLS enforcing access control.

### Data

Recipe data is stored in the `recipes` table in Supabase. `data/recipes.json` is the seed source — it is no longer the runtime source of truth.

The `types/recipe.ts` file defines the full schema. Key type detail: ingredients use `item` (not `name`) for the ingredient string field.

`lib/supabase.ts` exports the Supabase client and `recipeFromDb()` which maps DB rows to the `Recipe` type. Local image paths have `/sale-pepe/` stripped in `recipeFromDb` (leftover from the old GitHub Pages basePath).

To add a new recipe use the `/import-recipe` Claude skill or the `/dev` page (uses Gemini AI, requires `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local`).

### Auth

Google OAuth via Supabase. `context/AuthContext.tsx` exposes `useAuth()` with `user`, `signInWithGoogle()`, and `signOut()`. Auth state is available app-wide via `<AuthProvider>` in `context/index.tsx`.

Access levels:
- **Unauthenticated** — browse recipes, search, save to localStorage, grocery list
- **Logged-in** — above + add/view cook logs
- **Editor** (`is_editor = true` in `profiles`) — above + add/edit recipes

Google OAuth client ID is in `supabase/config.toml`. The secret goes in `.env.local` as `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET` (local) and directly in the Supabase dashboard (production).

### State

Three React contexts in `context/index.tsx` as `<AppProviders>`:

- `AuthContext` — current user session via Supabase auth
- `SavedRecipesContext` — saved recipe IDs persisted to `localStorage` (`saved-recipes` key)
- `GroceryContext` — grocery list grouped by recipe ID, persisted to `localStorage` (`sale-pepe-grocery` key)

### Routing

| Route | Description |
|---|---|
| `/` | Recipe gallery |
| `/recipes/[slug]` | Recipe detail (`RecipeClientLayout.tsx` is the client wrapper) |
| `/search` | Search by title or ingredient |
| `/saved` | Saved recipes |
| `/grocery` | Grocery list |
| `/dev` | AI recipe importer + debug tools (dev only) |

### Database

Schema is in `supabase/migrations/20260425123209_init_recipes.sql`. Tables:

- `recipes` — public read, editor-only write
- `profiles` — extends `auth.users`, has `is_editor` flag
- `cook_logs` — scoped to `user_id` via RLS

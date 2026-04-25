# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # start local dev server at localhost:3000
bun build      # static export build (outputs to ./out)
bun lint       # run ESLint
bun add <pkg>  # install a package
```

The pre-commit hook runs `bun lint` automatically via husky — commits will be blocked if lint fails.

## Architecture

SalePepe is a **fully static Next.js app** exported to GitHub Pages (`output: 'export'`, `basePath: '/sale-pepe'`). There is no backend, no database, and no API routes.

### Data

All recipe data lives in `data/recipes.json`. The `types/recipe.ts` file defines the full schema. Key type detail: ingredients use `item` (not `name`) for the ingredient string field.

To add a new recipe, paste the raw text or URL into the `/dev` page — it uses Gemini AI (requires `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local`) to produce structured JSON, which you then copy manually into `recipes.json`.

### State

Two React contexts handle all runtime state, both persisted to `localStorage`:

- `SavedRecipesContext` — tracks saved recipe IDs (`saved-recipes` key)
- `GroceryContext` — tracks grocery list grouped by recipe ID (`sale-pepe-grocery` key)

Both are composed in `context/index.tsx` as `<AppProviders>` and mounted in `app/layout.tsx`.

### Routing

| Route | Description |
|---|---|
| `/` | Recipe gallery |
| `/recipes/[slug]` | Recipe detail (`RecipeClientLayout.tsx` is the client wrapper) |
| `/search` | Search by title or ingredient |
| `/saved` | Saved recipes |
| `/grocery` | Grocery list |
| `/dev` | AI recipe importer + debug tools (dev only) |

### Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/nextjs.yml`) which builds with bun and deploys the `./out` directory to GitHub Pages.

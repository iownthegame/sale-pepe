---
name: import-recipe
description: Import a recipe from an Instagram post or a chef's website into data/recipes.json. Use when the user provides a URL to a recipe.
argument-hint: "<instagram-url or website-url>"
---

# import-recipe

Import a recipe from a URL (Instagram post or chef's website) and append it to `data/recipes.json`.

## Steps

1. **Fetch the URL** provided by the user as the argument.
   - Use WebFetch to retrieve the page content.
   - If it's an Instagram URL, also try fetching the embed (e.g. `https://www.instagram.com/p/<embedId>/embed/`) for more structured content.

2. **Extract recipe data** from the fetched content. Map everything to the `Recipe` schema:

   ```ts
   {
     id: string              // next integer after the current max id in recipes.json
     slug: string            // kebab-case of the title
     title: string
     description: string     // 1-2 sentence summary of the dish
     sourceUrl: string       // the original URL
     chef: {
       name: string
       instagramUrl?: string // if found
       websiteUrl?: string   // if found
     }
     servings: number
     mainImage: string       // best image URL found on the page; use absolute URL
     images: []
     course: Course          // one of: "Appetizer" | "Starter" | "Main" | "Side" | "Dessert" | "Snack" | "Drink"
     dietaries: Dietary[]    // subset of: "Vegan" | "Vegetarian" | "Meat" | "Pescatarian" | "Gluten-Free" | "Lactose-Free"
     categories: Category[]  // subset of: "Italian" | "Asian" | "Mexican" | "Quick" | "Healthy" | "Pasta" | "Meat"
     duration: {
       prep: number          // minutes
       cook: number          // minutes
       total: number         // minutes
     }
     ingredients: [
       { item: string, amount: number, unit: Unit }
       // Unit must be one of: "g" | "ml" | "tsp" | "tbsp" | "cup" | "pinch" | "clove" | "piece"
       // item should include any descriptor e.g. "Garlic, minced"
     ]
     instructions: string[]  // each step as a plain string
     embed?: {               // only if source is Instagram
       type: "instagram"
       embedId: string       // the shortcode from the URL e.g. "DPXevB3Cewe"
     }
   }
   ```

3. **Determine the next ID**: Read `data/recipes.json`, find the current max numeric id, add 1.

4. **Show a preview** of the extracted JSON to the user and ask for confirmation before writing. Highlight anything uncertain (e.g. inferred values, missing fields).

5. **On confirmation**: Read `data/recipes.json`, append the new recipe object to the array, write the file back with consistent 2-space indentation.

6. **Commit** the change:
   ```bash
   git add data/recipes.json
   git commit -m "feat(data): add recipe <title>"
   ```

7. **Ask before pushing**: Always ask the user if they want to push — never push automatically.

## Notes

- `unit` must be one of the allowed values. If an ingredient uses something else (e.g. "oz", "lb"), convert to the nearest allowed unit (g or ml).
- If `prep` or `cook` times are not explicitly stated, make a reasonable estimate and flag it to the user.
- If the page requires login or blocks scraping, tell the user and ask them to paste the raw recipe text instead, then extract from that.
- For `mainImage`: prefer a direct image URL on the page. If the recipe is local to the project (stored in `public/images/recipes/`), use the `/sale-pepe/images/recipes/<filename>` path format instead.

import { createClient } from "@supabase/supabase-js";
import type { Recipe } from "@/types/recipe";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recipeFromDb(row: any): Recipe {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    sourceUrl: row.source_url ?? undefined,
    chef: {
      name: row.chef_name,
      instagramUrl: row.chef_instagram ?? undefined,
      websiteUrl: row.chef_website ?? undefined,
    },
    servings: row.servings,
    mainImage: row.main_image ?? "",
    images: row.images ?? [],
    course: row.course,
    dietaries: row.dietaries ?? [],
    categories: row.categories ?? [],
    duration: {
      prep: row.prep_min,
      cook: row.cook_min,
      total: row.total_min,
    },
    ingredients: row.ingredients ?? [],
    instructions: row.instructions ?? [],
    embed: row.embed_type && row.embed_id
      ? { type: row.embed_type, embedId: row.embed_id }
      : undefined,
  };
}

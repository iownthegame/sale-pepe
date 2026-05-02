import { createClient } from "@supabase/supabase-js";
import recipes from "../data/recipes.json";

const url = process.env.SUPABASE_URL ?? "http://127.0.0.1:54321";
const key = process.env.SUPABASE_SERVICE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

const supabase = createClient(url, key);

const rows = recipes.map((r) => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  description: r.description ?? null,
  source_url: r.sourceUrl ?? null,
  chef_name: r.chef.name,
  chef_instagram: r.chef.instagramUrl ?? null,
  chef_website: r.chef.websiteUrl ?? null,
  servings: r.servings,
  main_image: r.mainImage ?? null,
  images: r.images ?? [],
  course: r.course,
  dietaries: r.dietaries ?? [],
  categories: r.categories ?? [],
  prep_min: r.duration.prep,
  cook_min: r.duration.cook,
  total_min: r.duration.total,
  ingredients: r.ingredients,
  instructions: r.instructions,
  embed_type: r.embed?.type ?? null,
  embed_id: r.embed?.embedId ?? null,
}));

const { error } = await supabase.from("recipes").upsert(rows);
if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}
console.log(`Seeded ${rows.length} recipes.`);

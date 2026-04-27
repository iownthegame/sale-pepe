-- Recipes table (migrated from recipes.json)
create table public.recipes (
  id          text primary key,
  slug        text not null unique,
  title       text not null,
  description text,
  source_url  text,

  -- Chef
  chef_name       text not null,
  chef_instagram  text,
  chef_website    text,

  servings    integer not null default 1,
  main_image  text,
  images      text[] not null default '{}',

  course      text not null,
  dietaries   text[] not null default '{}',
  categories  text[] not null default '{}',

  -- Duration in minutes
  prep_min    integer not null default 0,
  cook_min    integer not null default 0,
  total_min   integer not null default 0,

  ingredients jsonb not null default '[]',
  instructions text[] not null default '{}',

  -- Optional Instagram embed
  embed_type  text,
  embed_id    text,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- User profiles (extends Supabase auth.users)
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  is_editor   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Cook logs
create table public.cook_logs (
  id          uuid primary key default gen_random_uuid(),
  recipe_id   text not null references public.recipes(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  cooked_on   date not null default current_date,
  rating      integer check (rating between 1 and 5),
  notes       text,
  photo_url   text,
  created_at  timestamptz not null default now()
);

-- Auto-update updated_at on recipes
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger recipes_updated_at
  before update on public.recipes
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.recipes enable row level security;
alter table public.profiles enable row level security;
alter table public.cook_logs enable row level security;

-- Recipes: anyone can read, only editors can write
create policy "recipes_read" on public.recipes for select using (true);
create policy "recipes_write" on public.recipes for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_editor = true
    )
  );

-- Profiles: users can read all, only own row to write
create policy "profiles_read" on public.profiles for select using (true);
create policy "profiles_write" on public.profiles for all using (auth.uid() = id);

-- Cook logs: anyone can read, own rows to write
create policy "cook_logs_read" on public.cook_logs for select using (true);
create policy "cook_logs_write" on public.cook_logs for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

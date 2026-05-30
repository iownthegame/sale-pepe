-- Allow authenticated users to insert cook logs on behalf of others (for tagging)
create policy "cook_logs_insert_for_others" on public.cook_logs
  for insert with check (auth.uid() is not null);

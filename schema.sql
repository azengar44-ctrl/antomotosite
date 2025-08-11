-- Neon schema + RLS
create table if not exists public.profiles (
  id uuid primary key,
  name text,
  avatar_url text,
  created_at timestamptz default now()
);
create table if not exists public.messages (
  id bigserial primary key,
  user_id uuid null,
  name text not null,
  email text,
  body text not null,
  source_path text,
  created_at timestamptz default now()
);
alter table public.profiles  enable row level security;
alter table public.messages enable row level security;
alter table public.profiles  force row level security;
alter table public.messages force row level security;
create policy profiles_select on public.profiles
for select using (current_setting('app.user_id', true)::uuid = id);
create policy profiles_insert on public.profiles
for insert with check (current_setting('app.user_id', true)::uuid = id);
create policy profiles_update on public.profiles
for update using (current_setting('app.user_id', true)::uuid = id);
create policy messages_select on public.messages
for select using (
  current_setting('app.user_id', true) is not null
  and user_id::text = current_setting('app.user_id', true)
);
create policy messages_insert_auth on public.messages
for insert with check (
  current_setting('app.user_id', true) is not null
  and user_id::text = current_setting('app.user_id', true)
);
create policy messages_insert_anon on public.messages
for insert with check (user_id is null);

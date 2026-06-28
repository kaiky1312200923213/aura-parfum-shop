-- Execute no SQL Editor do Supabase (Dashboard > SQL)
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Leitura pública de site_settings"
  on public.site_settings for select
  using (true);

create policy "Escrita via service role"
  on public.site_settings for all
  using (true)
  with check (true);

-- Bucket para vídeos (Dashboard > Storage > New bucket: "videos", public)
-- Bucket para imagens já deve existir como "images"

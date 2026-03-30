-- Blog posts for HealthCoverCompare (read/write via Edge Function + service role).
-- Run in Supabase Dashboard → SQL Editor if migrations are not auto-applied.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_published_at_idx
  on public.blog_posts (published, published_at desc nulls last);

comment on table public.blog_posts is 'Marketing blog; public reads via Edge Function; writes require BLOG_ADMIN_SECRET.';

alter table public.blog_posts enable row level security;

-- No policies: anon cannot read/write directly. Edge Function uses service role.

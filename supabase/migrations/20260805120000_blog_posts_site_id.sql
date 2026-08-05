-- Multi-site blog: shared table for healthcovercomparison + comparebusinesshealthcover.
-- Existing posts default to site_id = 'hcc'.
-- Apply in Supabase SQL Editor if migrations are not auto-applied.

alter table public.blog_posts
  add column if not exists site_id text not null default 'hcc';

comment on column public.blog_posts.site_id is
  'Tenant key: hcc = healthcovercomparison.co.uk, cbhc = comparebusinesshealthcover.co.uk';

alter table public.blog_posts drop constraint if exists blog_posts_slug_key;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'blog_posts_site_slug_key'
  ) then
    alter table public.blog_posts
      add constraint blog_posts_site_slug_key unique (site_id, slug);
  end if;
end $$;

create index if not exists blog_posts_site_published_published_at_idx
  on public.blog_posts (site_id, published, published_at desc nulls last);

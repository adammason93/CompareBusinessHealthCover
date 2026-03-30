-- Optional hero/thumbnail URL for blog posts (HTTPS image URL).
alter table public.blog_posts
  add column if not exists cover_image_url text not null default '';

comment on column public.blog_posts.cover_image_url is 'HTTPS URL for card/hero image; optional.';

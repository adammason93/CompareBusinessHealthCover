-- Telegram "firm opened their page" alerts for /for/<slug>.
-- phone: the firm's public business number, copied from its own website (phone_source_url).
-- Null when none was found; never guessed.

alter table public.outreach_contacts
  add column if not exists phone text,
  add column if not exists phone_source_url text;

-- Every beacon from a real browser view of /for/<slug> (after ~2s visible).
create table if not exists public.outreach_page_views (
  id bigint generated always as identity primary key,
  slug text not null,
  viewed_at timestamptz not null default now(),
  user_agent text,
  referrer text,
  alerted boolean not null default false,
  skipped_reason text
);
create index if not exists outreach_page_views_slug_time on public.outreach_page_views (slug, viewed_at desc);

-- One row per firm: when we last alerted Adam. Used to send at most one alert per 24h.
create table if not exists public.outreach_page_alerts (
  slug text primary key,
  last_alert_at timestamptz not null default now()
);

alter table public.outreach_page_views enable row level security;
alter table public.outreach_page_alerts enable row level security;

-- Atomically claim the alert slot for a slug: true only if no alert in the last 24 hours.
create or replace function public.claim_outreach_page_alert(p_slug text)
returns boolean
language sql
security definer
set search_path = public
as $$
  with claimed as (
    insert into public.outreach_page_alerts as a (slug, last_alert_at)
    values (p_slug, now())
    on conflict (slug) do update set last_alert_at = now()
      where a.last_alert_at < now() - interval '24 hours'
    returning 1
  )
  select exists (select 1 from claimed);
$$;

revoke all on function public.claim_outreach_page_alert(text) from public, anon, authenticated;
grant execute on function public.claim_outreach_page_alert(text) to service_role;

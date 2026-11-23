-- Cold outreach opt-outs ("Not interested" link in B2B emails).
-- Only the edge function (service role) reads or writes these tables. RLS on, no policies.

create table if not exists public.outreach_contacts (
  slug text primary key,
  firm text not null,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.outreach_suppressions (
  slug text primary key,
  firm text,
  email text,
  opted_out_at timestamptz not null default now(),
  source text not null default 'email-link',
  user_agent text
);

comment on table public.outreach_suppressions is
  'Do-not-contact list for cold outreach. One row per firm slug; never email these again.';

alter table public.outreach_contacts enable row level security;
alter table public.outreach_suppressions enable row level security;

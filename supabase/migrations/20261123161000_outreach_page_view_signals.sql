-- Persist the signals we use to tell a person from a scanner or from Adam,
-- so later alerts can be checked without digging through edge logs.
alter table public.outreach_page_views
  add column if not exists ip text,
  add column if not exists as_org text,
  add column if not exists country text,
  add column if not exists trust_score integer,
  add column if not exists visible_ms integer,
  add column if not exists had_interaction boolean,
  add column if not exists webdriver boolean;

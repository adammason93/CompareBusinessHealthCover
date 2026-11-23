-- Personalised outreach landing pages: /for/<slug> on comparebusinesshealthcover.co.uk.
-- Every outreach_contacts row gets a page. These optional columns hold only facts taken
-- from the verified prospect research (sector label and staff figure from Companies House
-- filings or the firm's own site). Leave them null when we don't have a verified value.
-- Only the edge function (service role) reads this table; RLS stays on with no policies.

alter table public.outreach_contacts
  add column if not exists sector text,
  add column if not exists staff_count integer check (staff_count is null or staff_count > 0),
  add column if not exists page_enabled boolean not null default true;

comment on column public.outreach_contacts.sector is
  'Short, plain sector label shown on /for/<slug> (e.g. "Architects"). Null when unverified.';
comment on column public.outreach_contacts.staff_count is
  'Approximate headcount from public filings or the firm''s site; the page shows a band, never the raw number.';
comment on column public.outreach_contacts.page_enabled is
  'Set false to switch off the personalised page for a firm (it then falls back to the homepage).';

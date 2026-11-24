-- Contact name for Telegram page-open alerts only.
-- The public /outreach-page API must never return contact_name or email:
-- those stay on the server (service role) and in the Telegram message to Adam.
-- contact_name is filled only from prospect research or the outreach send list,
-- never guessed. Null when we do not have a name.

alter table public.outreach_contacts
  add column if not exists contact_name text;

comment on column public.outreach_contacts.contact_name is
  'Named person on file for this firm, from prospect research (for example a published director). Null when unknown. Server-side only; never returned by the public outreach-page API.';

comment on column public.outreach_contacts.email is
  'Outreach recipient address from the sent email or the verified prospects list. Never guessed. Server-side only; never returned by the public outreach-page API.';

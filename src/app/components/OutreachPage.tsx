import { useEffect, useState } from "react";
import { ArrowRight, Phone, ClipboardList, Handshake, Scale } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SITE, telHref } from "@/app/config/site";
import { projectId, publicAnonKey } from "/utils/supabase/info";

/** Public facts for one firm's personalised page (/for/<slug>). */
export type OutreachFirm = {
  slug: string;
  firm: string;
  sector: string | null;
  staffBand: string | null;
};

const PAGE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/outreach-page`;
// Same-origin so the Worker can see Cloudflare network signals and Adam's ignore cookie.
const VIEW_URL = "/outreach-page-view";
const VIEW_AFTER_MS = 2000;
const OWNER_IGNORE_KEY = "cbhc_owner_ignore";
// Legacy Edge used "Edge/12"; current Edge uses "Edg/". The Chrome 125 + Edge/12.246
// string is a known spoof — no real browser has ever sent both.
const BOT_OR_SPOOFED_UA =
  /headless|bot|crawl|spider|preview|slurp|facebookexternalhit|linkedin|slack|whatsapp|telegram|\bEdge\//i;

function isOwnerIgnored(): boolean {
  try {
    if (localStorage.getItem(OWNER_IGNORE_KEY) === "1") return true;
  } catch {
    /* storage blocked */
  }
  return typeof document !== "undefined" && /(?:^|;\s*)cbhc_owner_ignore=1(?:;|$)/.test(document.cookie);
}

function hasZeroScreen(): boolean {
  return typeof screen !== "undefined" && (screen.width === 0 || screen.height === 0);
}

/**
 * Tell the server a person is looking at this page, so it can alert Adam.
 * Only fires from a real browser after the page has been visible for ~2s and the visitor
 * has genuinely interacted (click, tap, key, wheel, or scroll). A visibility timer alone
 * is not enough: email scanners often keep a page open for 10s+ without a person there.
 * Never on the raw GET. Once per tab session per firm; the server also limits alerts
 * to one per firm per 24h. Adam's own browser can opt out via /owner/ignore-alerts/.
 */
function useViewBeacon(slug: string) {
  useEffect(() => {
    if (typeof document === "undefined" || (navigator as any).webdriver) return;
    if (BOT_OR_SPOOFED_UA.test(navigator.userAgent)) return;
    if (hasZeroScreen()) return;
    if (isOwnerIgnored()) return;
    const key = `cbhc_view_${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* storage blocked: still send once for this mount */
    }
    let visibleMs = 0;
    let since = document.visibilityState === "visible" ? performance.now() : null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let sent = false;
    let interacted = false;

    const readyToSend = () => interacted && visibleMs >= VIEW_AFTER_MS;

    const send = () => {
      if (sent || !readyToSend()) return;
      sent = true;
      try {
        sessionStorage.setItem(key, "1");
      } catch {
        /* ignore */
      }
      fetch(VIEW_URL, {
        method: "POST",
        keepalive: true,
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          visibleMs: Math.round(visibleMs),
          hadInteraction: interacted,
          webdriver: Boolean((navigator as any).webdriver),
          referrer: document.referrer || undefined,
          screenWidth: typeof screen !== "undefined" ? screen.width : undefined,
          screenHeight: typeof screen !== "undefined" ? screen.height : undefined,
        }),
      }).catch(() => undefined);
    };
    const schedule = () => {
      if (timer) clearTimeout(timer);
      if (sent || !interacted) return;
      const wait = VIEW_AFTER_MS - visibleMs;
      timer = setTimeout(() => {
        if (since !== null) visibleMs += performance.now() - since;
        since = document.visibilityState === "visible" ? performance.now() : null;
        if (readyToSend()) send();
        else schedule();
      }, Math.max(100, wait));
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        since = performance.now();
        schedule();
      } else {
        if (since !== null) visibleMs += performance.now() - since;
        since = null;
        if (timer) clearTimeout(timer);
      }
    };
    const onInteract = () => {
      interacted = true;
      if (since !== null) {
        visibleMs += performance.now() - since;
        since = performance.now();
      }
      if (readyToSend()) send();
      else schedule();
    };
    const interactEvents = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"] as const;
    document.addEventListener("visibilitychange", onVisibility);
    for (const ev of interactEvents) {
      window.addEventListener(ev, onInteract, { once: true, passive: true });
    }
    if (since !== null) schedule();
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      for (const ev of interactEvents) window.removeEventListener(ev, onInteract);
      if (timer) clearTimeout(timer);
    };
  }, [slug]);
}
const SMALL_WORDS = new Set(["and", "of", "the", "for", "&"]);

/** "Haworth Tompkins" → "HT". Our own lettering, never the firm's logo. */
export function firmInitials(name: string): string {
  const words = name
    .replace(/\(.*?\)/g, " ")
    .split(/[\s\-–/]+/)
    .map((w) => w.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter((w) => w && !SMALL_WORDS.has(w.toLowerCase()));
  const letters = words.slice(0, 2).map((w) => w[0]!.toUpperCase());
  return letters.join("") || "?";
}

function InitialsBadge({ name }: { name: string }) {
  return (
    <div
      aria-hidden
      className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-navy text-2xl sm:text-3xl font-bold tracking-wide shadow-lg ring-4 ring-brand-teal-light/60"
    >
      {firmInitials(name)}
    </div>
  );
}

/** "fewer than 10" reads as-is; numeric ranges read "about 10 to 24". */
function teamPhrase(band: string): string {
  return band.startsWith("fewer") ? band : `about ${band}`;
}

function sizeSentence(band: string | null): string {
  switch (band) {
    case null:
      return "Group cover is usually available from 2 employees, and most schemes let you add new starters as your team changes.";
    case "fewer than 10":
      return "For a smaller team, a scheme can usually start from 2 people, and most plans let you add new starters as you grow.";
    case "10 to 24":
    case "25 to 49":
      return `With a team of ${band} people, you will usually have a wider choice of plan and underwriting options than a very small scheme, and a broker can set several insurers' options side by side.`;
    default:
      return `With a team of ${band} people, some insurers may offer more tailored scheme options, including medical history disregarded underwriting, which a broker can explain.`;
  }
}

function capitalise(v: string): string {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

export function useOutreachFirm(slug: string): { firm: OutreachFirm | null; status: "loading" | "ready" | "missing" } {
  const [state, setState] = useState<{ firm: OutreachFirm | null; status: "loading" | "ready" | "missing" }>({
    firm: null,
    status: "loading",
  });
  useEffect(() => {
    let cancelled = false;
    setState({ firm: null, status: "loading" });
    fetch(`${PAGE_URL}?slug=${encodeURIComponent(slug)}`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    })
      .then(async (res) => (res.ok ? ((await res.json()) as OutreachFirm) : null))
      .catch(() => null)
      .then((firm) => {
        if (!cancelled) setState(firm?.firm ? { firm, status: "ready" } : { firm: null, status: "missing" });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);
  return state;
}

interface OutreachPageProps {
  firm: OutreachFirm;
  onGetStarted: () => void;
  renderEmbeddedForm: (initialCompanyName?: string) => JSX.Element;
}

export function OutreachPage({ firm, onGetStarted, renderEmbeddedForm }: OutreachPageProps) {
  useViewBeacon(firm.slug);
  useEffect(() => {
    document.title = `Health cover options for ${firm.firm} | ${SITE.name}`;
  }, [firm.firm]);

  const facts = [
    firm.sector ? { label: "Sector", value: firm.sector } : null,
    firm.staffBand ? { label: "Team size", value: `${capitalise(teamPhrase(firm.staffBand))} people` } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const steps = [
    {
      icon: ClipboardList,
      title: "Tell us a little about your team",
      body: "A few short questions about your business and the cover you're interested in. It takes about two minutes.",
    },
    {
      icon: Handshake,
      title: "We introduce you to an FCA-regulated broker",
      body: "The broker gets in touch at a time that suits you to understand what you need.",
    },
    {
      icon: Scale,
      title: "The broker compares options with you",
      body: "They can look at plans from several insurers and explain the differences. You decide, and there's no obligation.",
    },
  ];

  return (
    <div className="min-h-screen bg-background" data-outreach-slug={firm.slug}>
      <section className="section-hero relative py-14 sm:py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5 mb-6">
            <InitialsBadge name={firm.firm} />
            <div className="min-w-0">
              <p className="text-sm uppercase tracking-wider text-white/70 mb-1">Prepared for</p>
              <p className="text-xl sm:text-2xl font-semibold text-white leading-tight break-words">{firm.firm}</p>
              {facts.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {facts.map((f) => (
                    <span
                      key={f.label}
                      className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm text-white"
                    >
                      <span className="text-white/70 mr-1">{f.label}:</span> {f.value}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl mb-5 text-white">Health cover options for {firm.firm}</h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            A short, plain-English overview of group private medical insurance for a team
            {firm.staffBand ? ` of ${teamPhrase(firm.staffBand)} people` : " like yours"}, and how our free introduction to an
            FCA-regulated broker works.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full px-8 py-6 text-lg"
            >
              Start a free enquiry <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a
              href={telHref()}
              className="inline-flex items-center justify-center gap-2 text-white font-semibold text-lg hover:underline"
            >
              <Phone className="w-5 h-5" aria-hidden />
              {SITE.phoneDisplay}
            </a>
          </div>
          {facts.length ? (
            <p className="text-xs text-white/60 mt-6">
              We based the sector and team size on public information, such as Companies House filings, so they may not
              be exact.
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-brand-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-6">
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Answer a few short questions below and we'll introduce {firm.firm} to an FCA-regulated broker, who can talk
            you through group health cover options. It's free, and there's no obligation.
          </p>
        </div>
      </section>

      <section id="quote-form" className="bg-brand-surface pb-10 sm:pb-12 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Start a free enquiry for {firm.firm}</h2>
          <p className="text-gray-600 text-center mb-6 text-sm">
            A few short questions. Prefer to talk? Call{" "}
            <a href={telHref()} className="font-semibold text-brand-navy underline">
              {SITE.phoneDisplay}
            </a>
            .
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            {renderEmbeddedForm(firm.firm)}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What group cover can look like for your team</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Group private medical insurance (PMI) is a company-paid plan that helps employees get private diagnosis and
            treatment for eligible conditions. {sizeSentence(firm.staffBand)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">The main choices a broker will usually talk through are:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
            <li>Who is covered: employees only, or with the option for staff to add partners and children.</li>
            <li>How existing conditions are handled (underwriting), such as moratorium or full medical underwriting.</li>
            <li>Outpatient limits and the excess, which both affect the cost of the plan.</li>
            <li>Extras such as mental health support, a virtual GP or physiotherapy, depending on the insurer and plan.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Company-paid medical cover is usually treated as a taxable benefit for employees. The broker can explain how
            this works for your business.
          </p>
        </div>
      </section>

      <section className="bg-brand-surface border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">How the free introduction works</h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-white font-semibold">
                    {i + 1}
                  </span>
                  <s.icon className="w-5 h-5 text-brand-teal" aria-hidden />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-gray-600 text-center mt-6 max-w-2xl mx-auto">
            {SITE.name} is a free introduction service. We are not an insurer or a broker, and we don't give advice. Any
            quote and recommendation comes from the FCA-regulated broker.
          </p>
        </div>
      </section>

    </div>
  );
}

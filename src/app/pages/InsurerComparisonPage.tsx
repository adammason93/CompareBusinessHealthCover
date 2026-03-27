import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import type { InsurerComparisonContent } from "@/app/config/insurerComparisons";
import { getComparisonBySlug } from "@/app/config/insurerComparisons";

interface InsurerComparisonPageProps {
  comparison: InsurerComparisonContent;
  onGetStarted: () => void;
  onNavigate: (page: string) => void;
}

function PartyLogoBlock({
  name,
  logo,
  tagline,
  guideSlug,
  onNavigate,
}: {
  name: string;
  logo: string | null;
  tagline: string;
  guideSlug?: string;
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center min-h-[120px] w-full max-w-[280px]">
        {logo ? (
          <img src={logo} alt={`${name} logo`} className="max-h-[72px] w-auto object-contain" loading="eager" decoding="async" />
        ) : (
          <span className="text-2xl sm:text-3xl font-bold text-[#2d2f5e] tracking-tight">{name}</span>
        )}
      </div>
      <p className="text-white/90 text-sm max-w-xs">{tagline}</p>
      {guideSlug ? (
        <a
          href={`/${guideSlug}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
              e.preventDefault();
              onNavigate(guideSlug);
            }
          }}
          className="text-teal-300 hover:text-teal-200 text-sm font-medium underline-offset-2 hover:underline"
        >
          {name} guide
        </a>
      ) : null}
    </div>
  );
}

export function InsurerComparisonPage({ comparison, onGetStarted, onNavigate }: InsurerComparisonPageProps) {
  const title = `${comparison.left.name} vs ${comparison.right.name}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white py-14 sm:py-20 overflow-hidden" style={{ backgroundColor: "#2d2f5e" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            type="button"
            onClick={() => onNavigate("insurers")}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Back to insurer guides
          </button>

          <p className="text-teal-300 text-sm font-medium uppercase tracking-wide text-center mb-3">Comparison</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10">{title}</h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            <PartyLogoBlock
              name={comparison.left.name}
              logo={comparison.left.logo}
              tagline={comparison.left.shortTagline}
              guideSlug={comparison.left.guideSlug}
              onNavigate={onNavigate}
            />
            <div className="text-2xl font-bold text-white/60 shrink-0" aria-hidden>
              vs
            </div>
            <PartyLogoBlock
              name={comparison.right.name}
              logo={comparison.right.logo}
              tagline={comparison.right.shortTagline}
              guideSlug={comparison.right.guideSlug}
              onNavigate={onNavigate}
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg"
            >
              Compare quotes <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">At a glance</h2>
          {comparison.intro.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {p}
            </p>
          ))}

          <div className="mt-8 p-5 rounded-xl bg-gray-50 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Where this information comes from</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              The summary on this page is written by HealthCoverCompare as a general, editorial overview. It is{' '}
              <strong>not</strong> copied from insurers’ policy booklets or websites, and it is <strong>not</strong> a
              complete or up-to-date list of product features. Insurers change plans, networks, and terms. Anything
              binding is only in the insurer’s own documents and in the terms of any quote or policy you take out—usually
              explained by an FCA-regulated broker or adviser.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              To check facts in the brands’ own words, use their official UK health insurance pages:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {comparison.left.officialProductUrl ? (
                <li>
                  <a
                    href={comparison.left.officialProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-medium underline-offset-2 hover:underline"
                  >
                    {comparison.left.name} — official site (opens in a new tab)
                  </a>
                </li>
              ) : null}
              {comparison.right.officialProductUrl ? (
                <li>
                  <a
                    href={comparison.right.officialProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-medium underline-offset-2 hover:underline"
                  >
                    {comparison.right.name} — official site (opens in a new tab)
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Side-by-side themes</h2>
          <p className="text-gray-600 text-sm mb-8">
            Illustrative themes only—your broker should confirm details against current policy documents and quotes.
          </p>
          <div className="space-y-6">
            {comparison.dimensions.map((row) => (
              <div
                key={row.label}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <div className="bg-[#2d2f5e]/5 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">{row.label}</h3>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  <div className="p-4 sm:p-5">
                    <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">{comparison.left.name}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{row.left}</p>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">{comparison.right.name}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{row.right}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Before you decide</h2>
          <ul className="space-y-3">
            {comparison.takeaway.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {comparison.relatedSlugs.length > 0 ? (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related comparisons</h3>
              <ul className="flex flex-col sm:flex-row flex-wrap gap-3">
                {comparison.relatedSlugs.map((slug) => {
                  const other = getComparisonBySlug(slug);
                  if (!other) return null;
                  const label = `${other.left.name} vs ${other.right.name}`;
                  return (
                    <li key={slug}>
                      <a
                        href={`/${slug}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            onNavigate(slug);
                          }
                        }}
                        className="inline-flex items-center text-teal-700 font-medium hover:text-teal-900 underline-offset-2 hover:underline"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 p-6 rounded-xl bg-[#2d2f5e]/5 border border-[#2d2f5e]/10">
            <p className="text-gray-700 text-sm leading-relaxed">
              This comparison is general information only and does not constitute insurance advice or an invitation to buy.
              Products, exclusions, and prices change. FCA-regulated brokers can explain suitability and arrange quotes.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-10 py-6 text-lg"
            >
              Get your free comparison <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

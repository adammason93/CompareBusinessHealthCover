import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { getGeoGuide } from "@/app/content/geo-guides.mjs";

interface GeoGuidePageProps {
  slug: string;
  onGetStarted: () => void;
  onNavigate?: (page: string) => void;
}

export function GeoGuideBody({
  slug,
  onNavigate,
  hideFaqs = false,
}: {
  slug: string;
  onNavigate?: (page: string) => void;
  hideFaqs?: boolean;
}) {
  const guide = getGeoGuide(slug);
  if (!guide) return null;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800">
      {guide.sections.map((section) => (
        <section key={section.h2} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.h2}</h2>
          {(section.paragraphs || []).map((p) => (
            <p key={p.slice(0, 48)} className="text-gray-700 leading-relaxed mb-4">
              {p}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {section.table ? (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-sm border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {section.table.headers.map((h) => (
                      <th key={h} className="text-left px-3 py-2 font-medium text-gray-900 border-b">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row.join("|")} className="border-b border-gray-100">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-2 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}
      {!hideFaqs && guide.faqs?.length ? (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently asked questions</h2>
          {guide.faqs.map((item) => (
            <div key={item.q} className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-700 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </section>
      ) : null}
      {guide.related?.length && onNavigate ? (
        <nav className="flex flex-wrap gap-3 text-sm">
          {guide.related.map((r) => (
            <button
              key={r.slug}
              type="button"
              className="text-brand-teal hover:underline"
              onClick={() => onNavigate(r.slug === "home" ? "home" : r.slug)}
            >
              {r.label}
            </button>
          ))}
        </nav>
      ) : null}
    </article>
  );
}

export function GeoGuidePage({ slug, onGetStarted, onNavigate }: GeoGuidePageProps) {
  const guide = getGeoGuide(slug);
  if (!guide) return null;

  return (
    <div className="min-h-screen bg-background">
      <section className="section-hero relative py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl mb-6 text-white">{guide.h1}</h1>
          <p className="text-xl text-white/90 mb-8">{guide.intro}</p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full px-8 py-6 text-lg"
          >
            Get an SME quote <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
      <div className="bg-white">
        <GeoGuideBody slug={slug} onNavigate={onNavigate} />
      </div>
      <section className="section-cta py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl text-white mb-6">Compare group cover for your business</h2>
          <Button
            onClick={onGetStarted}
            className="bg-brand-navy hover:bg-brand-navy-dark text-white rounded-full px-12 py-6 text-lg"
          >
            Start a free enquiry
          </Button>
        </div>
      </section>
    </div>
  );
}

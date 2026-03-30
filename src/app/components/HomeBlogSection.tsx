import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { supabaseEdgeUrl } from "/utils/supabase/edge";
import { publicAnonKey } from "/utils/supabase/info";

type TeaserPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url?: string | null;
};

interface HomeBlogSectionProps {
  onNavigate: (page: string) => void;
}

export function HomeBlogSection({ onNavigate }: HomeBlogSectionProps) {
  const [posts, setPosts] = useState<TeaserPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(supabaseEdgeUrl("/blog/posts"), {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || cancelled) return;
        const list = (json.posts ?? []) as TeaserPost[];
        if (!cancelled) {
          setPosts(list.slice(0, 4));
        }
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white border-y border-gray-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">From our blog</h2>
            <p className="mt-1 text-gray-600 text-sm sm:text-base">
              Tips and guides on private health insurance in the UK.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("blog")}
            className="inline-flex items-center gap-2 text-teal-700 font-medium text-sm hover:text-teal-900 self-start sm:self-auto"
          >
            View all posts
            <ArrowRight className="w-4 h-4" aria-hidden />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin" aria-hidden />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((p) => (
              <article
                key={p.id}
                className="flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:border-teal-200 hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => onNavigate(`blog/${p.slug}`)}
                  className="text-left flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl"
                >
                  <div className="aspect-[16/10] bg-gray-200 relative overflow-hidden">
                    {p.cover_image_url ? (
                      <ImageWithFallback
                        src={p.cover_image_url}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2d2f5e] to-teal-800 opacity-90" />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug">{p.title}</h3>
                    {p.excerpt ? (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-1">{p.excerpt}</p>
                    ) : null}
                    <span className="mt-3 text-sm text-teal-700 font-medium">Read more</span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

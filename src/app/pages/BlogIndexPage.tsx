import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2, BookOpen } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { supabaseEdgeUrl } from "/utils/supabase/edge";
import { publicAnonKey } from "/utils/supabase/info";

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url?: string | null;
  published_at: string | null;
  updated_at: string;
}

interface BlogIndexPageProps {
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
}

export function BlogIndexPage({ onNavigate, onGetStarted }: BlogIndexPageProps) {
  const [posts, setPosts] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(supabaseEdgeUrl("/blog/posts"), {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg =
            (typeof json.error === "string" && json.error) ||
            (typeof json.message === "string" && json.message) ||
            "Could not load posts";
          throw new Error(msg);
        }
        if (!cancelled) {
          setPosts(json.posts ?? []);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not load posts");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#2d2f5e] text-white py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
            <BookOpen className="w-7 h-7 text-teal-300" aria-hidden />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-3 text-lg text-gray-200">
            Guides and updates on private health insurance in the UK.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex justify-center py-16 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin" aria-hidden />
            <span className="sr-only">Loading posts</span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-gray-600 text-center py-8">No posts yet. Check back soon.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <ul className="space-y-6">
            {posts.map((p) => {
              const dateStr = p.published_at || p.updated_at;
              const dateLabel = dateStr
                ? format(new Date(dateStr), "d MMMM yyyy")
                : "";
              return (
                <li key={p.id}>
                  <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:border-teal-200 transition-colors">
                    {p.cover_image_url ? (
                      <button
                        type="button"
                        onClick={() => onNavigate(`blog/${p.slug}`)}
                        className="block w-full aspect-[16/9] bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      >
                        <ImageWithFallback
                          src={p.cover_image_url}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ) : null}
                    <div className="p-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{dateLabel}</p>
                    <h2 className="text-xl font-semibold text-gray-900">
                      <button
                        type="button"
                        onClick={() => onNavigate(`blog/${p.slug}`)}
                        className="text-left hover:text-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                      >
                        {p.title}
                      </button>
                    </h2>
                    {p.excerpt ? (
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">{p.excerpt}</p>
                    ) : null}
                    <div className="mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-teal-700 border-teal-200 hover:bg-teal-50"
                        onClick={() => onNavigate(`blog/${p.slug}`)}
                      >
                        Read more
                      </Button>
                    </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-12 text-center">
          <Button
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8"
            onClick={onGetStarted}
          >
            Get a quote
          </Button>
        </div>
      </div>
    </div>
  );
}

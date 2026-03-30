import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { BlogMarkdown, plainTextFromMarkdown } from "@/app/components/BlogMarkdown";
import { supabaseEdgeUrl } from "/utils/supabase/edge";
import { publicAnonKey } from "/utils/supabase/info";

export interface BlogPostPublic {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  published_at: string | null;
  updated_at: string;
}

interface BlogPostPageProps {
  slug: string;
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
  onMetaLoaded: (meta: { title: string; description: string } | null) => void;
}

export function BlogPostPage({ slug, onNavigate, onGetStarted, onMetaLoaded }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPostPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    onMetaLoaded(null);
    (async () => {
      setLoading(true);
      setError(null);
      setPost(null);
      try {
        const res = await fetch(supabaseEdgeUrl(`/blog/posts/${encodeURIComponent(slug)}`), {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg =
            (typeof json.error === "string" && json.error) ||
            (typeof json.message === "string" && json.message) ||
            "Could not load this post";
          throw new Error(msg);
        }
        const p = json.post as BlogPostPublic;
        if (!cancelled) {
          setPost(p);
          const description = (p.excerpt || plainTextFromMarkdown(p.body, 200)).replace(/\s+/g, " ").trim();
          onMetaLoaded({
            title: `${p.title} | HealthCoverCompare Blog`,
            description: description.length > 160 ? `${description.slice(0, 157)}…` : description,
          });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          onMetaLoaded(null);
          setError(e instanceof Error ? e.message : "Could not load this post");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, onMetaLoaded]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          type="button"
          onClick={() => onNavigate("blog")}
          className="inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900 mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Back to blog
        </button>

        {loading && (
          <div className="flex justify-center py-20 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin" aria-hidden />
            <span className="sr-only">Loading post</span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 px-4 py-3 text-sm space-y-3">
            <p>{error}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => onNavigate("blog")}>
              Back to blog
            </Button>
          </div>
        )}

        {!loading && post && (
          <article>
            <header className="mb-8">
              <p className="text-sm text-gray-500 mb-2">
                {post.published_at
                  ? format(new Date(post.published_at), "d MMMM yyyy")
                  : format(new Date(post.updated_at), "d MMMM yyyy")}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{post.title}</h1>
              {post.excerpt ? <p className="mt-4 text-lg text-gray-600 leading-relaxed">{post.excerpt}</p> : null}
            </header>
            {post.cover_image_url ? (
              <div className="mb-10 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <ImageWithFallback
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full max-h-[22rem] object-cover"
                  loading="eager"
                />
              </div>
            ) : null}
            <BlogMarkdown content={post.body} />
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Button
                type="button"
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full"
                onClick={onGetStarted}
              >
                Get a quote
              </Button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

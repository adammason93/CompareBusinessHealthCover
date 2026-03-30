import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, LogOut, Eye, EyeOff } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { supabaseEdgeUrl } from "/utils/supabase/edge";

const STORAGE_KEY = "hcc_blog_admin_secret";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  published: false,
};

export function BlogAdminPage() {
  const [secretInput, setSecretInput] = useState("");
  const [secret, setSecret] = useState(() => sessionStorage.getItem(STORAGE_KEY) ?? "");
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const authHeaders = useCallback(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    };
  }, [secret]);

  const loadPosts = useCallback(async () => {
    if (!secret) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(supabaseEdgeUrl("/admin/blog/posts"), { headers: authHeaders() });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to load posts");
      }
      setPosts(json.posts ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [secret, authHeaders]);

  useEffect(() => {
    if (secret) {
      loadPosts();
    }
  }, [secret, loadPosts]);

  const handleSaveSecret = (e: React.FormEvent) => {
    e.preventDefault();
    const s = secretInput.trim();
    if (!s) return;
    sessionStorage.setItem(STORAGE_KEY, s);
    setSecret(s);
    setSecretInput("");
    setMessage(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSecret("");
    setPosts([]);
    setEditingId(null);
    setForm(emptyForm);
  };

  const startNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage(null);
    setError(null);
  };

  const startEdit = (p: BlogRow) => {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      published: p.published,
    });
    setMessage(null);
    setError(null);
  };

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      if (editingId) {
        const res = await fetch(supabaseEdgeUrl(`/admin/blog/posts/${editingId}`), {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({
            slug: form.slug.trim().toLowerCase() || undefined,
            title: form.title.trim(),
            excerpt: form.excerpt,
            body: form.body,
            published: form.published,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Save failed");
        }
        setMessage("Post updated.");
        await loadPosts();
      } else {
        const res = await fetch(supabaseEdgeUrl("/admin/blog/posts"), {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({
            slug: form.slug.trim().toLowerCase() || undefined,
            title: form.title.trim(),
            excerpt: form.excerpt,
            body: form.body,
            published: form.published,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Create failed");
        }
        setMessage("Post created. Public URL: /blog/" + (json.post?.slug || ""));
        if (json.post?.id) {
          setEditingId(json.post.id);
          setForm((f) => ({
            ...f,
            slug: json.post.slug,
          }));
        }
        await loadPosts();
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!secret || !confirm("Delete this post permanently?")) return;
    setError(null);
    try {
      const res = await fetch(supabaseEdgeUrl(`/admin/blog/posts/${id}`), {
        method: "DELETE",
        headers: authHeaders(),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Delete failed");
      }
      if (editingId === id) {
        startNew();
      }
      setMessage("Post deleted.");
      await loadPosts();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  if (!secret) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-semibold">Blog admin</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Enter the same secret you configured as <code className="text-teal-300">BLOG_ADMIN_SECRET</code> in Supabase
            Edge Function secrets. It is stored only in this browser tab (session).
          </p>
          <form onSubmit={handleSaveSecret} className="space-y-4">
            <Input
              type="password"
              autoComplete="off"
              placeholder="Admin secret"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white"
            />
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Continue
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">Blog admin</h1>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={startNew}>
            <Plus className="w-4 h-4 mr-1" aria-hidden />
            New post
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" aria-hidden />
            Clear secret
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">All posts</h2>
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500 py-8">
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
              Loading…
            </div>
          ) : (
            <ul className="space-y-2">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className={`rounded-lg border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
                    editingId === p.id ? "border-teal-500 bg-teal-50/50" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {p.published ? (
                        <Eye className="w-4 h-4 text-green-600 shrink-0" aria-hidden />
                      ) : (
                        <EyeOff className="w-4 h-4 text-amber-600 shrink-0" aria-hidden />
                      )}
                      <span className="font-medium truncate">{p.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 truncate">/blog/{p.slug}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button type="button" size="sm" variant="outline" onClick={() => startEdit(p)}>
                      <Pencil className="w-4 h-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => deletePost(p.id)}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">
            {editingId ? "Edit post" : "New post"}
          </h2>
          <form onSubmit={submitPost} className="space-y-4 bg-white border border-slate-200 rounded-xl p-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Title</label>
              <Input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">
                Slug (optional — auto from title if empty)
              </label>
              <Input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="e.g. how-to-compare-pmi"
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Excerpt</label>
              <Textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="Short summary for listings and SEO"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Body</label>
              <Textarea
                rows={12}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                placeholder="Main content (blank lines become paragraphs)"
                className="font-mono text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published (visible on /blog)
            </label>
            {message ? <p className="text-sm text-green-700">{message}</p> : null}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" aria-hidden />
                  Saving…
                </>
              ) : editingId ? (
                "Save changes"
              ) : (
                "Create post"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

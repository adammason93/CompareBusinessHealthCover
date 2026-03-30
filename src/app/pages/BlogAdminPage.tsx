import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Code,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  LogOut,
  Minus,
  Pencil,
  Plus,
  Quote,
  SquareCode,
  Strikethrough,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { BlogMarkdown } from "@/app/components/BlogMarkdown";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/app/components/ui/utils";
import { clipHtmlToMarkdown, normalizePlainPasteBullets } from "@/utils/htmlToMarkdown";
import { supabaseEdgeUrl } from "/utils/supabase/edge";
import { publicAnonKey } from "/utils/supabase/info";

/** sessionStorage key for the bearer token typed on /blog-admin (must match Edge secret BLOG_ADMIN_SECRET). */
const STORAGE_KEY = "hcc_blog_admin_secret";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image_url?: string;
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
  cover_image_url: "",
  published: false,
};

/** Max size for drag-and-drop / paste images embedded as data URLs in the body (Markdown). */
const MAX_EMBED_IMAGE_BYTES = 1.5 * 1024 * 1024;

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
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [bodyDragOver, setBodyDragOver] = useState(false);
  const [embedImageHint, setEmbedImageHint] = useState<string | null>(null);

  /** Run after React commits the controlled textarea value so selection indices match `form.body`. */
  const focusBodyAndSelect = useCallback((start: number, end: number) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = bodyRef.current;
        if (!el) return;
        el.focus();
        el.setSelectionRange(start, end);
      });
    });
  }, []);

  /** Insert or wrap selection with Markdown; if nothing selected, places the cursor inside empty delimiters when sensible. */
  const applyBodyMarkdown = useCallback(
    (
      before: string,
      after: string,
      opts?: { emptySelect?: [number, number] } // offsets from insertion start for selection after insert
    ) => {
      const el = bodyRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const body = form.body;
      const selected = body.slice(start, end);
      let inserted: string;
      let caretStart: number;
      let caretEnd: number;
      if (selected) {
        inserted = before + selected + after;
        caretStart = start + inserted.length;
        caretEnd = caretStart;
      } else {
        inserted = before + after;
        const inner = opts?.emptySelect;
        if (inner) {
          caretStart = start + inner[0];
          caretEnd = start + inner[1];
        } else {
          caretStart = caretEnd = start + before.length;
        }
      }
      const next = body.slice(0, start) + inserted + body.slice(end);
      setForm((f) => ({ ...f, body: next }));
      focusBodyAndSelect(caretStart, caretEnd);
    },
    [form.body, focusBodyAndSelect],
  );

  const insertBodyAtCursor = useCallback(
    (snippet: string, selectOffset?: [number, number]) => {
      const el = bodyRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const body = form.body;
      const next = body.slice(0, start) + snippet + body.slice(end);
      setForm((f) => ({ ...f, body: next }));
      if (selectOffset) {
        focusBodyAndSelect(start + selectOffset[0], start + selectOffset[1]);
      } else {
        focusBodyAndSelect(start + snippet.length, start + snippet.length);
      }
    },
    [form.body, focusBodyAndSelect],
  );

  const applyBodyLink = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const body = form.body;
    const selected = body.slice(start, end);
    if (selected) {
      const inserted = `[${selected}](https://)`;
      const next = body.slice(0, start) + inserted + body.slice(end);
      setForm((f) => ({ ...f, body: next }));
      focusBodyAndSelect(start + inserted.length, start + inserted.length);
    } else {
      const inserted = "[link text](https://)";
      const next = body.slice(0, start) + inserted + body.slice(end);
      setForm((f) => ({ ...f, body: next }));
      focusBodyAndSelect(start + 1, start + 10);
    }
  }, [form.body, focusBodyAndSelect]);

  const handleBodyDrop = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      setBodyDragOver(false);
      const el = bodyRef.current;
      const start = el?.selectionStart ?? form.body.length;
      const end = el?.selectionEnd ?? form.body.length;
      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      if (file.size > MAX_EMBED_IMAGE_BYTES) {
        setEmbedImageHint(
          `Image is larger than ${Math.round(MAX_EMBED_IMAGE_BYTES / (1024 * 1024))}MB. Host it elsewhere and use the image button or paste a URL.`,
        );
        return;
      }
      setEmbedImageHint(null);
      const alt = file.name.replace(/\.[^.]+$/, "") || "image";
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === "string" ? reader.result : "";
        if (!dataUrl) return;
        const md = `![${alt}](${dataUrl})`;
        let caretPos = start;
        setForm((f) => {
          const base = f.body;
          const needsBreak = start > 0 && /[^\s\n]/.test(base[start - 1] ?? "");
          const prefix = needsBreak ? "\n\n" : "";
          const suffix = "\n\n";
          const next = base.slice(0, start) + prefix + md + suffix + base.slice(end);
          caretPos = start + prefix.length + md.length + suffix.length;
          return { ...f, body: next };
        });
        focusBodyAndSelect(caretPos, caretPos);
      };
      reader.readAsDataURL(file);
    },
    [form.body, focusBodyAndSelect],
  );

  const handleBodyPaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const cd = e.clipboardData;
      if (!cd) return;
      const el = bodyRef.current;
      const start = el?.selectionStart ?? form.body.length;
      const end = el?.selectionEnd ?? form.body.length;

      const insertMarkdownBlock = (md: string) => {
        setEmbedImageHint(null);
        let caretPos = start;
        setForm((f) => {
          const b = f.body;
          const needsBreak = start > 0 && /[^\s\n]/.test(b[start - 1] ?? "");
          const prefix = needsBreak && md.length ? "\n\n" : "";
          const next = b.slice(0, start) + prefix + md + b.slice(end);
          caretPos = start + prefix.length + md.length;
          return { ...f, body: next };
        });
        focusBodyAndSelect(caretPos, caretPos);
      };

      const items = cd.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind !== "file" || !item.type.startsWith("image/")) continue;
        const file = item.getAsFile();
        if (!file) continue;
        e.preventDefault();
        if (file.size > MAX_EMBED_IMAGE_BYTES) {
          setEmbedImageHint(
            `Pasted image is larger than ${Math.round(MAX_EMBED_IMAGE_BYTES / (1024 * 1024))}MB. Host it elsewhere and paste a URL instead.`,
          );
          return;
        }
        setEmbedImageHint(null);
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = typeof reader.result === "string" ? reader.result : "";
          if (!dataUrl) return;
          const md = `![image](${dataUrl})`;
          setForm((f) => {
            const base = f.body;
            const next = base.slice(0, start) + md + base.slice(end);
            return { ...f, body: next };
          });
          focusBodyAndSelect(start + md.length, start + md.length);
        };
        reader.readAsDataURL(file);
        return;
      }

      const html = cd.getData("text/html");
      if (html?.trim()) {
        const md = clipHtmlToMarkdown(html);
        if (md) {
          e.preventDefault();
          insertMarkdownBlock(md);
          return;
        }
      }

      const plain = cd.getData("text/plain");
      if (plain) {
        const normalized = normalizePlainPasteBullets(plain);
        if (normalized !== plain) {
          e.preventDefault();
          insertMarkdownBlock(normalized);
        }
      }
    },
    [form.body, focusBodyAndSelect],
  );

  const authHeaders = useCallback(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${publicAnonKey}`,
      "X-Blog-Admin-Secret": secret,
    };
  }, [secret]);

  const loadPosts = useCallback(async () => {
    if (!secret) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(supabaseEdgeUrl("/admin/blog/posts"), { headers: authHeaders() });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          (typeof json.error === "string" && json.error) ||
          (typeof json.message === "string" && json.message) ||
          `Request failed (${res.status})`;
        throw new Error(msg);
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
      cover_image_url: p.cover_image_url ?? "",
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
            cover_image_url: form.cover_image_url.trim(),
            published: form.published,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            (typeof json.error === "string" && json.error) ||
              (typeof json.message === "string" && json.message) ||
              "Save failed",
          );
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
            cover_image_url: form.cover_image_url.trim(),
            published: form.published,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            (typeof json.error === "string" && json.error) ||
              (typeof json.message === "string" && json.message) ||
              "Create failed",
          );
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
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (typeof json.error === "string" && json.error) ||
            (typeof json.message === "string" && json.message) ||
            "Delete failed",
        );
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
              <label className="text-xs font-medium text-slate-600 block mb-1">
                Cover image URL (optional)
              </label>
              <Input
                type="url"
                inputMode="url"
                value={form.cover_image_url}
                onChange={(e) => setForm((f) => ({ ...f, cover_image_url: e.target.value }))}
                placeholder="https://… (HTTPS link to .jpg / .png / .webp)"
                className="font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                Used on the home page, blog list, and top of the post. Host images anywhere (e.g. your CDN) and paste the URL.
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Body</label>
              <p className="text-xs text-slate-500 mb-2">
                Markdown. Pasting from Word, Google Docs, or web pages converts to headings, bold, lists, and links. Use
                the toolbar for shortcuts. The preview updates as you type.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <div className="space-y-2 min-w-0">
                  <div
                    className="flex flex-wrap gap-1 p-1.5 border border-slate-200 rounded-lg bg-slate-50/90"
                    role="toolbar"
                    aria-label="Markdown formatting"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Bold (**)"
                      onClick={() => applyBodyMarkdown("**", "**")}
                    >
                      <Bold className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Italic (_)"
                      onClick={() => applyBodyMarkdown("_", "_")}
                    >
                      <Italic className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Strikethrough (~~)"
                      onClick={() => applyBodyMarkdown("~~", "~~")}
                    >
                      <Strikethrough className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Link"
                      onClick={applyBodyLink}
                    >
                      <Link2 className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Inline code (`)"
                      onClick={() => applyBodyMarkdown("`", "`")}
                    >
                      <Code className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Heading (##)"
                      onClick={() => insertBodyAtCursor("\n## Heading\n", [4, 11])}
                    >
                      <Heading2 className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Bullet list"
                      onClick={() => insertBodyAtCursor("\n- ")}
                    >
                      <List className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Numbered list"
                      onClick={() => insertBodyAtCursor("\n1. ")}
                    >
                      <ListOrdered className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Block quote"
                      onClick={() => insertBodyAtCursor("\n> ")}
                    >
                      <Quote className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Code block"
                      onClick={() => insertBodyAtCursor("\n```\n\n```\n", [5, 5])}
                    >
                      <SquareCode className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Image ![alt](url)"
                      onClick={() => insertBodyAtCursor("![alt](https://)", [2, 5])}
                    >
                      <ImageIcon className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      title="Horizontal rule"
                      onClick={() => insertBodyAtCursor("\n\n---\n\n")}
                    >
                      <Minus className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Drag a small image onto the editor or paste from the clipboard to embed it (stored in the post as a
                    data URL — prefer hosted URLs for large files).
                  </p>
                  {embedImageHint ? (
                    <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5">
                      {embedImageHint}
                    </p>
                  ) : null}
                  <div
                    className={cn(
                      "rounded-lg transition-shadow",
                      bodyDragOver && "ring-2 ring-teal-500 ring-offset-2 ring-offset-white",
                    )}
                  >
                    <Textarea
                      ref={bodyRef}
                      rows={12}
                      value={form.body}
                      onChange={(e) => {
                        setEmbedImageHint(null);
                        setForm((f) => ({ ...f, body: e.target.value }));
                      }}
                      onDrop={handleBodyDrop}
                      onDragOver={(ev) => {
                        ev.preventDefault();
                        ev.dataTransfer.dropEffect = "copy";
                        setBodyDragOver(true);
                      }}
                      onDragLeave={() => setBodyDragOver(false)}
                      onPaste={handleBodyPaste}
                      placeholder={`Write in Markdown (saved as-is).

# Heading
## Subheading
- Bullet list
1. Numbered list
**bold** *italic* [link text](https://…)
![alt text](https://…image.jpg)

| Column A | Column B |
| -------- | -------- |
| cell     | cell     |

\`\`\`
code block
\`\`\``}
                      className="font-mono text-sm min-h-[280px] lg:min-h-[min(70vh,520px)]"
                    />
                  </div>
                </div>
                <div className="space-y-2 min-w-0">
                  <p className="text-xs font-medium text-slate-600">Preview</p>
                  <div className="border border-slate-200 rounded-xl bg-gray-50 p-4 sm:p-6 min-h-[280px] max-h-[min(70vh,560px)] overflow-y-auto">
                    <article className="max-w-none">
                      {form.title ? (
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
                          {form.title}
                        </h1>
                      ) : (
                        <p className="text-sm text-slate-400 italic mb-3">Title appears here when you add one.</p>
                      )}
                      {form.excerpt ? (
                        <p className="text-base text-gray-600 leading-relaxed mb-6">{form.excerpt}</p>
                      ) : null}
                      {form.cover_image_url ? (
                        <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                          <ImageWithFallback
                            src={form.cover_image_url}
                            alt=""
                            className="w-full max-h-[14rem] sm:max-h-[18rem] object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <BlogMarkdown
                        content={form.body.trim() ? form.body : "*Nothing written yet — add Markdown in the editor.*"}
                      />
                    </article>
                  </div>
                </div>
              </div>
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

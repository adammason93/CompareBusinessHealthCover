/** Shared Supabase `blog_posts.site_id` for this site (sister site uses `hcc`). */
export const BLOG_SITE_ID = "cbhc" as const;

/** sessionStorage key for /blog-admin (separate from HCC so admins don't clash). */
export const BLOG_ADMIN_STORAGE_KEY = "cbhc_blog_admin_secret" as const;

/** Query string for public + admin blog API calls. */
export function blogSiteQuery(extra?: Record<string, string>): string {
  const params = new URLSearchParams({ site: BLOG_SITE_ID, ...extra });
  return `?${params.toString()}`;
}

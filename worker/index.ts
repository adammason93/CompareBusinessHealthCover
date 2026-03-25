/// <reference types="@cloudflare/workers-types" />
/**
 * Serves the Vite build from Workers Assets. SPA fallback for non-file routes only.
 * Trailing slashes are normalized so /sitemap.xml/ resolves like /sitemap.xml (otherwise
 * the last path segment is "" and we could wrongly serve index.html instead of XML).
 */
export interface Env {
  STATIC: Fetcher
}

/** Strip trailing slash except for root `/` — fixes empty last segment on paths like `/sitemap.xml/` */
function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

function hasStaticAssetExtension(pathname: string): boolean {
  const normalized = normalizePathname(pathname)
  const last = normalized.split('/').pop() ?? ''
  return last.includes('.') && last.length > 0
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return env.STATIC.fetch(request)
    }

    const original = new URL(request.url)
    const normalizedPath = normalizePathname(original.pathname)
    const assetUrl = new URL(original.href)
    assetUrl.pathname = normalizedPath

    const assetRequest =
      assetUrl.pathname !== original.pathname
        ? new Request(assetUrl, request)
        : request

    let response = await env.STATIC.fetch(assetRequest)
    if (response.status !== 404) {
      return response
    }

    if (hasStaticAssetExtension(normalizedPath)) {
      return response
    }

    return env.STATIC.fetch(new Request(new URL('/index.html', original.origin), request))
  },
}

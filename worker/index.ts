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

/** Workers Assets often answers unknown paths with 307 → `/` instead of 404; that breaks SPA deep links. */
function redirectPointsToSiteRoot(locationHeader: string | null, baseUrl: URL): boolean {
  if (!locationHeader) return false
  const t = locationHeader.trim()
  if (t === '/' || t === '') return true
  try {
    const u = new URL(t, baseUrl)
    if (u.origin !== baseUrl.origin) return false
    const p = normalizePathname(u.pathname)
    return p === '' || p === '/'
  } catch {
    return false
  }
}

const HASHED_ASSET = /\.(js|mjs|css|woff2?|ttf|otf|svg|png|jpe?g|gif|webp|ico|json|map)$/i

function withAssetCache(request: Request, response: Response, pathname: string): Response {
  if (pathname.startsWith('/assets/') && HASHED_ASSET.test(pathname)) {
    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
  }
  if (pathname === '/index.html' || pathname === '/') {
    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
  }
  return response
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
      if (
        response.status >= 300 &&
        response.status < 400 &&
        !hasStaticAssetExtension(normalizedPath) &&
        redirectPointsToSiteRoot(response.headers.get('Location'), original)
      ) {
        const spa = await env.STATIC.fetch(new Request(new URL('/index.html', original.origin), request))
        if (spa.ok) {
          return withAssetCache(request, spa, '/index.html')
        }
      }
      return withAssetCache(request, response, normalizedPath)
    }

    if (hasStaticAssetExtension(normalizedPath)) {
      return response
    }

    const spa = await env.STATIC.fetch(new Request(new URL('/index.html', original.origin), request))
    return withAssetCache(request, spa, '/index.html')
  },
}

/// <reference types="@cloudflare/workers-types" />
import { projectId, publicAnonKey } from '../utils/supabase/info'
/**
 * Serves the Vite build from Workers Assets. SPA fallback for non-file routes only.
 */
export interface Env {
  STATIC: Fetcher
}

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
const CANONICAL_HOST = 'comparebusinesshealthcover.co.uk'

function canonicalHostRedirect(url: URL): string | null {
  const next = new URL(url.href)
  let changed = false
  if (next.hostname.toLowerCase() === `www.${CANONICAL_HOST}`) {
    next.hostname = CANONICAL_HOST
    changed = true
  }
  if (next.protocol === 'http:') {
    next.protocol = 'https:'
    changed = true
  }
  return changed ? next.toString() : null
}

const PATH_REDIRECTS: Record<string, string> = {
  "/terms-and-conditions": "/terms-conditions/",
  "/providers": "/small-business-health-insurance-providers/",
  "/privacy": "/privacy-policy/",
  "/contact": "/contact-us/",
}

function permanentRedirect(fromUrl: URL, toPath: string): Response {
  const target = new URL(fromUrl.href)
  target.pathname = toPath
  return Response.redirect(target.toString(), 301)
}

function htmlPathRedirect(pathname: string): string | null {
  const normalized = normalizePathname(pathname)
  if (PATH_REDIRECTS[normalized]) return PATH_REDIRECTS[normalized]
  if (pathname === "/" || pathname === "") return null
  if (hasStaticAssetExtension(normalized)) return null
  if (!pathname.endsWith("/")) return `${normalized}/`
  return null
}

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

function crawlerRouteKey(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'home'
  return pathname.replace(/^\//, '')
}

/** Serve build-time HTML (unique title + copy) when present; ignore SPA fallback copies. */
async function fetchPrerenderedHtml(
  request: Request,
  env: Env,
  origin: string,
  pathname: string,
): Promise<Response | null> {
  const assetPath = pathname === '/' ? '/index.html' : `${pathname}/index.html`
  const res = await env.STATIC.fetch(new Request(new URL(assetPath, origin), request))
  if (!res.ok) return null
  const html = await res.text()
  const expected = crawlerRouteKey(pathname)
  if (!html.includes(`data-cbhc-route="${expected}"`)) return null
  const headers = new Headers(res.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
  return new Response(html, { status: 200, statusText: 'OK', headers })
}

const OPTOUT_FUNCTION_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/not-interested`

/** Outreach "Not interested" link: proxy to the edge function so the link stays on the brand domain. */
async function proxyNotInterested(request: Request, url: URL): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD' && request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, POST' } })
  }
  const headers = new Headers({
    Authorization: `Bearer ${publicAnonKey}`,
    apikey: publicAnonKey,
    'User-Agent': request.headers.get('User-Agent') ?? '',
  })
  const contentType = request.headers.get('Content-Type')
  if (contentType) headers.set('Content-Type', contentType)
  const upstream = await fetch(`${OPTOUT_FUNCTION_URL}${url.search}`, {
    method: request.method === 'HEAD' ? 'GET' : request.method,
    headers,
    body: request.method === 'POST' ? await request.arrayBuffer() : undefined,
  })
  const out = new Headers()
  // Supabase's default domain forces text/plain on HTML; this route only ever returns our HTML pages.
  out.set('Content-Type', 'text/html; charset=utf-8')
  out.set('Cache-Control', 'no-store')
  out.set('X-Robots-Tag', 'noindex, nofollow')
  out.set('Referrer-Policy', 'no-referrer')
  return new Response(request.method === 'HEAD' ? null : upstream.body, { status: upstream.status, headers: out })
}

const VIEW_FUNCTION_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/outreach-page-view`
const OWNER_IGNORE_PATH = '/owner/ignore-alerts'
const OWNER_IGNORE_COOKIE = 'cbhc_owner_ignore=1; Max-Age=31536000; Path=/; Secure; SameSite=Lax; HttpOnly'
const OWNER_NETWORK_ORG = /morris and sons/i
// Keep in sync with supabase/functions/server/index.tsx.
const DATACENTRE_OR_SCANNER_ORG =
  /google llc|amazon(?:\s|$)|aws|microsoft(?:\s| corporation)|azure|digitalocean|hetzner|ovh|alibaba|tencent|linode|akamai|ovhcloud|huawei|oracle cloud|vultr|scaleway|contabo|m247|choopa|proofpoint|mimecast|barracuda|vipre|messagelabs|forcepoint|zscaler|sophos/i
const SCANNER_ASN = new Set([
  8075, // Microsoft
  15169, 396982, // Google
  16509, 14618, // Amazon
  26211, 22843, // Proofpoint
  46786, 14120, // Mimecast
  15347, // Barracuda
])
const LOW_TRUST_SCORE = 15

type WorkerCf = {
  asOrganization?: string
  asn?: number
  country?: string
  city?: string
  colo?: string
  clientTrustScore?: number
  botManagement?: { score?: number }
}

function workerCf(request: Request): WorkerCf | null {
  const cf = (request as Request & { cf?: WorkerCf }).cf
  return cf && typeof cf === 'object' ? cf : null
}

function hasOwnerIgnoreCookie(request: Request): boolean {
  return /(?:^|;\s*)cbhc_owner_ignore=1(?:;|$)/.test(request.headers.get('Cookie') ?? '')
}

function trustScoreOf(cf: WorkerCf | null): number | null {
  const n = cf?.clientTrustScore ?? cf?.botManagement?.score
  return typeof n === 'number' && Number.isFinite(n) ? n : null
}

/** Skip reasons the Worker can see (real Cloudflare signals + Adam's cookie). */
function outreachViewSkipReason(request: Request): string | null {
  if (hasOwnerIgnoreCookie(request)) return 'owner-browser'
  const cf = workerCf(request)
  const asOrg = typeof cf?.asOrganization === 'string' ? cf.asOrganization : ''
  if (asOrg && OWNER_NETWORK_ORG.test(asOrg)) return 'owner-network'
  if (asOrg && DATACENTRE_OR_SCANNER_ORG.test(asOrg)) return 'datacentre-network'
  const asn = typeof cf?.asn === 'number' ? cf.asn : null
  if (asn !== null && SCANNER_ASN.has(asn)) return 'scanner-asn'
  const trust = trustScoreOf(cf)
  if (trust !== null && trust <= LOW_TRUST_SCORE) return 'low-trust-client'
  return null
}

function ownerIgnoreResponse(request: Request): Response {
  const url = new URL(request.url)
  const off = url.searchParams.get('off') === '1'
  const cookie = off
    ? 'cbhc_owner_ignore=; Max-Age=0; Path=/; Secure; SameSite=Lax; HttpOnly'
    : OWNER_IGNORE_COOKIE
  const message = off
    ? 'This browser will get outreach page alerts again. You can close this page.'
    : 'This browser will no longer trigger outreach page alerts. You can close this page.'
  const clearOrSet = off
    ? 'try{localStorage.removeItem("cbhc_owner_ignore")}catch(e){}'
    : 'try{localStorage.setItem("cbhc_owner_ignore","1")}catch(e){}'
  const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Outreach alerts</title>
</head>
<body style="font-family:Georgia,serif;max-width:32rem;margin:3rem auto;padding:0 1.25rem;color:#1a1a1a;line-height:1.5">
<p>${message}</p>
<script>${clearOrSet}</script>
</body>
</html>`
  return new Response(request.method === 'HEAD' ? null : html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'Set-Cookie': cookie,
    },
  })
}

async function proxyOutreachPageView(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': request.headers.get('Origin') ?? '', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Credentials': 'true' },
    })
  }
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST, OPTIONS' } })
  }
  let body: Record<string, unknown> = {}
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }
  const cf = workerCf(request)
  const payload = {
    ...body,
    ip: request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Real-IP') ?? undefined,
    asOrg: cf?.asOrganization ?? undefined,
    asn: typeof cf?.asn === 'number' ? cf.asn : undefined,
    country: cf?.country ?? undefined,
    city: cf?.city ?? undefined,
    colo: cf?.colo ?? undefined,
    trustScore: trustScoreOf(cf),
    forceSkip: outreachViewSkipReason(request) ?? undefined,
  }
  const upstream = await fetch(VIEW_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
      apikey: publicAnonKey,
      'User-Agent': request.headers.get('User-Agent') ?? '',
    },
    body: JSON.stringify(payload),
  })
  const out = new Headers()
  out.set('Content-Type', upstream.headers.get('Content-Type') ?? 'application/json')
  out.set('Cache-Control', 'no-store')
  return new Response(upstream.body, { status: upstream.status, headers: out })
}

function withOwnerIgnoreCookie(request: Request, response: Response): Response {
  if (!OWNER_NETWORK_ORG.test(workerCf(request)?.asOrganization ?? '')) return response
  if (hasOwnerIgnoreCookie(request)) return response
  const headers = new Headers(response.headers)
  headers.append('Set-Cookie', OWNER_IGNORE_COOKIE)
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const requestUrl = new URL(request.url)
    if (normalizePathname(requestUrl.pathname) === '/not-interested') {
      return proxyNotInterested(request, requestUrl)
    }
    if (normalizePathname(requestUrl.pathname) === OWNER_IGNORE_PATH) {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
      }
      return ownerIgnoreResponse(request)
    }
    if (normalizePathname(requestUrl.pathname) === '/outreach-page-view') {
      return proxyOutreachPageView(request)
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return env.STATIC.fetch(request)
    }

    const original = new URL(request.url)
    const hostRedirect = canonicalHostRedirect(original)
    if (hostRedirect) {
      return Response.redirect(hostRedirect, 301)
    }
    const redirectTo = htmlPathRedirect(original.pathname)
    if (redirectTo) {
      return permanentRedirect(original, redirectTo)
    }

    const normalizedPath = normalizePathname(original.pathname)

    // Personalised outreach pages (/for/<slug>) are the SPA, but never indexed or followed.
    if (/^\/for\/[^/]+$/i.test(normalizedPath)) {
      // Workers Assets answers /index.html with a 307 to "/", so ask for "/" (the SPA shell) directly.
      const spa = await env.STATIC.fetch(new Request(new URL('/', original.origin), { method: 'GET', headers: request.headers }))
      const headers = new Headers(spa.headers)
      headers.delete('Location')
      headers.set('Content-Type', 'text/html; charset=utf-8')
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
      headers.set('X-Robots-Tag', 'noindex, nofollow')
      return withOwnerIgnoreCookie(
        request,
        new Response(request.method === 'HEAD' ? null : spa.body, { status: spa.ok ? 200 : spa.status, headers }),
      )
    }

    if (!hasStaticAssetExtension(normalizedPath)) {
      const prerendered = await fetchPrerenderedHtml(request, env, original.origin, normalizedPath)
      if (prerendered) return prerendered
    }

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

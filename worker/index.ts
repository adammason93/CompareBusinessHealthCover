/// <reference types="@cloudflare/workers-types" />
/**
 * Serves the Vite build from Workers Assets. SPA fallback is implemented here — do not use
 * public/_redirects with `/*` → `/index.html` on Workers; Cloudflare rejects it (infinite loop).
 */
export interface Env {
  STATIC: Fetcher
}

function hasStaticAssetExtension(pathname: string): boolean {
  const last = pathname.split('/').pop() ?? ''
  return last.includes('.') && !last.endsWith('/')
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return env.STATIC.fetch(request)
    }

    let response = await env.STATIC.fetch(request)
    if (response.status !== 404) {
      return response
    }

    const url = new URL(request.url)
    if (hasStaticAssetExtension(url.pathname)) {
      return response
    }

    return env.STATIC.fetch(new Request(new URL('/index.html', url.origin), request))
  },
}

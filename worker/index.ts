/// <reference types="@cloudflare/workers-types" />
/**
 * Minimal Cloudflare Worker: serves the Vite build in ./dist via Workers Assets.
 * Use with wrangler.toml — main must NOT point at dist/index.js (that file is HTML).
 */
export interface Env {
  STATIC: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.STATIC.fetch(request)
  },
}

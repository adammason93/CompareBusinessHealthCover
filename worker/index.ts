/// <reference types="@cloudflare/workers-types" />
/**
 * Minimal Cloudflare Worker: serves the Vite build in ./dist via Workers Assets.
 * Use only with wrangler.worker.toml — main must NOT point at dist/index.js (that file is HTML).
 */
export interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request)
  },
}

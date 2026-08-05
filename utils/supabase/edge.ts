import { projectId } from './info'

/** Must match the deployed Edge Function name (Dashboard → Edge Functions). */
export const SUPABASE_EDGE_FUNCTION_SLUG = 'make-server-2031af1c' as const

/** e.g. https://bjylempevckvbpzpiicx.supabase.co/functions/v1/make-server-2031af1c */
export const supabaseEdgeFunctionBase = `https://${projectId}.supabase.co/functions/v1/${SUPABASE_EDGE_FUNCTION_SLUG}`

/** Append a path like `/login`, `/contact`, or `/make-server-2031af1c/health` (Hono routes include the slug). */
export function supabaseEdgeUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${supabaseEdgeFunctionBase}${p}`
}

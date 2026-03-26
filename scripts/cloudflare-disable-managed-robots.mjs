#!/usr/bin/env node
/**
 * Turns off Cloudflare "managed robots.txt" so /robots.txt is only your origin file.
 * Fixes Google Search Console "Unknown directive" on Content-Signal (injected by Cloudflare).
 *
 * Requires: CLOUDFLARE_API_TOKEN with Zone → Bot Management → Edit (or broader zone write).
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=xxx node scripts/cloudflare-disable-managed-robots.mjs
 *
 * Optional env:
 *   CLOUDFLARE_ZONE_ID   — if set, skips zone lookup
 *   CLOUDFLARE_ZONE_NAME — domain name for lookup (default: healthcovercomparison.co.uk)
 */

const API = 'https://api.cloudflare.com/client/v4'

const token = process.env.CLOUDFLARE_API_TOKEN
const zoneId = process.env.CLOUDFLARE_ZONE_ID
const zoneName = process.env.CLOUDFLARE_ZONE_NAME || 'healthcovercomparison.co.uk'

if (!token) {
  console.error('Missing CLOUDFLARE_API_TOKEN.')
  console.error('Create a token: My Profile → API Tokens → Create with Zone.Bot Management.Edit for this zone.')
  process.exit(1)
}

async function cf(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    const msg = json.errors?.map((e) => e.message).join('; ') || res.statusText
    throw new Error(`${path} → ${msg}`)
  }
  return json
}

async function resolveZoneId() {
  if (zoneId) return zoneId
  const json = await cf(`/zones?name=${encodeURIComponent(zoneName)}`)
  const z = json.result?.[0]
  if (!z?.id) {
    throw new Error(`No zone found for name "${zoneName}"`)
  }
  console.log(`Zone: ${z.name} (${z.id})`)
  return z.id
}

/** Fields Cloudflare rejects or overwrites on PUT — omit from body */
function stripReadOnly(obj) {
  const out = { ...obj }
  delete out.stale_zone_configuration
  delete out.using_latest_model
  return out
}

async function main() {
  const zid = await resolveZoneId()
  const get = await cf(`/zones/${zid}/bot_management`)
  const current = get.result
  if (!current) {
    throw new Error('Empty bot_management result (wrong plan or permissions?)')
  }

  if (current.is_robots_txt_managed === false) {
    console.log('is_robots_txt_managed is already false. Nothing to do.')
    return
  }

  const body = stripReadOnly(current)
  body.is_robots_txt_managed = false

  try {
    await cf(`/zones/${zid}/bot_management`, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  } catch (e) {
    console.warn('Full-config PUT failed, retrying with minimal body:', e.message)
    await cf(`/zones/${zid}/bot_management`, {
      method: 'PUT',
      body: JSON.stringify({ is_robots_txt_managed: false }),
    })
  }

  console.log('OK: is_robots_txt_managed set to false.')
  console.log('Wait a few minutes, then curl your /robots.txt and re-validate in Search Console.')
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})

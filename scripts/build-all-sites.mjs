#!/usr/bin/env node
// Builds a standalone static bundle for every restaurant in sites/index.json,
// one Vite build per site, output to dist-sites/<slug>/.
//
// Usage: node scripts/build-all-sites.mjs [slug ...]
//   With no args, builds every site in sites/index.json.
//   With args, builds only the given slugs (handy for spot-checking one site).

import { readFileSync, existsSync, mkdirSync, rmSync, readdirSync, copyFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const VITE_BIN = path.join(ROOT, 'node_modules', '.bin', 'vite')
const PHOTO_SRC_DIR = path.join(ROOT, 'site-photos-src')
const PHOTO_PUBLIC_DIR = path.join(ROOT, 'public', 'site-photos')

// public/ is copied wholesale into every build's output, so bundling all
// restaurants' photos there would make every single site ship every other
// restaurant's images too. Instead, source photos live outside public/ and
// this copies in only the current site's own files before each build.
function stagePhotosForSite(slug) {
  rmSync(PHOTO_PUBLIC_DIR, { recursive: true, force: true })
  mkdirSync(PHOTO_PUBLIC_DIR, { recursive: true })
  const prefix = `${slug}-`
  for (const file of readdirSync(PHOTO_SRC_DIR)) {
    if (file.startsWith(prefix)) {
      copyFileSync(path.join(PHOTO_SRC_DIR, file), path.join(PHOTO_PUBLIC_DIR, file))
    }
  }
}

function hueFor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash) % 360
}

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

function shortName(name) {
  return name.length > 24 ? name.slice(0, 23) + '…' : name
}

const siteIdsPath = path.join(ROOT, 'sites', 'firebase-site-ids.json')
const siteIdBySlug = existsSync(siteIdsPath) ? JSON.parse(readFileSync(siteIdsPath, 'utf-8')) : {}

function buildSite(slug) {
  const configPath = path.join(ROOT, 'sites', `${slug}.json`)
  if (!existsSync(configPath)) {
    return { slug, ok: false, error: `no such site config: ${configPath}` }
  }
  const site = JSON.parse(readFileSync(configPath, 'utf-8'))

  const category = site.types?.[0] || 'restaurant'
  const ratingBit = site.rating ? `, rated ${site.rating}★ (${site.reviewCount} reviews) on Google` : ''
  const description = (
    site.editorialSummary ||
    `${site.name} — a ${category.toLowerCase()} in Hanumangarh, Rajasthan${ratingBit}. Address, phone and directions.`
  ).slice(0, 300)

  const firebaseSiteId = siteIdBySlug[slug] || slug
  const siteUrl = `https://${firebaseSiteId}.web.app/`
  const ogImage = site.photo?.path ? `${siteUrl.replace(/\/$/, '')}${site.photo.path}` : `${siteUrl}favicon.png`
  const themeColor = hslToHex(hueFor(site.name), 45, 24)
  const outDir = path.join(ROOT, 'dist-sites', slug)

  stagePhotosForSite(slug)

  const env = {
    ...process.env,
    VITE_SITE_SLUG: slug,
    VITE_SITE_TITLE: `${site.name} | Hanumangarh`,
    VITE_SITE_SHORT_NAME: shortName(site.name),
    VITE_SITE_DESCRIPTION: description,
    VITE_THEME_COLOR: themeColor,
    VITE_SITE_URL: siteUrl,
    VITE_OG_IMAGE: ogImage,
  }

  const result = spawnSync(VITE_BIN, ['build', '--outDir', outDir, '--emptyOutDir'], {
    cwd: ROOT,
    env,
    stdio: 'pipe',
    encoding: 'utf-8',
  })

  if (result.status !== 0) {
    return { slug, ok: false, error: result.stderr || result.stdout || `exit ${result.status}` }
  }
  return { slug, ok: true, outDir }
}

const requested = process.argv.slice(2)
const allSlugs = JSON.parse(readFileSync(path.join(ROOT, 'sites', 'index.json'), 'utf-8'))
const slugs = requested.length ? requested : allSlugs

console.log(`Building ${slugs.length} site(s)...\n`)

const results = []
for (const slug of slugs) {
  process.stdout.write(`  ${slug} ... `)
  const r = buildSite(slug)
  results.push(r)
  console.log(r.ok ? 'ok' : `FAILED (${r.error.slice(0, 200)})`)
}

rmSync(PHOTO_PUBLIC_DIR, { recursive: true, force: true })

const ok = results.filter((r) => r.ok)
const failed = results.filter((r) => !r.ok)

console.log(`\n${ok.length}/${results.length} built successfully.`)
if (failed.length) {
  console.log(`\nFailed:`)
  for (const f of failed) console.log(`  - ${f.slug}: ${f.error.slice(0, 300)}`)
  process.exitCode = 1
}

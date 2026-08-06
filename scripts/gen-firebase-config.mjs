#!/usr/bin/env node
// Regenerates firebase.json + .firebaserc as a multi-site hosting config:
// the original Food Junction entry, plus one entry per bulk-generated
// restaurant site, each pointing at its own dist-sites/<slug> build.
// Run this after sites/index.json changes.
//
// Uses Firebase "targets" (.firebaserc) rather than raw "site" keys in
// firebase.json, so `firebase deploy --only hosting:<target>` reliably
// selects a single site — the documented way to deploy one site at a time
// out of many in the same project.
//
// Site IDs use the plain restaurant slug, no prefix — Firebase Hosting
// site IDs are globally unique across every Firebase project, so a name
// can still fail to create if an unrelated project already claimed it;
// there's no local way to detect that in advance.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SITE_PREFIX = ''
const PROJECT_ID = 'food-junction-hgh'
const FOOD_JUNCTION_TARGET = 'food-junction'

const HEADERS = [
  { source: '/assets/**', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
  { source: '/index.html', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/favicon.png', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/apple-touch-icon.png', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/pwa-192x192.png', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/pwa-512x512.png', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/maskable-icon-512x512.png', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/manifest.webmanifest', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
  { source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] },
]

const foodJunctionEntry = {
  target: FOOD_JUNCTION_TARGET,
  public: 'dist',
  ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
  rewrites: [{ source: '**', destination: '/index.html' }],
  headers: [...HEADERS, { source: '/og-image.jpg', headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }] }],
}

const slugs = JSON.parse(readFileSync(path.join(ROOT, 'sites', 'index.json'), 'utf-8'))

// Firebase Hosting site IDs must be <= 30 chars. Our slugs (unbounded by
// that limit, used for readable local dist-sites/<slug> folders) can run
// longer, so derive a separate, truncated + de-duplicated ID just for the
// Firebase side.
const MAX_SITE_ID_LEN = 30
const usedIds = new Set()
function firebaseSiteId(slug) {
  let id = `${SITE_PREFIX}${slug}`
  if (id.length <= MAX_SITE_ID_LEN) {
    if (!usedIds.has(id)) {
      usedIds.add(id)
      return id
    }
  }
  // Truncate to fit, leaving room for a 5-char de-dupe suffix.
  const base = id.slice(0, MAX_SITE_ID_LEN - 6).replace(/-+$/, '')
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  const suffix = hash.toString(36).slice(0, 5)
  id = `${base}-${suffix}`
  usedIds.add(id)
  return id
}

const siteIdBySlug = Object.fromEntries(slugs.map((slug) => [slug, firebaseSiteId(slug)]))

const bulkEntries = slugs.map((slug) => ({
  target: slug,
  public: `dist-sites/${slug}`,
  ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
  rewrites: [{ source: '**', destination: '/index.html' }],
  headers: HEADERS,
}))

const firebaseJson = { hosting: [foodJunctionEntry, ...bulkEntries] }
writeFileSync(path.join(ROOT, 'firebase.json'), JSON.stringify(firebaseJson, null, 2) + '\n')

const firebaserc = {
  projects: { default: PROJECT_ID },
  targets: {
    [PROJECT_ID]: {
      hosting: {
        [FOOD_JUNCTION_TARGET]: ['food-junction'],
        ...Object.fromEntries(slugs.map((slug) => [slug, [siteIdBySlug[slug]]])),
      },
    },
  },
}
writeFileSync(path.join(ROOT, '.firebaserc'), JSON.stringify(firebaserc, null, 2) + '\n')

// slug -> Firebase Hosting site ID, which the deploy step needs to
// `hosting:sites:create` before the first deploy, and which the build
// script feeds back in as each site's public URL (VITE_SITE_URL).
writeFileSync(path.join(ROOT, 'sites', 'firebase-site-ids.json'), JSON.stringify(siteIdBySlug, null, 2) + '\n')

console.log(`Wrote firebase.json + .firebaserc with ${firebaseJson.hosting.length} hosting targets (1 existing + ${bulkEntries.length} new).`)
console.log(`Wrote sites/firebase-site-ids.json with ${Object.keys(siteIdBySlug).length} site IDs.`)

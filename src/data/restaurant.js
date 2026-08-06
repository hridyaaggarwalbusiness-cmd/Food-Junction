// Verified public details for "Food Junction" (Let's Chill With Pizza),
// Opposite Central Park, Hanumangarh Town Bazar — cross-checked against its
// official Google Business Profile (Places API) plus Zomato, Swiggy and
// Justdial listings.

const foodJunction = {
  name: 'Food Junction',
  tagline: "Let's Chill With Pizza",
  description:
    "Pizza, Indo-Chinese, loaded burgers and shakes — served fresh in our teal-booth dining room opposite Central Park.",
  story:
    "What began as a neighbourhood pizza counter opposite Central Park has grown into Town Bazar's favourite hangout. Inside, teal booths sit beneath a gallery wall of framed art, and the kitchen serves a 45-item menu spanning pizza, Indo-Chinese, burgers, wraps and milkshakes. Diners rate us 4.8★ on Google, with strong reviews on Zomato, Swiggy and Justdial too — and for celebrations, we also run a fully air-conditioned party hall.",
  address: {
    line1: 'Shanti Nursing Home, Opposite Central Park',
    line2: 'Hanumangarh Town Bazar',
    city: 'Hanumangarh',
    state: 'Rajasthan',
    pincode: '335513',
    country: 'India',
  },
  phone: '+91 78775 63174',
  hours: [{ day: 'Monday – Sunday', time: '10:00 AM – 9:00 PM' }],
  badge: 'Open Daily · Town Bazar, Hanumangarh',
  rating: 4.8,
  reviewCount: '91+',
  priceLabel: '₹149 for two (approx.)',
  cuisines: ['Italian', 'Indo-Chinese', 'American', 'Continental'],
  highlights: ['Simply Mania Pizza', 'Honey Chilli Potato', 'Loaded Burgers', 'Pizza + Garlic Bread Combo'],
  links: {
    zomato: 'https://www.zomato.com/hanumangarh/food-junction-town-hanumangarh-locality/order',
    swiggy: 'https://www.swiggy.com/restaurants/food-junction-town-central-park-hanumangarh-hanumangarh-766498',
    justdial:
      'https://www.justdial.com/Hanumangarh/Food-Junction-Town-Opposite-Central-Park-Hanumangarh-town-bazar/9999P1552-1552-240313182821-W2R1_BZDET',
  },
  mapsQuery: 'Food Junction Town, Shanti Nursing Home, Opposite Central Park, Hanumangarh Town Bazar, Hanumangarh, Rajasthan 335513',
  mapsLink: 'https://maps.google.com/?cid=9230653665325555614',
  photo: null,
  gallery: true,
  hasGallery: true,
  unofficial: false,
}

// Best-effort split of a Google "formatted_address" string into the
// {line1, line2, city, state, pincode, country} shape the template expects.
function parseAddress(full) {
  const parts = (full || '').split(',').map((p) => p.trim()).filter(Boolean)
  if (parts.length < 3) return { line1: full || '', line2: '', city: '', state: '', pincode: '', country: '', full }

  const country = parts[parts.length - 1]
  const stateZip = parts[parts.length - 2] || ''
  const city = parts[parts.length - 3] || ''
  const stateMatch = stateZip.match(/^(.*?)\s*(\d{4,6})?$/)
  const state = stateMatch ? stateMatch[1].trim() : stateZip
  const pincode = stateMatch && stateMatch[2] ? stateMatch[2] : ''
  const line1 = parts.slice(0, Math.max(parts.length - 3, 1)).join(', ')

  return { line1, line2: '', city, state, pincode, country, full }
}

// Parses Places "weekday_text" entries ("Monday: 12:00 PM – 12:00 AM")
// into the {day, time} shape the template expects.
function parseHours(weekdayText) {
  if (!weekdayText || !weekdayText.length) return null
  return weekdayText.map((line) => {
    const idx = line.indexOf(':')
    return { day: line.slice(0, idx), time: line.slice(idx + 1).trim() }
  })
}

function toRestaurantShape(site) {
  const address = parseAddress(site.address)
  const gallery = site.gallery && site.gallery.length > 1 ? site.gallery : []
  return {
    name: site.name,
    tagline: site.types?.[0] ? `${site.types[0]} in Hanumangarh` : 'Restaurant in Hanumangarh',
    description:
      site.editorialSummary ||
      `${site.name} is a ${(site.types?.[0] || 'restaurant').toLowerCase()} in Hanumangarh, Rajasthan.`,
    story:
      site.editorialSummary ||
      `${site.name} is listed on Google Maps${site.rating ? ` with a ${site.rating}★ rating from ${site.reviewCount} reviews` : ''}. This page collects its publicly available details in one place.`,
    address,
    phone: site.phone || null,
    hours: parseHours(site.hours),
    badge:
      site.businessStatus === 'CLOSED_TEMPORARILY'
        ? 'Temporarily closed · Hanumangarh'
        : `${site.types?.[0] || 'Restaurant'} · Hanumangarh`,
    rating: site.rating ?? null,
    reviewCount: site.reviewCount ?? null,
    priceLabel: site.priceLevel || null,
    cuisines: site.types || [],
    highlights: [],
    links: {},
    mapsQuery: `${site.name}, ${site.address || 'Hanumangarh, Rajasthan'}`,
    mapsLink: site.mapsUrl || `https://www.google.com/maps/place/?q=place_id:${site.placeId}`,
    photo: site.photo,
    gallery,
    hasGallery: gallery.length > 1,
    unofficial: true,
    businessStatus: site.businessStatus,
  }
}

const slug = import.meta.env.VITE_SITE_SLUG
const siteModules = import.meta.glob('../../sites/*.json', { eager: true, import: 'default' })
const siteConfig = slug ? siteModules[`../../sites/${slug}.json`] : null

export const restaurant = siteConfig ? toRestaurantShape(siteConfig) : foodJunction

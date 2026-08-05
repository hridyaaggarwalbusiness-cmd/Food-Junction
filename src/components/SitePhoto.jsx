// Deterministic hue from the restaurant name, so each placeholder looks
// distinct without claiming to be a real photo of the place.
function hueFor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash) % 360
}

// Used only for bulk-generated listing pages that have no real Google Maps
// photo. Never falls back to Food Junction's own photos — those are a
// specific, different business and would misrepresent this one.
export default function SitePhoto({ name, className }) {
  const hue = hueFor(name)
  return (
    <div
      className={`${className} site-photo-placeholder`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 24%), hsl(${(hue + 40) % 360} 45% 12%))`,
      }}
      role="img"
      aria-label={`${name} — no photo available`}
    >
      <span>{name}</span>
    </div>
  )
}

import { restaurant } from '../data/restaurant'

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

// Food Junction uses its real favicon. Bulk-generated listing pages get a
// neutral initials badge instead — reusing Food Junction's own brand mark on
// an unrelated restaurant's page would misleadingly imply affiliation.
export default function Logo({ size = 34 }) {
  if (!restaurant.unofficial) {
    return <img className="navbar__logo" src="/favicon.png" alt="" width={size} height={size} />
  }

  return (
    <span className="logo-badge" style={{ width: size, height: size, fontSize: size * 0.4 }} aria-hidden="true">
      {initials(restaurant.name)}
    </span>
  )
}

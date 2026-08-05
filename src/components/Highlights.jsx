import { restaurant } from '../data/restaurant'

function buildStats() {
  const stats = []

  if (restaurant.rating) {
    stats.push({ value: `${restaurant.rating}★`, label: `${restaurant.reviewCount} Reviews` })
  }

  if (restaurant.unofficial) {
    stats.push({
      value: restaurant.businessStatus === 'CLOSED_TEMPORARILY' ? 'Closed' : 'Open',
      label: restaurant.businessStatus === 'CLOSED_TEMPORARILY' ? 'Temporarily' : 'Now',
    })
  } else {
    stats.push({ value: '10AM–9PM', label: 'Open Daily' })
  }

  if (restaurant.cuisines.length > 0) {
    stats.push({ value: restaurant.cuisines.length, label: restaurant.unofficial ? 'Categories' : 'Cuisines' })
  }

  if (restaurant.unofficial) {
    if (restaurant.priceLabel) stats.push({ value: restaurant.priceLabel, label: 'Price Range' })
  } else {
    stats.push({ value: '45+', label: 'Menu Items' })
  }

  return stats
}

export default function Highlights() {
  const stats = buildStats()
  if (stats.length === 0) return null

  return (
    <section className="highlights">
      <div className="highlights__inner">
        {stats.map((s) => (
          <div className="highlights__stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

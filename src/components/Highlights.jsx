import { restaurant } from '../data/restaurant'

const stats = [
  { value: `${restaurant.rating}★`, label: `${restaurant.reviewCount} Reviews` },
  { value: '10AM–9PM', label: 'Open Daily' },
  { value: restaurant.cuisines.length, label: 'Cuisines' },
  { value: '45+', label: 'Menu Items' },
]

export default function Highlights() {
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

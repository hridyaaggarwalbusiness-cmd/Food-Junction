import { restaurant } from '../data/restaurant'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section__header">
        <p className="section__eyebrow">Our Story</p>
        <h2>Good Food, Good Vibes</h2>
      </div>

      <div className="about__grid">
        <div className="about__card">
          <p>{restaurant.description}</p>
          <ul className="about__cuisines">
            {restaurant.cuisines.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="about__hours">
          <h3>Opening Hours</h3>
          <ul>
            {restaurant.hours.map((h) => (
              <li key={h.day}>
                <span>{h.day}</span>
                <strong>{h.time}</strong>
              </li>
            ))}
          </ul>
          <p className="about__note">Open all week — walk-in, dine-in, or order for delivery.</p>
        </div>
      </div>
    </section>
  )
}

import { restaurant } from '../data/restaurant'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section__header">
        <p className="section__eyebrow">Our Story</p>
        <h2>An Address Worth Savouring</h2>
      </div>

      <div className="about__grid">
        <div className="about__card">
          <p>{restaurant.description}</p>

          <div className="about__row">
            <div className="about__block">
              <h3>Cuisines</h3>
              <ul className="about__tags">
                {restaurant.cuisines.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="about__block">
              <h3>Signature Dishes</h3>
              <ul className="about__tags about__tags--gold">
                {restaurant.signatureDishes.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
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
          <div className="about__rating">
            <strong>{restaurant.rating}</strong>
            <span>Average Rating</span>
          </div>
          <p className="about__note">Open all week — walk-in, dine-in, or order for delivery.</p>
        </div>
      </div>
    </section>
  )
}

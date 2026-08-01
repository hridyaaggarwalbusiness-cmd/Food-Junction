import { restaurant } from '../data/restaurant'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__content">
        <span className="badge">
          <span className="badge__dot" />
          Open Now &middot; Hanumangarh Town Bazar
        </span>

        <h1>{restaurant.name}</h1>
        <p className="hero__tagline">{restaurant.tagline}</p>
        <p className="hero__desc">{restaurant.description}</p>

        <div className="hero__actions">
          <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--primary">
            Order Now
          </a>
          <a href={restaurant.mapsLink} target="_blank" rel="noreferrer" className="btn btn--outline">
            Get Directions
          </a>
        </div>

        <div className="hero__stats">
          <div className="stat-chip">
            <strong>{restaurant.rating}★</strong>
            <span>Rating</span>
          </div>
          <div className="stat-chip">
            <strong>10AM–10PM</strong>
            <span>Open Daily</span>
          </div>
          <div className="stat-chip">
            <strong>{restaurant.cuisines.length}</strong>
            <span>Cuisines</span>
          </div>
        </div>
      </div>
    </section>
  )
}

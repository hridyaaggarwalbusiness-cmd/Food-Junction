import { restaurant } from '../data/restaurant'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__frame" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">Hanumangarh Town Bazar</p>
        <h1>{restaurant.name}</h1>
        <p className="hero__tagline">{restaurant.tagline}</p>
        <p className="hero__desc">{restaurant.description}</p>

        <div className="hero__actions">
          <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--primary">
            Order Now
          </a>
          <a href={restaurant.mapsLink} target="_blank" rel="noreferrer" className="btn btn--ghost">
            Get Directions
          </a>
        </div>

        <div className="hero__stats">
          <div>
            <strong>{restaurant.rating}</strong>
            <span>Rating</span>
          </div>
          <div>
            <strong>10AM–10PM</strong>
            <span>Open Daily</span>
          </div>
          <div>
            <strong>{restaurant.cuisines.length}</strong>
            <span>Cuisines</span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { restaurant } from '../data/restaurant'
import pizzaBanner from '../assets/restaurant/pizza-banner.jpg'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg">
        <img src={pizzaBanner} alt="Fresh pizza from Food Junction Town" />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <span className="badge">
            <span className="badge__dot" />
            Open Now &middot; Town Bazar, Hanumangarh
          </span>

          <h1>{restaurant.name}</h1>
          <p className="hero__tagline">{restaurant.tagline}</p>
          <p className="hero__desc">{restaurant.description}</p>

          <div className="hero__actions">
            <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`} className="btn btn--primary">
              Call Now
            </a>
            <a href={restaurant.mapsLink} target="_blank" rel="noreferrer" className="btn btn--outline">
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

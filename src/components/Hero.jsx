import { restaurant } from '../data/restaurant'
import storefrontNight from '../assets/restaurant/storefront-night.jpg'
import storefrontNightMobile from '../assets/restaurant/storefront-night-mobile.jpg'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg">
        <picture>
          <source media="(max-width: 640px)" srcSet={storefrontNightMobile} />
          <img src={storefrontNight} alt="Food Junction storefront at night, Town Bazar, Hanumangarh" />
        </picture>
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <span className="badge">
            <span className="badge__dot" />
            Open Daily &middot; Town Bazar, Hanumangarh
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

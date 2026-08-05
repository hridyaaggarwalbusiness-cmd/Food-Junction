import { restaurant } from '../data/restaurant'
import SitePhoto from './SitePhoto'
import storefrontNight from '../assets/restaurant/storefront-night.jpg'
import storefrontNightMobile from '../assets/restaurant/storefront-night-mobile.jpg'

export default function Hero() {
  const heroPhoto = restaurant.photo?.path
  const phone = restaurant.phone?.replace(/\s/g, '')

  return (
    <section id="top" className="hero">
      <div className="hero__bg">
        {heroPhoto ? (
          <img src={heroPhoto} alt={`${restaurant.name} on Google Maps`} />
        ) : restaurant.unofficial ? (
          <SitePhoto name={restaurant.name} className="hero__bg-placeholder" />
        ) : (
          <picture>
            <source media="(max-width: 640px)" srcSet={storefrontNightMobile} />
            <img src={storefrontNight} alt="Food Junction storefront at night, Town Bazar, Hanumangarh" />
          </picture>
        )}
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <span className="badge">
            <span className="badge__dot" />
            {restaurant.badge}
          </span>

          <h1>{restaurant.name}</h1>
          <p className="hero__tagline">{restaurant.tagline}</p>
          <p className="hero__desc">{restaurant.description}</p>

          <div className="hero__actions">
            {phone && (
              <a href={`tel:${phone}`} className="btn btn--primary">
                Call Now
              </a>
            )}
            <a href={restaurant.mapsLink} target="_blank" rel="noreferrer" className="btn btn--outline">
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {restaurant.photo?.attribution && (
        <a
          className="hero__photo-credit"
          href={restaurant.photo.attribution.url}
          target="_blank"
          rel="noreferrer"
        >
          Photo: {restaurant.photo.attribution.text} / Google Maps
        </a>
      )}
    </section>
  )
}

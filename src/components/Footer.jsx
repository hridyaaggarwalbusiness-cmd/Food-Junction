import { restaurant } from '../data/restaurant'
import Logo from './Logo'

export default function Footer() {
  const phone = restaurant.phone?.replace(/\s/g, '')
  const hasLinks = restaurant.links.zomato || restaurant.links.swiggy || restaurant.links.justdial

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo size={40} />
          <div>
            <strong>{restaurant.name}</strong>
            <p>{restaurant.tagline}</p>
          </div>
        </div>

        <div className="footer__col">
          <h3>Explore</h3>
          <a href="#about">About</a>
          {restaurant.hasGallery && <a href="#gallery">Gallery</a>}
          <a href="#contact">Contact</a>
        </div>

        {hasLinks && (
          <div className="footer__col">
            <h3>Order Online</h3>
            {restaurant.links.zomato && (
              <a href={restaurant.links.zomato} target="_blank" rel="noreferrer">
                Zomato
              </a>
            )}
            {restaurant.links.swiggy && (
              <a href={restaurant.links.swiggy} target="_blank" rel="noreferrer">
                Swiggy
              </a>
            )}
            {restaurant.links.justdial && (
              <a href={restaurant.links.justdial} target="_blank" rel="noreferrer">
                Justdial
              </a>
            )}
          </div>
        )}

        <div className="footer__col">
          <h3>Visit</h3>
          {phone && <a href={`tel:${phone}`}>{restaurant.phone}</a>}
          <span>
            {restaurant.address.city}, {restaurant.address.state}
          </span>
          {restaurant.hours && <span>{restaurant.hours[0].time}</span>}
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.
        </p>
        {restaurant.unofficial && (
          <p className="footer__disclaimer">
            Unofficial listing page, not run by or affiliated with {restaurant.name}. Built from public data on{' '}
            <a href={restaurant.mapsLink} target="_blank" rel="noreferrer">
              Google Maps
            </a>
            {restaurant.photo?.attribution && (
              <>
                {' '}· Photo: {restaurant.photo.attribution.text} / Google Maps
              </>
            )}
            .
          </p>
        )}
      </div>
    </footer>
  )
}

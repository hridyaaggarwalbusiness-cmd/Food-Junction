import { restaurant } from '../data/restaurant'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">FJ</span>
          <div>
            <strong>{restaurant.name}</strong>
            <p>{restaurant.tagline}</p>
          </div>
        </div>

        <div className="footer__col">
          <h3>Explore</h3>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer__col">
          <h3>Order Online</h3>
          <a href={restaurant.links.zomato} target="_blank" rel="noreferrer">
            Zomato
          </a>
          <a href={restaurant.links.swiggy} target="_blank" rel="noreferrer">
            Swiggy
          </a>
          <a href={restaurant.links.justdial} target="_blank" rel="noreferrer">
            Justdial
          </a>
        </div>

        <div className="footer__col">
          <h3>Visit</h3>
          <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>{restaurant.phone}</a>
          <span>
            {restaurant.address.city}, {restaurant.address.state}
          </span>
          <span>{restaurant.hours[0].time}</span>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

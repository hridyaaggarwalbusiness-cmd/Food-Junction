import { restaurant } from '../data/restaurant'
import Reveal from './Reveal'

export default function Contact() {
  const { address } = restaurant
  const fullAddress = address.full || `${address.line1}, ${address.line2}, ${address.city}, ${address.state} ${address.pincode}, ${address.country}`
  const phone = restaurant.phone?.replace(/\s/g, '')
  const hasLinks = restaurant.links.zomato || restaurant.links.swiggy || restaurant.links.justdial

  return (
    <section id="contact" className="section contact">
      <Reveal className="section__header">
        <p className="section__eyebrow">Visit Us</p>
        <h2>Come Say Hi</h2>
      </Reveal>

      <Reveal className="contact__panel">
        <div className="contact__info">
          <div className="contact__item">
            <span className="contact__icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>{fullAddress}</p>
            </div>
          </div>

          {restaurant.phone && (
            <div className="contact__item">
              <span className="contact__icon">📞</span>
              <div>
                <h3>Phone</h3>
                <p>
                  <a href={`tel:${phone}`}>{restaurant.phone}</a>
                </p>
              </div>
            </div>
          )}

          {restaurant.hours && (
            <div className="contact__item">
              <span className="contact__icon">🕒</span>
              <div>
                <h3>Hours</h3>
                {restaurant.hours.map((h) => (
                  <p key={h.day}>
                    {h.day}: {h.time}
                  </p>
                ))}
              </div>
            </div>
          )}

          {restaurant.rating && (
            <div className="contact__item">
              <span className="contact__icon">⭐</span>
              <div>
                <h3>Rating</h3>
                <p>
                  {restaurant.rating} out of 5 ({restaurant.reviewCount} reviews)
                </p>
              </div>
            </div>
          )}

          {hasLinks && (
            <div className="contact__links">
              {restaurant.links.zomato && (
                <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--outline">
                  Order on Zomato
                </a>
              )}
              {restaurant.links.swiggy && (
                <a href={restaurant.links.swiggy} target="_blank" rel="noreferrer" className="btn btn--outline">
                  Order on Swiggy
                </a>
              )}
              {restaurant.links.justdial && (
                <a href={restaurant.links.justdial} target="_blank" rel="noreferrer" className="btn btn--outline">
                  View on Justdial
                </a>
              )}
            </div>
          )}
        </div>

        <div className="contact__map">
          <iframe
            title={`${restaurant.name} location on Google Maps`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.mapsQuery)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  )
}

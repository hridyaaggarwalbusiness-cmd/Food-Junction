import { restaurant } from '../data/restaurant'
import Reveal from './Reveal'

export default function Contact() {
  const { address } = restaurant
  const fullAddress = `${address.line1}, ${address.line2}, ${address.city}, ${address.state} ${address.pincode}, ${address.country}`

  return (
    <section id="contact" className="section contact">
      <Reveal className="section__header">
        <p className="section__eyebrow">Visit Us</p>
        <h2>Find & Reach Us</h2>
      </Reveal>

      <div className="contact__grid">
        <Reveal className="contact__info glass">
          <div className="contact__item">
            <span className="contact__icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>{fullAddress}</p>
            </div>
          </div>

          <div className="contact__item">
            <span className="contact__icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>
                <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>{restaurant.phone}</a>
              </p>
            </div>
          </div>

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

          <div className="contact__item">
            <span className="contact__icon">⭐</span>
            <div>
              <h3>Rating</h3>
              <p>
                {restaurant.rating} out of 5 ({restaurant.reviewCount} reviews)
              </p>
            </div>
          </div>

          <div className="contact__links">
            <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--outline">
              Order on Zomato
            </a>
            <a href={restaurant.links.swiggy} target="_blank" rel="noreferrer" className="btn btn--outline">
              Order on Swiggy
            </a>
            <a href={restaurant.links.justdial} target="_blank" rel="noreferrer" className="btn btn--outline">
              View on Justdial
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="contact__map glass">
          <iframe
            title="Food Junction location on Google Maps"
            src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.mapsQuery)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  )
}

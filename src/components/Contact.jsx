import { restaurant } from '../data/restaurant'

export default function Contact() {
  const { address } = restaurant
  const fullAddress = `${address.line1}, ${address.line2}, ${address.city}, ${address.state} ${address.pincode}, ${address.country}`

  return (
    <section id="contact" className="section contact">
      <div className="section__header">
        <p className="section__eyebrow">Visit Us</p>
        <h2>Find & Contact Us</h2>
      </div>

      <div className="contact__grid">
        <div className="contact__info">
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
            <span className="contact__icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
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

          <div className="contact__socials">
            <a href={restaurant.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              📘
            </a>
            <a href={restaurant.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              📸
            </a>
            <a href={restaurant.social.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              💬
            </a>
          </div>
        </div>

        <div className="contact__map">
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
        </div>
      </div>
    </section>
  )
}

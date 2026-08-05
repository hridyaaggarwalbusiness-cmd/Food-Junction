import { restaurant } from '../data/restaurant'
import Reveal from './Reveal'
import SitePhoto from './SitePhoto'
import interiorDiningRoom from '../assets/restaurant/interior-dining-room.jpg'

export default function About() {
  const aboutPhoto = restaurant.photo?.path
  const aboutAlt = aboutPhoto
    ? `${restaurant.name} on Google Maps`
    : 'Food Junction dining room, teal booths beneath a gallery wall of framed art'

  return (
    <section id="about" className="section about">
      <div className="about__layout">
        <Reveal className="about__media">
          {aboutPhoto ? (
            <img src={aboutPhoto} alt={aboutAlt} loading="lazy" />
          ) : restaurant.unofficial ? (
            <SitePhoto name={restaurant.name} className="about__media-placeholder" />
          ) : (
            <img src={interiorDiningRoom} alt={aboutAlt} loading="lazy" />
          )}
          {restaurant.rating && (
            <div className="about__media-badge">
              <strong>{restaurant.rating}★</strong>
              <span>{restaurant.reviewCount} Reviews</span>
            </div>
          )}
        </Reveal>

        <div className="about__content">
          <Reveal className="section__header section__header--left">
            <p className="section__eyebrow">{restaurant.unofficial ? 'Listing' : 'Our Story'}</p>
            <h2>{restaurant.unofficial ? 'What We Know' : 'An Address Worth Savouring'}</h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="about__desc">{restaurant.story}</p>

            {restaurant.cuisines.length > 0 && (
              <div className="about__feature">
                <span className="about__num">01</span>
                <div>
                  <h3>{restaurant.unofficial ? 'Category' : 'Cuisines'}</h3>
                  {!restaurant.unofficial && (
                    <p className="about__feature-hint">The styles behind our 45-item menu of pizza, pasta, burgers and more.</p>
                  )}
                  <ul className="about__tags">
                    {restaurant.cuisines.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {restaurant.highlights.length > 0 && (
              <div className="about__feature">
                <span className="about__num">02</span>
                <div>
                  <h3>Known For</h3>
                  <p className="about__feature-hint">Our most-ordered dishes.</p>
                  <ul className="about__tags about__tags--gold">
                    {restaurant.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {(restaurant.hours || restaurant.priceLabel) && (
              <div className="about__strip">
                {restaurant.hours && (
                  <div className="about__strip-item">
                    <span className="about__num about__num--sm">03</span>
                    <div>
                      <h3>Hours</h3>
                      {restaurant.hours.length === 1 ? (
                        <p>{restaurant.hours[0].time}, every day</p>
                      ) : (
                        <p>{restaurant.hours[0].day}: {restaurant.hours[0].time}</p>
                      )}
                    </div>
                  </div>
                )}
                {restaurant.priceLabel && (
                  <div className="about__strip-item">
                    <span className="about__num about__num--sm">04</span>
                    <div>
                      <h3>{restaurant.unofficial ? 'Price Range' : 'Cost for Two'}</h3>
                      <p>{restaurant.priceLabel}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

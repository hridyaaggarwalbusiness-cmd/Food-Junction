import { restaurant } from '../data/restaurant'
import Reveal from './Reveal'
import SitePhoto from './SitePhoto'
import honeyChilliPotato from '../assets/restaurant/honey-chilli-potato.jpg'

export default function CtaBand() {
  const bgPhoto = restaurant.photo?.path
  const phone = restaurant.phone?.replace(/\s/g, '')
  const hasOrderLinks = restaurant.links.zomato || restaurant.links.swiggy

  return (
    <section className="cta-band">
      <div className="cta-band__bg">
        {bgPhoto ? (
          <img src={bgPhoto} alt="" />
        ) : restaurant.unofficial ? (
          <SitePhoto name={restaurant.name} className="cta-band__bg-placeholder" />
        ) : (
          <img src={honeyChilliPotato} alt="" />
        )}
      </div>

      <Reveal className="cta-band__inner">
        <h2>Hungry already?</h2>
        <p>
          {restaurant.unofficial
            ? `Call ahead or drop by — here's how to reach ${restaurant.name}.`
            : "Call in your order, or walk in — Town Bazar's favourite table is waiting. Prefer delivery? Order on Zomato or Swiggy."}
        </p>
        <div className="cta-band__actions">
          {phone && (
            <a href={`tel:${phone}`} className="btn btn--primary">
              Call Now
            </a>
          )}
          <a href={restaurant.mapsLink} target="_blank" rel="noreferrer" className="btn btn--ghost">
            Get Directions
          </a>
          {hasOrderLinks && (
            <>
              {restaurant.links.zomato && (
                <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  Order on Zomato
                </a>
              )}
              {restaurant.links.swiggy && (
                <a href={restaurant.links.swiggy} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  Order on Swiggy
                </a>
              )}
            </>
          )}
        </div>
      </Reveal>
    </section>
  )
}

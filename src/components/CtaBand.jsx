import { restaurant } from '../data/restaurant'
import Reveal from './Reveal'
import honeyChilliPotato from '../assets/restaurant/honey-chilli-potato.jpg'

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-band__bg">
        <img src={honeyChilliPotato} alt="" />
      </div>

      <Reveal className="cta-band__inner">
        <h2>Hungry already?</h2>
        <p>Call in your order, or walk in — Town Bazar's favourite table is waiting. Prefer delivery? Order on Zomato or Swiggy.</p>
        <div className="cta-band__actions">
          <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`} className="btn btn--primary">
            Call Now
          </a>
          <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--ghost">
            Order on Zomato
          </a>
          <a href={restaurant.links.swiggy} target="_blank" rel="noreferrer" className="btn btn--ghost">
            Order on Swiggy
          </a>
        </div>
      </Reveal>
    </section>
  )
}

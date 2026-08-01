import { restaurant } from '../data/restaurant'
import Reveal from './Reveal'

export default function CtaBand() {
  return (
    <section className="cta-band">
      <Reveal className="cta-band__card">
        <h2>Hungry already?</h2>
        <p>Order online in a couple of taps, or walk in — Town Bazar's favourite table is waiting.</p>
        <div className="cta-band__actions">
          <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--primary">
            Order Now
          </a>
          <a href={restaurant.links.swiggy} target="_blank" rel="noreferrer" className="btn btn--ghost">
            Order on Swiggy
          </a>
        </div>
      </Reveal>
    </section>
  )
}

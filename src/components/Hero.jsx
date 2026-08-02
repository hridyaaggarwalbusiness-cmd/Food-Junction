import { restaurant } from '../data/restaurant'
import interiorMuralWall from '../assets/restaurant/interior-mural-wall.jpg'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="badge">
            <span className="badge__dot" />
            Open Now &middot; Dhillon Colony, Hanumangarh
          </span>

          <h1>{restaurant.name}</h1>
          <p className="hero__tagline">{restaurant.tagline}</p>
          <p className="hero__desc">{restaurant.description}</p>

          <div className="hero__actions">
            <a href={restaurant.links.zomato} target="_blank" rel="noreferrer" className="btn btn--primary">
              Order Now
            </a>
            <a href={restaurant.mapsLink} target="_blank" rel="noreferrer" className="btn btn--outline">
              Get Directions
            </a>
          </div>

          <div className="hero__stats">
            <div className="stat-chip">
              <strong>{restaurant.rating}★</strong>
              <span>{restaurant.reviewCount} Reviews</span>
            </div>
            <div className="stat-chip">
              <strong>10AM–9:30PM</strong>
              <span>Open Daily</span>
            </div>
            <div className="stat-chip">
              <strong>{restaurant.cuisines.length}</strong>
              <span>Cuisines</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-frame">
            <img src={interiorMuralWall} alt="Food Junction dining room" className="hero__photo" />
            <div className="hero__photo-badge">
              <strong>{restaurant.rating}★</strong>
              <span>Google Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { restaurant } from '../data/restaurant'
import dumBiryani from '../assets/dishes/dum-biryani.jpg'
import choleBhature from '../assets/dishes/chole-bhature.jpg'
import rollsWraps from '../assets/dishes/rolls-wraps.jpg'
import kebabPlatter from '../assets/dishes/kebab-platter.jpg'

const collage = [
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hyderabadi_Chicken_Biryani.jpg?width=440',
    fallback: dumBiryani,
    label: 'Dum Biryani',
    tone: 'a',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_Plate_of_Chole_Bhature.JPG?width=440',
    fallback: choleBhature,
    label: 'Chole Bhature',
    tone: 'b',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Veg_Roll.JPG?width=440',
    fallback: rollsWraps,
    label: 'Rolls & Wraps',
    tone: 'c',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mutton_Seekh_Kabab.JPG?width=440',
    fallback: kebabPlatter,
    label: 'Kebab Platter',
    tone: 'd',
  },
]

function CollageCard({ photo, fallback, label, tone }) {
  const [src, setSrc] = useState(photo)
  return (
    <div className={`collage__card collage__card--${tone}`}>
      <img src={src} alt={label} loading="lazy" onError={() => setSrc(fallback)} />
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="badge">
            <span className="badge__dot" />
            Open Now &middot; Hanumangarh Town Bazar
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
              <span>Rating</span>
            </div>
            <div className="stat-chip">
              <strong>10AM–10PM</strong>
              <span>Open Daily</span>
            </div>
            <div className="stat-chip">
              <strong>{restaurant.cuisines.length}</strong>
              <span>Cuisines</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__collage">
            {collage.map((item, i) => (
              <CollageCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

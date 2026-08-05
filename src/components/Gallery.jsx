import Reveal from './Reveal'
import interiorDiningRoom from '../assets/restaurant/interior-dining-room.jpg'
import interiorWallArt from '../assets/restaurant/interior-wall-art.jpg'
import storefrontDay from '../assets/restaurant/storefront-day.jpg'
import storefrontNight from '../assets/restaurant/storefront-night.jpg'
import muralCorner from '../assets/restaurant/mural-corner.jpg'
import burgerCover from '../assets/restaurant/burger-cover.jpg'
import pizzaBanner from '../assets/restaurant/pizza-banner.jpg'
import honeyChilliPotato from '../assets/restaurant/honey-chilli-potato.jpg'
import chilliPotato from '../assets/restaurant/chilli-potato.jpg'

const restaurantCards = [
  { photo: interiorDiningRoom, label: 'The Dining Room', wide: true },
  { photo: storefrontDay, label: 'Find Us Here' },
  { photo: interiorWallArt, label: 'Wall Art & Seating' },
  { photo: muralCorner, label: 'The Coffee Corner' },
  { photo: storefrontNight, label: 'Open Till 9PM' },
]

const foodCards = [
  { photo: pizzaBanner, label: 'Fresh From The Oven', wide: true },
  { photo: burgerCover, label: 'Loaded Burger' },
  { photo: honeyChilliPotato, label: 'Honey Chilli Potato' },
  { photo: chilliPotato, label: 'Chilli Potato' },
]

function Filmstrip({ cards }) {
  return (
    <div className="gallery__track">
      {cards.map((card, i) => (
        <Reveal
          as="div"
          delay={i * 60}
          className={`gallery__card ${card.wide ? 'gallery__card--wide' : ''}`}
          key={card.label}
        >
          <img src={card.photo} alt={card.label} loading="lazy" />
          <span className="gallery__label">{card.label}</span>
        </Reveal>
      ))}
    </div>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header section__header--left gallery__header">
        <div>
          <p className="section__eyebrow">A Peek Inside</p>
          <h2>Gallery</h2>
          <p className="section__hint">The booths, the walls, the food — straight from our dining room, no stock photos.</p>
        </div>
        <span className="gallery__swipe-hint">Drag to explore &rarr;</span>
      </Reveal>

      <div className="gallery__group">
        <h3 className="gallery__group-title">Restaurant</h3>
        <Filmstrip cards={restaurantCards} />
      </div>

      <div className="gallery__group">
        <h3 className="gallery__group-title">Food</h3>
        <Filmstrip cards={foodCards} />
      </div>
    </section>
  )
}

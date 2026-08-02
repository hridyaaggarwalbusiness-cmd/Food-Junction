import Reveal from './Reveal'
import interiorDiningRoom from '../assets/restaurant/interior-dining-room.jpg'
import interiorWallArt from '../assets/restaurant/interior-wall-art.jpg'
import pizzaBanner from '../assets/restaurant/pizza-banner.jpg'
import burgerCover from '../assets/restaurant/burger-cover.jpg'
import honeyChilliPotato from '../assets/restaurant/honey-chilli-potato.jpg'
import chilliPotato from '../assets/restaurant/chilli-potato.jpg'

const tiles = [
  { photo: interiorDiningRoom, label: 'The Dining Room' },
  { photo: interiorWallArt, label: 'Wall Art & Seating', tall: true },
  { photo: burgerCover, label: 'Loaded Burger' },
  { photo: honeyChilliPotato, label: 'Honey Chilli Potato', tall: true },
  { photo: chilliPotato, label: 'Chilli Potato' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header">
        <p className="section__eyebrow">A Peek Inside</p>
        <h2>Gallery</h2>
        <p className="section__hint">Real photos of the restaurant and food, from its Google, Zomato and Swiggy listings.</p>
      </Reveal>

      <Reveal className="gallery__feature">
        <img src={pizzaBanner} alt="Fresh pizza from Food Junction Town" loading="lazy" />
        <span className="gallery__label">Fresh From The Oven</span>
      </Reveal>

      <div className="gallery__grid">
        {tiles.map((tile, i) => (
          <Reveal
            as="div"
            delay={i * 60}
            className={`gallery__tile ${tile.tall ? 'gallery__tile--tall' : ''}`}
            key={tile.label}
          >
            <img src={tile.photo} alt={tile.label} loading="lazy" />
            <span className="gallery__label">{tile.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

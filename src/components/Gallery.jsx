import Reveal from './Reveal'
import burgerCover from '../assets/restaurant/burger-cover.jpg'
import honeyChilliPotato from '../assets/restaurant/honey-chilli-potato.jpg'
import pizzaBanner from '../assets/restaurant/pizza-banner.jpg'
import chilliPotato from '../assets/restaurant/chilli-potato.jpg'
import interiorDiningRoom from '../assets/restaurant/interior-dining-room.jpg'
import interiorWallArt from '../assets/restaurant/interior-wall-art.jpg'

const tiles = [
  { photo: interiorDiningRoom, label: 'The Dining Room', size: 'wide' },
  { photo: interiorWallArt, label: 'Wall Art & Seating', size: 'tall' },
  { photo: pizzaBanner, label: 'Fresh From the Oven', size: 'normal' },
  { photo: burgerCover, label: 'Loaded Burger', size: 'normal' },
  { photo: honeyChilliPotato, label: 'Honey Chilli Potato', size: 'wide' },
  { photo: chilliPotato, label: 'Chilli Potato', size: 'normal' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header">
        <p className="section__eyebrow">A Peek Inside</p>
        <h2>Gallery</h2>
        <p className="section__hint">Real photos of the restaurant and food, from its Google, Zomato and Swiggy listings.</p>
      </Reveal>

      <div className="gallery__grid">
        {tiles.map((tile, i) => (
          <Reveal
            as="div"
            delay={i * 60}
            className={`gallery__tile gallery__tile--${tile.size}`}
            key={i}
          >
            <img src={tile.photo} alt={tile.label} loading="lazy" />
            <span className="gallery__label">{tile.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

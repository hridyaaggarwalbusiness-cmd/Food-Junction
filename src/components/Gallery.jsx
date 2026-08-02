import Reveal from './Reveal'
import burgerCover from '../assets/restaurant/burger-cover.jpg'
import honeyChilliPotato from '../assets/restaurant/honey-chilli-potato.jpg'
import pizzaBanner from '../assets/restaurant/pizza-banner.jpg'
import chilliPotato from '../assets/restaurant/chilli-potato.jpg'

const tiles = [
  { photo: pizzaBanner, label: 'Fresh From the Oven', size: 'wide' },
  { photo: burgerCover, label: 'Loaded Burger', size: 'tall' },
  { photo: honeyChilliPotato, label: 'Honey Chilli Potato', size: 'normal' },
  { photo: chilliPotato, label: 'Chilli Potato', size: 'normal' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header">
        <p className="section__eyebrow">A Peek Inside</p>
        <h2>Gallery</h2>
        <p className="section__hint">Real photos from Food Junction Town's Zomato and Swiggy listings.</p>
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

import Reveal from './Reveal'
import interiorMuralWall from '../assets/restaurant/interior-mural-wall.jpg'
import pizzaCloseup from '../assets/restaurant/pizza-closeup.jpg'
import seatingGraffitiArt from '../assets/restaurant/seating-graffiti-art.jpg'

const tiles = [
  { photo: interiorMuralWall, label: 'The Dining Room', size: 'wide' },
  { photo: seatingGraffitiArt, label: 'Graffiti Wall & Seating', size: 'tall' },
  { photo: pizzaCloseup, label: 'Fresh Off the Oven', size: 'normal' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header">
        <p className="section__eyebrow">A Peek Inside</p>
        <h2>Gallery</h2>
        <p className="section__hint">Real photos from the restaurant's Google listing.</p>
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

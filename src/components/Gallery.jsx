import Reveal from './Reveal'

const tiles = [
  { icon: '🍛', label: 'Dum Biryani', size: 'wide' },
  { icon: '🫓', label: 'Chole Bhature', size: 'tall' },
  { icon: '🥙', label: 'Chaat Corner', size: 'normal' },
  { icon: '🌯', label: 'Rolls & Wraps', size: 'normal' },
  { icon: '🍢', label: 'Kebab Platter', size: 'tall' },
  { icon: '🥟', label: 'Gol Gappe', size: 'wide' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header">
        <p className="section__eyebrow">A Peek Inside</p>
        <h2>Gallery</h2>
        <p className="section__hint">
          Placeholder tiles shown below — swap these for real photography of the restaurant and dishes.
        </p>
      </Reveal>

      <div className="gallery__grid">
        {tiles.map((tile, i) => (
          <Reveal
            as="div"
            delay={i * 60}
            className={`gallery__tile gallery__tile--${tile.size}`}
            key={i}
          >
            <span className="gallery__icon">{tile.icon}</span>
            <span className="gallery__label">{tile.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

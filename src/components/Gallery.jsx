import Reveal from './Reveal'
import dumBiryani from '../assets/dishes/dum-biryani.jpg'
import choleBhature from '../assets/dishes/chole-bhature.jpg'
import chaatCorner from '../assets/dishes/chaat-corner.jpg'
import rollsWraps from '../assets/dishes/rolls-wraps.jpg'
import kebabPlatter from '../assets/dishes/kebab-platter.jpg'
import golGappe from '../assets/dishes/gol-gappe.jpg'

const tiles = [
  { photo: dumBiryani, label: 'Dum Biryani', size: 'wide' },
  { photo: choleBhature, label: 'Chole Bhature', size: 'tall' },
  { photo: chaatCorner, label: 'Chaat Corner', size: 'normal' },
  { photo: rollsWraps, label: 'Rolls & Wraps', size: 'normal' },
  { photo: kebabPlatter, label: 'Kebab Platter', size: 'tall' },
  { photo: golGappe, label: 'Gol Gappe', size: 'wide' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header">
        <p className="section__eyebrow">A Peek Inside</p>
        <h2>Gallery</h2>
        <p className="section__hint">
          Illustrated placeholders shown below — swap these for real photography of the restaurant and dishes.
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
            <img src={tile.photo} alt={tile.label} loading="lazy" />
            <span className="gallery__label">{tile.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

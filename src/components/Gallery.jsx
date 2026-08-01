import { useState } from 'react'
import Reveal from './Reveal'
import dumBiryani from '../assets/dishes/dum-biryani.jpg'
import choleBhature from '../assets/dishes/chole-bhature.jpg'
import chaatCorner from '../assets/dishes/chaat-corner.jpg'
import rollsWraps from '../assets/dishes/rolls-wraps.jpg'
import kebabPlatter from '../assets/dishes/kebab-platter.jpg'
import golGappe from '../assets/dishes/gol-gappe.jpg'

const tiles = [
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hyderabadi_Chicken_Biryani.jpg?width=1200',
    fallback: dumBiryani,
    label: 'Dum Biryani',
    size: 'wide',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_Plate_of_Chole_Bhature.JPG?width=1200',
    fallback: choleBhature,
    label: 'Chole Bhature',
    size: 'tall',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chaat_stand_in_mussoorie.jpg?width=1200',
    fallback: chaatCorner,
    label: 'Chaat Corner',
    size: 'normal',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Veg_Roll.JPG?width=1200',
    fallback: rollsWraps,
    label: 'Rolls & Wraps',
    size: 'normal',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mutton_Seekh_Kabab.JPG?width=1200',
    fallback: kebabPlatter,
    label: 'Kebab Platter',
    size: 'tall',
  },
  {
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Panipuri,_Golgappa,_Phuchka.jpg?width=1200',
    fallback: golGappe,
    label: 'Gol Gappe',
    size: 'wide',
  },
]

function GalleryPhoto({ photo, fallback, label }) {
  const [src, setSrc] = useState(photo)
  return <img src={src} alt={label} loading="lazy" onError={() => setSrc(fallback)} />
}

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section__header">
        <p className="section__eyebrow">A Peek Inside</p>
        <h2>Gallery</h2>
        <p className="section__hint">A taste of what's on the menu.</p>
      </Reveal>

      <div className="gallery__grid">
        {tiles.map((tile, i) => (
          <Reveal
            as="div"
            delay={i * 60}
            className={`gallery__tile gallery__tile--${tile.size}`}
            key={i}
          >
            <GalleryPhoto photo={tile.photo} fallback={tile.fallback} label={tile.label} />
            <span className="gallery__label">{tile.label}</span>
          </Reveal>
        ))}
      </div>
      <p className="gallery__credit">Dish photos: Wikimedia Commons contributors, CC BY-SA — illustrative, not photos of this exact location.</p>
    </section>
  )
}

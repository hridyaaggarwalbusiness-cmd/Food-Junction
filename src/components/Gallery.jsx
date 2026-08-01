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
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/1200px-Hyderabadi_Chicken_Biryani.jpg',
    fallback: dumBiryani,
    label: 'Dum Biryani',
    size: 'wide',
  },
  {
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/A_Plate_of_Chole_Bhature.JPG/1200px-A_Plate_of_Chole_Bhature.JPG',
    fallback: choleBhature,
    label: 'Chole Bhature',
    size: 'tall',
  },
  {
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Chaat_stand_in_mussoorie.jpg/1200px-Chaat_stand_in_mussoorie.jpg',
    fallback: chaatCorner,
    label: 'Chaat Corner',
    size: 'normal',
  },
  {
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Veg_Roll.JPG/1200px-Veg_Roll.JPG',
    fallback: rollsWraps,
    label: 'Rolls & Wraps',
    size: 'normal',
  },
  {
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mutton_Seekh_Kabab.JPG/1200px-Mutton_Seekh_Kabab.JPG',
    fallback: kebabPlatter,
    label: 'Kebab Platter',
    size: 'tall',
  },
  {
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Gol_Guppa.JPG/1200px-Gol_Guppa.JPG',
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

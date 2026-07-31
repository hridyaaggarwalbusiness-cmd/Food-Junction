import { restaurant } from '../data/restaurant'

export default function Menu() {
  return (
    <section id="menu" className="section menu">
      <div className="section__header">
        <p className="section__eyebrow">Crowd Favourites</p>
        <h2>Popular Dishes</h2>
      </div>

      <div className="menu__grid">
        {restaurant.popularDishes.map((dish) => (
          <div className="menu__card" key={dish.name}>
            <span className="menu__icon">{dish.icon}</span>
            <span className="menu__name">{dish.name}</span>
          </div>
        ))}
      </div>

      <div className="menu__order">
        <a href={restaurant.social.zomato} target="_blank" rel="noreferrer" className="btn btn--outline">
          Order on Zomato
        </a>
        <a href={restaurant.social.swiggy} target="_blank" rel="noreferrer" className="btn btn--outline">
          Order on Swiggy
        </a>
      </div>
    </section>
  )
}

import { restaurant } from '../data/restaurant'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        ✦ {restaurant.name} &middot; {restaurant.address.city}, {restaurant.address.state}
      </p>
      <p>&copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
    </footer>
  )
}

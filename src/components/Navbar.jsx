import { useEffect, useState } from 'react'
import { restaurant } from '../data/restaurant'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const phone = restaurant.phone?.replace(/\s/g, '')

  const links = [
    { href: '#about', label: 'About' },
    restaurant.gallery && { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ].filter(Boolean)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#top" className="navbar__brand">
          <Logo size={34} />
          {restaurant.name}
        </a>

        <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          {phone && (
            <a href={`tel:${phone}`} className="navbar__cta">
              Call Now
            </a>
          )}
        </nav>

        <button
          className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

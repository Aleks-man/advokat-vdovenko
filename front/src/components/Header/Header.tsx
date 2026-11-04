import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'
import { navigation, site } from '../../data/site'
import { Brand } from '../Brand/Brand'
import { contactLinks } from '../../data/contacts'
import { useCompactHeader } from './hooks/useCompactHeader'
import './Header.css'
export function Header() {
  const [open, setOpen] = useState(false)
  const compact = useCompactHeader()
  return (
    <div className="header-space">
      <header className={`header container${compact ? ' header--compact' : ''}`}>
        <Brand onClick={() => setOpen(false)}>
          <span className="header-compact-name" aria-hidden="true">
            {site.name}
            <small>{site.brandTagline}</small>
          </span>
        </Brand>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={`navigation ${open ? 'is-open' : ''}`}
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <span className="navigation-indicator" aria-hidden="true" />
        </nav>
        <a
          className="header-contact"
          href={contactLinks.phone}
          aria-label={`Позвонить: ${site.phone}`}
        >
          <Phone size={19} aria-hidden="true" />
          <span>{site.phone}</span>
        </a>
      </header>
    </div>
  )
}

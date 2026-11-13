import { MessengerLinks } from '../MessengerLinks/MessengerLinks'
import { NavLink } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'
import { navigation, site } from '../../data/site'
import { Brand } from '../Brand/Brand'
import { contactLinks } from '../../data/contacts'
import { useCompactHeader } from './hooks/useCompactHeader'
import { useMobileMenu } from './hooks/useMobileMenu'
import './Header.css'
export function Header() {
  const { open, buttonRef, navigationRef, close, toggle } = useMobileMenu()
  const compact = useCompactHeader()
  return (
    <div className="header-space">
      <header className={`header${compact ? ' header--compact' : ''}`}>
        <div className="header-inner container">
          <Brand onClick={close}>
            <span className="header-compact-name" aria-hidden="true">
              {site.name}
              <small>{site.brandTagline}</small>
            </span>
          </Brand>
          <button
            ref={buttonRef}
            type="button"
            className="menu-toggle"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            ref={navigationRef}
            id="main-navigation"
            className={`navigation ${open ? 'is-open' : ''}`}
            aria-label="Основная навигация"
          >
            <div className="navigation-links">
              {navigation.map((item) => (
                <NavLink key={item.to} to={item.to} end onClick={close}>
                  {item.label}
                </NavLink>
              ))}
              <span className="navigation-indicator" aria-hidden="true" />
              <div className="navigation-contacts">
                <a
                  className="navigation-phone"
                  href={contactLinks.phone}
                  aria-label={`Позвонить: ${site.phone}`}
                >
                  <Phone size={18} aria-hidden="true" />
                  {site.phone}
                </a>
                <MessengerLinks />
              </div>
            </div>
          </nav>
          <a
            className="header-contact"
            href={contactLinks.phone}
            aria-label={`Позвонить: ${site.phone}`}
          >
            <Phone size={19} aria-hidden="true" />
            <span>{site.phone}</span>
          </a>
        </div>
      </header>
    </div>
  )
}

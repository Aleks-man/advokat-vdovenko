import type { Ref } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { MessengerLinks } from '@/components/contact/MessengerLinks/MessengerLinks'
import { site } from '@/data/site'
import { navigation } from '@/app/routes'
import { contactLinks } from '@/data/contacts'
import './HeaderNavigation.css'

type HeaderNavigationProps = {
  open: boolean
  navigationRef: Ref<HTMLElement>
  close: () => void
}

export function HeaderNavigation({ open, navigationRef, close }: HeaderNavigationProps) {
  return (
    <nav
      ref={navigationRef}
      id="main-navigation"
      className={`navigation ${open ? 'is-open' : ''}`}
      aria-label="Основная навигация"
    >
      <div className="navigation-panel">
        <div className="navigation-links">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} end onClick={close}>
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
      </div>
    </nav>
  )
}

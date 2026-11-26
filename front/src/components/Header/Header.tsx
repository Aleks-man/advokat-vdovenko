import { attorney } from '@/data/attorney'
import { HeaderNavigation } from './HeaderNavigation'
import { Phone, Menu, X } from 'lucide-react'
import { site } from '@/data/site'
import { Brand } from '../Brand/Brand'
import { contactLinks } from '@/data/contacts'
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
              {attorney.name}
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
          <HeaderNavigation open={open} navigationRef={navigationRef} close={close} />
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

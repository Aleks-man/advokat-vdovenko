import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { navigation, site } from '../../data/site'
import { MessengerLinks } from '../MessengerLinks/MessengerLinks'
import { Brand } from '../Brand/Brand'
import { contactLinks } from '../../data/contacts'
import './Footer.css'
export function Footer() {
  return (
    <footer className="footer panel">
      <div className="container">
        <div className="footer-top">
          <Brand className="footer-brand" />
          <nav aria-label="Навигация в подвале">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="footer-contacts">
            <MessengerLinks />
            <a className="footer-phone" href={contactLinks.phone}>
              <Phone size={16} aria-hidden="true" />
              <span>{site.phone}</span>
            </a>
            <a className="footer-email" href={contactLinks.email}>
              <Mail size={15} aria-hidden="true" />
              <span>{site.email}</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Частная адвокатская практика</span>
        </div>
      </div>
    </footer>
  )
}

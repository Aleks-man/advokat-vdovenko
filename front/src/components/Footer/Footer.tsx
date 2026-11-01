import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { navigation, site } from '../../data/site'
import { MessengerLinks } from '../MessengerLinks/MessengerLinks'
import './Footer.css'
export function Footer() {
  const phone = site.phone.replace(/[^+\d]/g, '')
  return (
    <footer className="footer panel">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="brand footer-brand" aria-label="Константин Вдовенко — главная">
            <img className="brand-mark" src="/brand/vdovenko.svg" alt="" width="68" height="68" />
            <span className="brand-name">
              <span>Константин</span>
              <strong>Вдовенко</strong>
              <small>АДВОКАТ · УГОЛОВНЫЕ ДЕЛА</small>
            </span>
          </Link>
          <nav aria-label="Навигация в подвале">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="footer-contacts">
            <MessengerLinks />
            <a className="footer-phone" href={`tel:${phone}`}>
              <Phone size={16} aria-hidden="true" />
              <span>{site.phone}</span>
            </a>
            <a className="footer-email" href={`mailto:${site.email}`}>
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

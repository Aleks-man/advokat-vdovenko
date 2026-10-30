import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import viberIcon from '../../assets/icons/viber.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import telegramIcon from '../../assets/icons/telegram.svg'
import { navigation, site } from '../../data/site'
import './Footer.css'
export function Footer() {
  const phone = site.phone.replace(/[^+\d]/g, '')
  const phoneDigits = phone.replace(/\D/g, '')
  const messengers = [
    {
      name: 'Viber',
      icon: viberIcon,
      kind: 'viber',
      href: 'viber://chat?number=' + encodeURIComponent(phone),
    },
    {
      name: 'WhatsApp',
      icon: whatsappIcon,
      kind: 'whatsapp',
      href: 'https://wa.me/' + phoneDigits,
    },
    {
      name: 'Telegram',
      icon: telegramIcon,
      kind: 'telegram',
      href: 'https://t.me/+' + phoneDigits,
    },
  ]
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
            <div className="footer-messengers" role="group" aria-label="Связаться в мессенджерах">
              {messengers.map((messenger) => (
                <a
                  key={messenger.kind}
                  className={`footer-messenger footer-messenger--${messenger.kind}`}
                  href={messenger.href}
                  aria-label={`Написать в ${messenger.name}`}
                  title={messenger.name}
                  target={messenger.kind === 'viber' ? undefined : '_blank'}
                  rel={messenger.kind === 'viber' ? undefined : 'noopener noreferrer'}
                >
                  <img src={messenger.icon} alt="" width="19" height="19" />
                </a>
              ))}
            </div>
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

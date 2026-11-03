import { Phone } from 'lucide-react'
import { MessengerLinks } from '../MessengerLinks/MessengerLinks'
import { site } from '../../data/site'
import { contactLinks } from '../../data/contacts'
import './ContactBanner.css'

export function ContactBanner() {
  return (
    <section className="contact-banner panel">
      <div className="container contact-banner-inner">
        <div>
          <p className="eyebrow">Связаться со мной</p>
          <h2>
            Нужна помощь
            <br />
            <em>по уголовному делу?</em>
          </h2>
          <p className="contact-banner-copy">
            Позвоните или напишите мне, чтобы обсудить вашу ситуацию.
          </p>
        </div>
        <div className="contact-banner-actions">
          <a className="contact-banner-phone" href={contactLinks.phone}>
            <Phone size={20} aria-hidden="true" />
            {site.phone}
          </a>
          <MessengerLinks />
          <a className="contact-banner-email" href={contactLinks.email}>
            {site.email}
          </a>
        </div>
      </div>
    </section>
  )
}

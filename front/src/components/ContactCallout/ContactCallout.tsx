import { ArrowUpRight, Phone } from 'lucide-react'
import { contactLinks } from '../../data/contacts'
import './ContactCallout.css'

export function ContactCallout() {
  return (
    <section className="container contact-callout" aria-labelledby="contact-callout-title">
      <div className="contact-callout-copy">
        <h2 id="contact-callout-title">Обсудим вашу ситуацию</h2>
        <p>Коротко расскажите, что произошло и какая помощь нужна.</p>
      </div>
      <div className="contact-callout-actions">
        <a className="button contact-callout-primary" href={contactLinks.phone}>
          <Phone size={18} aria-hidden="true" />
          Позвонить мне
        </a>
        <a
          className="button contact-callout-secondary"
          href={contactLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Написать в Telegram
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

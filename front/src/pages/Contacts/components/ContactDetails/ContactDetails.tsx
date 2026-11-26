import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/data/site'
import { contactLinks } from '@/data/contacts'
import { MessengerLinks } from '@/components/MessengerLinks/MessengerLinks'

import './ContactDetails.css'

export function ContactDetails() {
  const [emailName, emailDomain] = site.email.split('@')
  return (
    <div className="contact-details">
      <div className="contact-detail contact-detail--primary">
        <Phone size={18} />
        <div>
          <span className="eyebrow">Телефон</span>
          <a className="contact-value contact-phone" href={contactLinks.phone}>
            {site.phone}
          </a>
          <small>Позвоните или выберите удобный мессенджер</small>
          <MessengerLinks showLabels />
        </div>
      </div>
      <div className="contact-detail">
        <Mail size={18} />
        <div>
          <span className="eyebrow">Электронная почта</span>
          <a className="contact-value contact-email" href={contactLinks.email}>
            <span>
              {emailName}@<wbr />
              {emailDomain}
            </span>
          </a>
          <small>Чтобы задать вопрос или договориться о встрече</small>
        </div>
      </div>
      <div className="contact-detail">
        <MapPin size={18} />
        <div>
          <span className="eyebrow">Адрес приёма</span>
          <a
            className="contact-value contact-address"
            href={contactLinks.map}
            target="_blank"
            rel="noopener noreferrer"
            title="Открыть адрес в Яндекс Картах"
          >
            {site.city}, {site.address}
          </a>
          <small>Принимаю по предварительной записи</small>
        </div>
      </div>
    </div>
  )
}

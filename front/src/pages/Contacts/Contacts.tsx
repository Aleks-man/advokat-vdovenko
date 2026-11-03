import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../data/site'
import { MessengerLinks } from '../../components/MessengerLinks/MessengerLinks'
import './Contacts.css'
import { PageIntro } from '../../components/PageIntro/PageIntro'
export function Contacts() {
  const [emailName, emailDomain] = site.email.split('@')
  return (
    <>
      <PageIntro
        compact
        eyebrow="03 / Контакты"
        title={
          <>
            Связаться{' '}
            <em>со мной</em>
          </>
        }
      >
        Свяжитесь со мной, чтобы задать вопрос или выбрать время консультации.
      </PageIntro>
      <section className="container section contacts-layout">
        <div className="contact-details">
          <div className="contact-detail">
            <Phone size={18} />
            <div>
              <span className="eyebrow">Телефон</span>
              <a
                className="contact-value contact-phone"
                href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
              >
                {site.phone}
              </a>
              <small>Позвоните или напишите в удобном мессенджере</small>
              <MessengerLinks />
            </div>
          </div>
          <div className="contact-detail">
            <Mail size={18} />
            <div>
              <span className="eyebrow">Электронная почта</span>
              <a className="contact-value contact-email" href={`mailto:${site.email}`}>
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
              <p className="contact-value contact-address">
                {site.city}, {site.address}
              </p>
              <small>Принимаю по предварительной записи</small>
            </div>
          </div>
        </div>
        <aside className="contact-aside">
          <p className="eyebrow">Перед обращением</p>
          <h2>
            Как договориться
            <br />
            <em>о встрече</em>
          </h2>
          <p>
            В первом сообщении коротко опишите ситуацию. Если уже назначен допрос или заседание,
            укажите дату — это поможет понять, сколько времени есть до встречи.
          </p>
          <div className="contact-aside-note">
            О времени и месте встречи договоримся заранее.
            <br />
            Если планируете приехать, сначала подтвердите запись.
          </div>
        </aside>
      </section>
    </>
  )
}

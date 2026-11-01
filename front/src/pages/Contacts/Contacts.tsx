import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../data/site'
import './Contacts.css'
import { LegalArtwork } from '../../components/LegalArtwork/LegalArtwork'
export function Contacts() {
  return (
    <>
      <section className="container page-intro legal-intro">
        <LegalArtwork kind="document" />
        <p className="eyebrow">03 / Контакты</p>
        <h1>
          Записаться
          <br />
          <em>на консультацию</em>
        </h1>
        <p>Свяжитесь со мной, чтобы задать вопрос или выбрать время консультации.</p>
      </section>
      <section className="container section contacts-layout">
        <div className="contact-details">
          <div className="contact-detail">
            <Phone size={18} />
            <div>
              <span className="eyebrow">Телефон</span>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>
              <small>Для записи на консультацию</small>
            </div>
          </div>
          <div className="contact-detail">
            <Mail size={18} />
            <div>
              <span className="eyebrow">Электронная почта</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <small>Чтобы задать вопрос или договориться о встрече</small>
            </div>
          </div>
          <div className="contact-detail">
            <MapPin size={18} />
            <div>
              <span className="eyebrow">Адрес приёма</span>
              <p>
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

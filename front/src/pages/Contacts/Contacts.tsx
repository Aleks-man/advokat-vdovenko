import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
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
          Обращение
          <br />
          <em>к адвокату.</em>
        </h1>
        <p>
          Укажите стадию дела, ближайшие назначенные даты и вопрос, который хотите обсудить.
          Подробности можно разобрать во время разговора.
        </p>
      </section>
      <section className="container section contacts-layout">
        <div className="contact-details">
          <div className="contact-detail">
            <Phone size={18} />
            <div>
              <span className="eyebrow">Телефон</span>
              {site.phone ? (
                <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
                  {site.phone}
                  <ArrowUpRight size={20} />
                </a>
              ) : (
                <p>Пока не опубликован</p>
              )}
              <small>Номер появится после подтверждения адвокатом</small>
            </div>
          </div>
          <div className="contact-detail">
            <Mail size={18} />
            <div>
              <span className="eyebrow">Электронная почта</span>
              {site.email ? (
                <a href={`mailto:${site.email}`}>
                  {site.email}
                  <ArrowUpRight size={20} />
                </a>
              ) : (
                <p>Пока не опубликована</p>
              )}
              <small>Адрес появится после подтверждения адвокатом</small>
            </div>
          </div>
          <div className="contact-detail">
            <MapPin size={18} />
            <div>
              <span className="eyebrow">Регион работы</span>
              <p>{site.city ?? 'Уточняется'}</p>
              <small>Формат и место встречи — по согласованию</small>
            </div>
          </div>
        </div>
        <aside className="contact-aside">
          <p className="eyebrow">Перед обращением</p>
          <h2>
            Кратко о событиях.
            <br />
            <em>Отдельно — вопросы.</em>
          </h2>
          <p>
            Начните с того, что происходит сейчас. Подготовьте даты, названия имеющихся документов и
            вопросы, на которые нужен ответ.
          </p>
          <div className="contact-aside-note">
            Контакты готовятся к публикации.
            <br />
            Отправить сведения о деле через сайт пока нельзя.
          </div>
        </aside>
      </section>
    </>
  )
}

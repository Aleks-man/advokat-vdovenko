import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../data/site'
import './Contacts.css'
export function Contacts() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">03 / Контакты</p>
        <h1>
          Начнём
          <br />
          <em>с разговора.</em>
        </h1>
        <p>
          Первое обращение — возможность обозначить вопрос и обсудить дальнейшее взаимодействие.
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
                <p>Будет добавлен</p>
              )}
              <small>Номер уточняется у Константина</small>
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
                <p>Будет добавлена</p>
              )}
              <small>Адрес для обращений пока не подтверждён</small>
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
          <p className="eyebrow">Сайт готовится к запуску</p>
          <h2>
            Личное общение.
            <br />
            <em>Без лишних посредников.</em>
          </h2>
          <p>
            Контакты появятся после подтверждения адвокатом. Сейчас это демонстрация будущего сайта.
          </p>
          <div className="contact-aside-note">
            Форма обращения пока не подключена.
            <br />
            Сайт не принимает и не сохраняет сведения о делах.
          </div>
        </aside>
      </section>
    </>
  )
}

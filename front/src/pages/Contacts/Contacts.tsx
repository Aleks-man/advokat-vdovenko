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
          Записаться
          <br />
          <em>на консультацию.</em>
        </h1>
        <p>
          Позвоните или напишите на почту. Кратко расскажите, что случилось. Если уже назначен
          допрос или заседание суда, сообщите дату.
        </p>
      </section>
      <section className="container section contacts-layout">
        <div className="contact-details">
          <div className="contact-detail">
            <Phone size={18} />
            <div>
              <span className="eyebrow">Телефон</span>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
                {site.phone}
                <ArrowUpRight size={20} />
              </a>
              <small>Для записи на консультацию</small>
            </div>
          </div>
          <div className="contact-detail">
            <Mail size={18} />
            <div>
              <span className="eyebrow">Электронная почта</span>
              <a href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight size={20} />
              </a>
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
              <small>Приём по предварительной записи</small>
            </div>
          </div>
        </div>
        <aside className="contact-aside">
          <p className="eyebrow">Перед обращением</p>
          <h2>
            Что подготовить
            <br />
            <em>к разговору.</em>
          </h2>
          <p>
            Вспомните основные события и даты, соберите документы по делу и запишите свои вопросы.
            Если чего-то не хватает, это можно обсудить на консультации.
          </p>
          <div className="contact-aside-note">
            О времени и месте встречи договоримся заранее.
            <br />
            Для записи позвоните или напишите на электронную почту.
          </div>
        </aside>
      </section>
    </>
  )
}

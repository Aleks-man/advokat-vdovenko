import { Link } from 'react-router-dom'
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
            Расскажите мне, что случилось. Договоримся о консультации и обсудим ваши вопросы.
          </p>
        </div>
        <Link className="button button--light" to="/contacts">
          Записаться на консультацию
        </Link>
      </div>
    </section>
  )
}

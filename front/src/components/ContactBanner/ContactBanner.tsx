import { Link } from 'react-router-dom'
import './ContactBanner.css'
export function ContactBanner() {
  return (
    <section className="contact-banner panel">
      <div className="container contact-banner-inner">
        <div>
          <p className="eyebrow">Связаться с адвокатом</p>
          <h2>
            Нужна помощь
            <br />
            <em>по уголовному делу?</em>
          </h2>
          <p className="contact-banner-copy">
            Позвоните или напишите, чтобы рассказать о ситуации и договориться о консультации.
          </p>
        </div>
        <Link className="button button--light" to="/contacts">
          Перейти к контактам
        </Link>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import './ContactBanner.css'
export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="container contact-banner-inner">
        <div>
          <p className="eyebrow">Обращение к адвокату</p>
          <h2>
            С чего началась ситуация.
            <br />
            <em>Что происходит сейчас.</em>
          </h2>
          <p className="contact-banner-copy">
            Для первого разговора — краткая хронология и вопросы, с которыми вы обращаетесь.
          </p>
        </div>
        <Link className="button button--light" to="/contacts">
          Перейти к контактам <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  )
}

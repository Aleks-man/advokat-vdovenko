import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import './ContactBanner.css'
export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="container contact-banner-inner">
        <div>
          <p className="eyebrow">Первый шаг — разговор</p>
          <h2>
            Когда нужна ясность,
            <br />
            <em>начните с вопроса.</em>
          </h2>
          <p className="contact-banner-copy">Обсудить обстоятельства и понять, с чего начать.</p>
        </div>
        <Link className="button button--light" to="/contacts">
          Перейти к контактам <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  )
}

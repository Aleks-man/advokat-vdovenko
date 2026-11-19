import { attorney } from '../../../../data/attorney'
import { Link } from 'react-router-dom'
import { contactLinks } from '../../../../data/contacts'
import './Hero.css'
import './Hero.tablet.css'
import './Hero.mobile.css'
export function Hero() {
  const [firstName, ...lastName] = attorney.name.split(' ')
  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="hero-heading">
          <p className="hero-location">Частная практика · {attorney.region.label}</p>
          <h1>
            <span>{firstName}</span> <em>{lastName.join(' ')}</em>
          </h1>
        </div>
        <div className="hero-content">
          <p className="hero-description">
            <span className="hero-profession">{attorney.profession}</span>
            <span className="hero-summary">
              Помогу разобраться в ситуации и определить следующие шаги — от проверки до защиты в
              суде.
            </span>
          </p>
          <dl className="hero-facts">
            <div>
              <dt>Уголовная практика</dt>
              <dd>{attorney.practiceSince}</dd>
            </div>
            <div>
              <dt>Стадии защиты</dt>
              <dd>Проверка · следствие · суд</dd>
            </div>
          </dl>
        </div>
        <div className="hero-actions">
          <Link to="/contacts" className="button">
            Обсудить ситуацию
          </Link>
          <a
            className="text-link"
            href={contactLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
      <div className="hero-art">
        <img
          className="hero-image"
          src={attorney.portrait.src}
          alt={attorney.portrait.alt}
          width={800}
          height={1000}
          fetchPriority="high"
        />
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { contactLinks } from '../../data/contacts'
import { about } from '../../data/about'
import './Hero.css'
export function Hero() {
  const [firstName, ...lastName] = site.name.split(' ')
  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="hero-heading">
          <p className="hero-location">Частная практика · Москва и область</p>
          <h1>
            <span>{firstName}</span> <em>{lastName.join(' ')}</em>
          </h1>
        </div>
        <div className="hero-content">
          <p className="hero-description">
            Адвокат по уголовным делам
            <span>
              Помогу разобраться в ситуации и определить следующие шаги — от проверки до защиты в
              суде.
            </span>
          </p>
          <dl className="hero-facts">
            <div>
              <dt>Уголовная практика</dt>
              <dd>С 2014 года</dd>
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
          src={about.portrait.src}
          alt={about.portrait.alt}
          width={800}
          height={1000}
          fetchPriority="high"
        />
      </div>
    </section>
  )
}

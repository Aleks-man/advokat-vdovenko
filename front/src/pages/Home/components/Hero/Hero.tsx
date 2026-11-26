import { routes } from '@/app/routes'
import { attorney } from '@/data/attorney'
import { Link } from 'react-router-dom'
import { contactLinks } from '@/data/contacts'
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
              <span className="hero-summary-full">
                Помогу разобраться в ситуации и определить следующие шаги — от проверки до защиты в
                суде.
              </span>
              <span className="hero-summary-short">
                Помогу разобраться в ситуации и выстроить защиту.
              </span>
            </span>
          </p>
          <p className="hero-mobile-practice">
            Уголовная практика {attorney.practiceSince.toLocaleLowerCase('ru-RU')}
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
          <Link to={routes.contacts.path} className="button">
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

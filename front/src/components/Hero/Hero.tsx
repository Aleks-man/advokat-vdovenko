import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import justiceHero from '../../assets/justice-hero.webp'
import './Hero.css'
export function Hero() {
  const [firstName, ...lastName] = site.name.split(' ')
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">Адвокат по уголовным делам</p>
        <h1>
          <span>{firstName}</span>
          <em>{lastName.join(' ')}</em>
        </h1>
        <p className="hero-description">
          Защита по уголовным делам
          <span>Помогаю на стадии проверки, следствия и в суде.</span>
        </p>
        <div className="hero-actions">
          <Link to="/contacts" className="button">
            Обсудить ситуацию
          </Link>
        </div>
      </div>
      <div className="hero-art">
        <img
          className="hero-image"
          src={justiceHero}
          alt="Фемида с повязкой на глазах и весами — символ правосудия"
          width={1122}
          height={1402}
          fetchPriority="high"
        />
      </div>
      <div className="hero-bottom">
        <span>Проверка · следствие · суд</span>
        <span>Вы можете обратиться за себя или за близкого.</span>
      </div>
    </section>
  )
}

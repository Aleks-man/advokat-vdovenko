import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import justiceHero from '../../assets/justice-hero.webp'
import './Hero.css'
export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Частная адвокатская практика
        </p>
        <h1>
          Помощь адвоката
          <br />
          <em>по уголовным</em>
          <br />
          <em>делам.</em>
        </h1>
        <p className="hero-description">
          Константин Вдовенко<span>Адвокат по уголовным делам</span>
        </p>
        <div className="hero-actions">
          <Link to="/contacts" className="button">
            Контакты адвоката <ArrowUpRight size={18} />
          </Link>
          <a href="#practice" className="hero-explore" aria-label="Узнать о направлениях защиты">
            <ArrowDown size={18} />
          </a>
        </div>
        <p className="hero-note">Расскажите, что случилось, и задайте свои вопросы.</p>
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
        <span>УГОЛОВНОЕ ПРАВО</span>
        <span>Проверка · следствие · суд</span>
        <span className="hero-scroll">
          ДАЛЕЕ <ArrowDown size={12} />
        </span>
      </div>
    </section>
  )
}

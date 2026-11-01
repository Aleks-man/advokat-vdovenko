import { Link } from 'react-router-dom'
import justiceHero from '../../assets/justice-hero.webp'
import './Hero.css'
export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Адвокат по уголовным делам
        </p>
        <h1>
          Адвокат
          <br />
          <em>Константин</em>
          <br />
          <em>Вдовенко</em>
        </h1>
        <p className="hero-description">
          Занимаюсь уголовными делами.<span>Обсудим вашу ситуацию и то, чем я могу помочь.</span>
        </p>
        <div className="hero-actions">
          <Link to="/contacts" className="button">
            Связаться со мной
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
        <span>УГОЛОВНОЕ ПРАВО</span>
        <span>Проверка · следствие · суд</span>
      </div>
    </section>
  )
}

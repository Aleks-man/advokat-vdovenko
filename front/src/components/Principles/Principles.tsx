import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import './Principles.css'
export function Principles() {
  return (
    <section className="principles panel">
      <div className="container principles-inner">
        <div className="principles-label">
          <p className="eyebrow">Первый разговор</p>
          <span className="principles-monogram" aria-hidden="true">
            КВ.
          </span>
          <p>
            Документы.
            <br />
            Даты событий.
            <br />
            Ваши вопросы.
          </p>
        </div>
        <div className="principles-content">
          <h2>
            Как проходит
            <br />
            <em>знакомство с делом.</em>
          </h2>
          <p className="principles-lead">
            На первом разговоре вы рассказываете, что произошло и какая помощь нужна. Адвокат задаёт
            вопросы и объясняет, какие документы нужно изучить.
          </p>
          <div className="principles-items">
            <div>
              <span>01 / МАТЕРИАЛЫ</span>
              <h3>Какие документы есть</h3>
              <p>Повестки, постановления, судебные решения и другие материалы по вашему делу.</p>
            </div>
            <div>
              <span>02 / ОБСУЖДЕНИЕ</span>
              <h3>Что делать дальше</h3>
              <p>
                Какая помощь нужна сейчас, сколько она будет стоить и как будет проходить работа.
              </p>
            </div>
          </div>
          <Link to="/approach" className="text-link">
            Как строится работа <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

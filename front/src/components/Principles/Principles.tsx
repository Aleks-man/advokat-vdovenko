import { Link } from 'react-router-dom'
import './Principles.css'
export function Principles() {
  return (
    <section className="principles panel">
      <div className="container principles-inner">
        <div className="principles-label">
          <p className="eyebrow">Первый разговор</p>
          <img
            className="principles-monogram"
            src="/brand/vdovenko.svg"
            alt=""
            width="176"
            height="176"
          />
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
            Как я знакомлюсь
            <br />
            <em>с вашим делом.</em>
          </h2>
          <p className="principles-lead">
            Сначала я выслушаю вас и задам вопросы. Вместе разберёмся, что произошло, какая помощь
            нужна сейчас и какие документы мне стоит изучить.
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
              <p>Обсудим, какую работу я возьму на себя, её стоимость и как мы будем на связи.</p>
            </div>
          </div>
          <Link to="/approach" className="text-link">
            Как я работаю
          </Link>
        </div>
      </div>
    </section>
  )
}

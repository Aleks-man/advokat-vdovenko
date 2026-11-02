import { Link } from 'react-router-dom'
import './Principles.css'
export function Principles() {
  return (
    <section className="principles panel">
      <div className="container principles-inner">
        <div className="principles-label">
          <p className="eyebrow">Мой подход</p>
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
            Понятная работа
            <br />
            <em>по вашему делу</em>
          </h2>
          <p className="principles-lead">
            Я объясняю, что происходит с делом, какие действия предлагаю и зачем они нужны. Если
            что-то непонятно, вы можете задать мне вопрос.
          </p>
          <div className="principles-items">
            <div>
              <span>01 / МАТЕРИАЛЫ</span>
              <h3>Работа с материалами</h3>
              <p>
                Изучаю документы по делу, сопоставляю обстоятельства и уточняю то, что требует
                проверки.
              </p>
            </div>
            <div>
              <span>02 / ОБСУЖДЕНИЕ</span>
              <h3>Понятные условия</h3>
              <p>Заранее согласуем мои задачи, стоимость и порядок связи.</p>
            </div>
          </div>
          <Link to="/about#approach" className="text-link">
            Как я работаю
          </Link>
        </div>
      </div>
    </section>
  )
}

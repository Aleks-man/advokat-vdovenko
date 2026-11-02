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
        </div>
        <div className="principles-content">
          <h2>Как я работаю</h2>
          <p className="principles-lead">
            Изучаю материалы дела и объясняю, какие действия предлагаю и зачем они нужны. До начала
            работы согласуем мои задачи, стоимость и порядок связи.
          </p>
          <Link to="/about" className="text-link">
            Обо мне и моей работе
          </Link>
        </div>
      </div>
    </section>
  )
}

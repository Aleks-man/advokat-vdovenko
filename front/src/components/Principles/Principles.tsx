import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import './Principles.css'
export function Principles() {
  return (
    <section className="principles panel">
      <div className="container principles-inner">
        <div className="principles-label">
          <p className="eyebrow">Основа работы</p>
          <span className="principles-monogram" aria-hidden="true">
            КВ.
          </span>
          <p>
            Документы.
            <br />
            Хронология.
            <br />
            Объяснения участников.
          </p>
        </div>
        <div className="principles-content">
          <h2>
            Сначала факты.
            <br />
            <em>Затем выводы.</em>
          </h2>
          <p className="principles-lead">
            В начале известна лишь часть событий. Важно установить их последовательность,
            сопоставить документы с объяснениями и обозначить вопросы, на которые пока нет ответа.
          </p>
          <div className="principles-items">
            <div>
              <span>01 / МАТЕРИАЛЫ</span>
              <h3>Что подтверждено</h3>
              <p>Какие сведения есть в документах, а какие ещё предстоит проверить.</p>
            </div>
            <div>
              <span>02 / ОБСУЖДЕНИЕ</span>
              <h3>Что делать дальше</h3>
              <p>Какие действия предлагаются, с какой целью и что для них потребуется.</p>
            </div>
          </div>
          <Link to="/approach" className="text-link">
            Подробнее о подходе <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

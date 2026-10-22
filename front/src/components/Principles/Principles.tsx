import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import './Principles.css'
export function Principles() {
  return (
    <section className="principles">
      <div className="container principles-inner">
        <div className="principles-label">
          <p className="eyebrow">Отношение к делу</p>
          <span className="principles-monogram" aria-hidden="true">
            КВ.
          </span>
          <p>
            У каждого дела —<br />
            свои обстоятельства.
            <br />У каждого человека —<br />
            право быть услышанным.
          </p>
        </div>
        <div className="principles-content">
          <h2>
            За материалами дела —<br />
            <em>всегда человек.</em>
          </h2>
          <p className="principles-lead">
            Когда привычная жизнь становится неопределённой, особенно важно понимать происходящее и
            знать, какой шаг будет следующим.
          </p>
          <div className="principles-items">
            <div>
              <span>01 / ВНИМАНИЕ</span>
              <h3>Сначала — разобраться</h3>
              <p>В обстоятельствах, документах и вопросах, которые действительно важны.</p>
            </div>
            <div>
              <span>02 / ЯСНОСТЬ</span>
              <h3>Говорить понятно</h3>
              <p>Объяснять ход работы простыми словами и обсуждать возможные действия.</p>
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

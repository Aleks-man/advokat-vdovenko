import { routes } from '../../../../data/routes'
import { Link } from 'react-router-dom'
import './DocumentHelp.css'
const documentQuestions = [
  {
    title: 'Повестка',
    text: 'Уточним, куда, когда и в каком качестве вас вызывают.',
  },
  {
    title: 'Решение суда',
    text: 'Посмотрю документ и обсудим, с чем вы не согласны.',
  },
  {
    title: 'Пока нет документов',
    text: 'Расскажите, что произошло. Выясним, какие сведения нужны.',
  },
]

export function DocumentHelp() {
  return (
    <section className="container document-help" aria-labelledby="document-help-title">
      <div className="document-help-content">
        <h2 id="document-help-title">Вам пришёл документ?</h2>
        <p className="document-help-lead">
          Начнём с того, что у вас на руках. Если документов нет — с вашего рассказа.
        </p>
        <ul className="document-help-details">
          {documentQuestions.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <Link to={routes.practice.path} className="text-link">
          В каких вопросах я могу помочь
        </Link>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import './Principles.css'

// Presentation copy; confirm the description of the practice before publishing.
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

export function Principles() {
  return (
    <section className="container principles" aria-labelledby="principles-title">
      <div className="principles-content">
        <h2 id="principles-title">Вам пришёл документ?</h2>
        <p className="principles-lead">
          Начнём с того, что у вас на руках. Если документов нет — с вашего рассказа.
        </p>
        <ul className="principles-details">
          {documentQuestions.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <Link to="/practice" className="text-link">
          В каких вопросах я могу помочь
        </Link>
      </div>
    </section>
  )
}

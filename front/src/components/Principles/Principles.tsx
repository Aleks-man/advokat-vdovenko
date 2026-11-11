import { Link } from 'react-router-dom'
import './Principles.css'

// Presentation copy; confirm the description of the practice before publishing.
const documentQuestions = [
  {
    title: 'Вам вручили повестку',
    text: 'Куда и когда вызывают? В каком качестве? Что было до этого — звонок, разговор, другие документы? Я начну с этих вопросов, а не с предположений о том, чем всё закончится.',
  },
  {
    title: 'Есть постановление или решение суда',
    text: 'Расскажите, когда вы получили документ и с чем не согласны. Посмотрю сам текст, основания решения и материалы, на которые в нём ссылаются. По одному заголовку картину не собрать.',
  },
  {
    title: 'Документов нет, есть только рассказ',
    text: 'Это тоже начало. Разделим то, что вы знаете лично, что передали другие и что ещё предстоит выяснить. Не нужно заполнять пробелы догадками — лучше оставить вопросы открытыми.',
  },
]

export function Principles() {
  return (
    <section className="container principles" aria-labelledby="principles-title">
      <div className="principles-content">
        <p className="eyebrow">Разберём на примере</p>
        <h2 id="principles-title">Вам пришёл документ. Что в нём важно?</h2>
        <p className="principles-lead">
          Несколько страниц, незнакомые формулировки и дата, к которой нужно что-то сделать. Не
          всегда понятно даже то, какой вопрос задать адвокату. Начать можно с самого документа.
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

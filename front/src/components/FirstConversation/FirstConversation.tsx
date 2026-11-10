import { Link } from 'react-router-dom'
import './FirstConversation.css'

const preparationItems = [
  {
    title: 'Коротко опишите, что произошло',
    text: 'Когда началась ситуация, кого она касается и что происходит сейчас. Не нужно заранее подбирать юридические формулировки — расскажите своими словами.',
  },
  {
    title: 'Соберите то, что уже есть на руках',
    text: 'Повестки, постановления, судебные решения, переписку и другие документы, которые относятся к вашему вопросу. При записи уточним, что стоит подготовить и как это передать.',
  },
  {
    title: 'Сообщите о назначенных датах',
    text: 'Если уже назначены допрос, заседание или другое действие, скажите об этом в начале разговора. Так я смогу понять, сколько времени есть на подготовку.',
  },
]

export function FirstConversation() {
  return (
    <section
      className="container section first-conversation"
      aria-labelledby="first-conversation-title"
    >
      <div className="section-heading">
        <p className="eyebrow">02 / Перед разговором</p>
        <div>
          <h2 id="first-conversation-title">С чего начать, если нужна помощь</h2>
          <p className="section-intro">
            Не обязательно ждать, пока у вас будет полный комплект документов. Расскажите, что вам
            известно, — я задам вопросы и объясню, что нужно уточнить.
          </p>
        </div>
      </div>
      <div className="first-conversation-layout">
        <aside className="first-conversation-note">
          <h3>Если обращаетесь за близкого</h3>
          <p>
            Начните с того, что знаете сами: где он находится, кто с ним связывался и какие
            документы есть у семьи. Если часть обстоятельств пока неизвестна, так и скажите.
          </p>
          <Link to="/about#approach" className="text-link">
            Как договоримся о работе
          </Link>
        </aside>
        <ol className="first-conversation-list">
          {preparationItems.map((item, index) => (
            <li key={item.title}>
              <span className="first-conversation-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

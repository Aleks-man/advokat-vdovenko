import './FirstConversation.css'

const preparationItems = [
  {
    title: 'Расскажите о ситуации',
    text: 'Что произошло и какая помощь нужна.',
  },
  {
    title: 'Обсудим задачу',
    text: 'Какие документы изучить и что делать дальше.',
  },
  {
    title: 'Согласуем условия',
    text: 'Объём работы, стоимость и порядок связи.',
  },
]

export function FirstConversation() {
  return (
    <section
      className="container section first-conversation"
      aria-labelledby="first-conversation-title"
    >
      <div className="section-heading section-heading--simple">
        <h2 id="first-conversation-title">Как начнём работу</h2>
      </div>
      <ol className="first-conversation-list" role="list">
        {preparationItems.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
      <p className="first-conversation-note">Можно обратиться за себя или за близкого.</p>
    </section>
  )
}

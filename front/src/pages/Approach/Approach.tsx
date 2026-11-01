import { workSteps } from '../../data/site'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
import './Approach.css'
import { LegalArtwork } from '../../components/LegalArtwork/LegalArtwork'
export function Approach() {
  return (
    <>
      <section className="container page-intro legal-intro">
        <LegalArtwork kind="court" />
        <p className="eyebrow">02 / Подход к работе</p>
        <h1>
          Как мы будем
          <br />
          <em>работать</em>
        </h1>
        <p>
          До начала работы мы согласуем задачи, стоимость и порядок связи. Здесь — о том, как
          строится наше взаимодействие.
        </p>
      </section>
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Начало работы</p>
          <h2>
            Что обсудить
            <br />
            до начала работы
          </h2>
        </div>
        <div className="work-steps">
          {workSteps.map((step, index) => (
            <article key={step.title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="approach-quote panel">
        <div className="container">
          <span className="eyebrow">Вопросы по делу</span>
          <h2>
            Что известно по делу
            <br />
            <em>и что делать дальше</em>
          </h2>
          <p>
            Я изучу документы и объясню, какие действия можно предпринять и что ещё нужно выяснить.
            Если что-то осталось непонятным, спросите меня. Мне важно, чтобы вы понимали, что
            происходит с вашим делом и зачем нужен каждый следующий шаг.
          </p>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Перед обращением</p>
          <h2>Вопросы о начале работы</h2>
        </div>
        <div className="faq">
          <details>
            <summary>Что подготовить к первому разговору?</summary>
            <p>
              Запишите, что и когда произошло, и подготовьте свои вопросы. Если у вас есть документы
              по делу, скажите мне об этом при записи — я подскажу, что взять с собой.
            </p>
          </details>
          <details>
            <summary>Можно ли заранее узнать стоимость?</summary>
            <p>
              Расскажите мне о деле и о том, какая помощь нужна. Объём работы и оплату мы обсудим до
              её начала.
            </p>
          </details>
          <details>
            <summary>Как будем поддерживать связь?</summary>
            <p>
              Способ связи и порядок передачи документов согласуем в начале работы. Если появятся
              новые документы или назначат допрос либо заседание, сообщите мне об этом.
            </p>
          </details>
        </div>
      </section>
      <ContactBanner />
    </>
  )
}

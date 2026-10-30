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
          Как проходит
          <br />
          <em>работа с адвокатом.</em>
        </h1>
        <p>
          Сначала нужно разобраться в вашей ситуации. На первом разговоре вы рассказываете о деле,
          задаёте вопросы и обсуждаете, какая помощь нужна.
        </p>
      </section>
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Начало работы</p>
          <h2>
            Что обсудить
            <br />
            до начала работы.
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
            <em>и что делать дальше.</em>
          </h2>
          <p>
            После изучения документов можно обсудить возможные действия и вопросы, которые ещё нужно
            выяснить. Если объяснение непонятно, попросите рассказать подробнее: вам важно понимать,
            что происходит с вашим делом.
          </p>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Перед обращением</p>
          <h2>Подготовка к разговору.</h2>
        </div>
        <div className="faq">
          <details>
            <summary>Что подготовить к первому разговору?</summary>
            <p>
              Запишите, что и когда произошло, и подготовьте свои вопросы. Если у вас есть документы
              по делу, скажите об этом при записи — адвокат подскажет, что взять с собой.
            </p>
          </details>
          <details>
            <summary>Можно ли заранее узнать стоимость?</summary>
            <p>
              Стоимость зависит от того, какая помощь нужна. Расскажите о деле, чтобы обсудить объём
              работы и оплату до её начала.
            </p>
          </details>
          <details>
            <summary>Что указать в первом обращении?</summary>
            <p>
              Кратко расскажите, что случилось и какая помощь нужна. Если вас уже вызвали на допрос
              или назначили судебное заседание, сообщите дату. Время консультации можно согласовать
              по телефону или почте.
            </p>
          </details>
        </div>
      </section>
      <ContactBanner />
    </>
  )
}

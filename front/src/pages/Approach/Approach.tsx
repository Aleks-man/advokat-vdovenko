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
          <em>работать.</em>
        </h1>
        <p>
          На первой встрече я выслушаю вас, уточню обстоятельства и отвечу на вопросы. Затем
          обсудим, какая помощь нужна и с чего начнём.
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
            Я изучу документы и объясню, какие действия можно предпринять и что ещё нужно выяснить.
            Если что-то осталось непонятным, спросите меня. Мне важно, чтобы вы понимали, что
            происходит с вашим делом и зачем нужен каждый следующий шаг.
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
            <summary>Что указать в первом обращении?</summary>
            <p>
              Кратко расскажите, что случилось и какая помощь нужна. Если вас уже вызвали на допрос
              или назначили судебное заседание, сообщите дату. О времени консультации договоримся по
              телефону или почте.
            </p>
          </details>
        </div>
      </section>
      <ContactBanner />
    </>
  )
}

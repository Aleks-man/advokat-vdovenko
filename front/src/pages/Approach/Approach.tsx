import { workSteps } from '../../data/site'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
import './Approach.css'
export function Approach() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">02 / Подход к работе</p>
        <h1>
          Понять ситуацию.
          <br />
          <em>Выстроить защиту.</em>
        </h1>
        <p>
          Концепция подхода: внимательное изучение обстоятельств, понятный разговор и
          последовательное движение по согласованному плану.
        </p>
      </section>
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Порядок взаимодействия</p>
          <h2>
            От первого разговора
            <br />к понятным действиям.
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
      <section className="approach-quote">
        <div className="container">
          <span className="eyebrow">Принцип сайта</span>
          <h2>
            Не громкие обещания.
            <br />
            <em>Точная и вдумчивая работа.</em>
          </h2>
          <p>
            Здесь нет выдуманных побед, стажа или отзывов. Профессиональную биографию и факты о
            практике добавим после согласования с Константином.
          </p>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Перед обращением</p>
          <h2>Несколько простых вопросов.</h2>
        </div>
        <div className="faq">
          <details>
            <summary>Что подготовить к первому разговору?</summary>
            <p>
              Краткое описание ситуации, последовательность событий и список вопросов. Если
              документы уже есть, их перечень можно обсудить с адвокатом.
            </p>
          </details>
          <details>
            <summary>Можно ли заранее узнать стоимость?</summary>
            <p>
              Стоимость пока не указана. Порядок оплаты и объём работы необходимо уточнить
              непосредственно у Константина.
            </p>
          </details>
          <details>
            <summary>Можно ли обсудить дело дистанционно?</summary>
            <p>
              Формат консультаций и регион работы ещё уточняются. Подтверждённая информация появится
              на странице контактов.
            </p>
          </details>
        </div>
      </section>
      <ContactBanner />
    </>
  )
}

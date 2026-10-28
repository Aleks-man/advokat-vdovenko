import { workSteps } from '../../data/site'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
import './Approach.css'
export function Approach() {
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">02 / Подход к работе</p>
        <h1>
          Разобрать материалы.
          <br />
          <em>Определить порядок работы.</em>
        </h1>
        <p>
          Первое обсуждение нужно, чтобы установить исходные данные: что известно о деле, какие
          документы доступны и в чём требуется участие адвоката.
        </p>
      </section>
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Порядок взаимодействия</p>
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
          <span className="eyebrow">Обсуждение позиции</span>
          <h2>
            У каждого вывода
            <br />
            <em>должно быть основание.</em>
          </h2>
          <p>
            Что следует из материалов, что остаётся спорным и какие сведения могут изменить оценку.
            Эти вопросы стоит обсуждать отдельно: предположение ещё нужно проверить, а предложенное
            действие — объяснить.
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
              Запишите события по порядку, укажите даты и составьте список вопросов. Если есть
              документы, перечислите их — какие материалы передать, можно уточнить при обращении.
            </p>
          </details>
          <details>
            <summary>Можно ли заранее узнать стоимость?</summary>
            <p>
              Для обсуждения стоимости нужно обозначить задачу и предполагаемый объём участия.
              Условия оплаты уточняются у адвоката до начала работы.
            </p>
          </details>
          <details>
            <summary>Что указать в первом обращении?</summary>
            <p>
              На каком этапе находится дело, где происходят события и какой вопрос вы хотите
              обсудить. Если уже назначена дата процессуального действия или заседания, укажите её.
              Формат и время разговора согласуются отдельно.
            </p>
          </details>
        </div>
      </section>
      <ContactBanner />
    </>
  )
}

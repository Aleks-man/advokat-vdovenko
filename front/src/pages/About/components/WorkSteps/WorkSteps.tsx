import { workSteps } from '../../../../data/workSteps'

import './WorkSteps.css'

export function WorkSteps() {
  return (
    <section className="container section content-section about-work" id="approach">
      <div className="section-heading">
        <p className="eyebrow">Начало работы</p>
        <h2>
          Что обсудить
          <br />
          до начала работы
        </h2>
      </div>
      <div className="work-steps">
        {workSteps.map((step) => (
          <article key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

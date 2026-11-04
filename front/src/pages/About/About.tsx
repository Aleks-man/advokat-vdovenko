import { AccordionItem } from '../../components/AccordionItem/AccordionItem'
import { workSteps } from '../../data/workSteps'
import { faqItems } from '../../data/faq'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
import './About.css'
import { AttorneyProfile } from '../../components/AttorneyProfile/AttorneyProfile'
export function AboutPage() {
  return (
    <>
      <AttorneyProfile />
      <section className="container section about-work" id="approach">
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
      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Перед обращением</p>
          <h2>Вопросы о начале работы</h2>
        </div>
        <div className="faq">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} title={item.question}>
              <p>{item.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </section>
      <ContactBanner />
    </>
  )
}

import { Link } from 'react-router-dom'
import { SectionBackground } from '../../components/SectionBackground/SectionBackground'
import { ContactCallout } from '../../components/ContactCallout/ContactCallout'
import { practiceAreas } from '../../data/practice'
import { UsefulMaterials } from '../../components/UsefulMaterials/UsefulMaterials'
import { PageIntro } from '../../components/PageIntro/PageIntro'
import './Practice.css'

export function Practice() {
  return (
    <>
      <PageIntro
        eyebrow="Уголовная защита"
        title={
          <>
            Помощь по делу
            <br />
            <em>на разных этапах</em>
          </>
        }
      >
        Ко мне можно обратиться во время проверки, следствия, рассмотрения дела в суде или после
        вынесения решения. Расскажите, на каком этапе нужна моя помощь.
      </PageIntro>
      <nav className="container practice-stage-nav" aria-label="Этапы уголовной защиты">
        {practiceAreas.map((area) => (
          <Link key={area.number} to={`#stage-${area.number}`}>
            <span aria-hidden="true">{area.number}</span>
            {area.title}
          </Link>
        ))}
      </nav>
      <section className="container practice-stages section-with-background">
        <SectionBackground variant="practice" />
        {practiceAreas.map((area) => (
          <article className="practice-stage" id={`stage-${area.number}`} key={area.number}>
            <div className="practice-stage-content">
              <div className="practice-stage-heading">
                <span className="practice-stage-number" aria-hidden="true">
                  {area.number}
                </span>
                <h2>{area.title}</h2>
              </div>
              <div className="practice-stage-topic practice-stage-situation">
                <h3>Ваша ситуация</h3>
                <p>{area.situation}</p>
              </div>
              <div className="practice-stage-topic">
                <h3>Как я могу помочь</h3>
                <ul className="practice-services">
                  {area.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>
      <div className="container content-disclaimer">
        Конкретные задачи, объём участия и стоимость согласуем после знакомства с вашим делом.
      </div>
      <UsefulMaterials />
      <ContactCallout />
    </>
  )
}

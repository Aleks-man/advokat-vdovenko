import { practiceAreas } from '../../data/practice'
import { UsefulMaterials } from '../../components/UsefulMaterials/UsefulMaterials'
import './Practice.css'
import { PageIntro } from '../../components/PageIntro/PageIntro'
export function Practice() {
  return (
    <>
      <PageIntro
        eyebrow="01 / Уголовная защита"
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
      <section className="container practice-stages">
        {practiceAreas.map((area) => (
          <article className="practice-stage" id={`stage-${area.number}`} key={area.number}>
            <span className="eyebrow">Этап / {area.number}</span>
            <div className="practice-stage-content">
              <h2>{area.title}</h2>
              <div className="practice-stage-topic">
                <h3>С чем ко мне обращаются</h3>
                <p>{area.situation}</p>
              </div>
              <div className="practice-stage-topic">
                <h3>Что я могу сделать</h3>
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
    </>
  )
}

import { practiceAreas } from '../../data/site'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
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
            <div>
              <h2>{area.title}</h2>
              <p>{area.description}</p>
              <p>{area.detail}</p>
            </div>
          </article>
        ))}
      </section>
      <div className="container content-disclaimer">
        После знакомства с вашим делом я смогу сказать, какую работу готов взять на себя.
      </div>
      <ContactBanner />
    </>
  )
}

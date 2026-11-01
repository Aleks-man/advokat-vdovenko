import { practiceAreas } from '../../data/site'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
import './Practice.css'
import { LegalArtwork } from '../../components/LegalArtwork/LegalArtwork'
export function Practice() {
  return (
    <>
      <section className="page-intro container legal-intro">
        <LegalArtwork kind="scales" />
        <p className="eyebrow">01 / Уголовная защита</p>
        <h1>
          Помощь по делу
          <br />
          <em>на разных этапах.</em>
        </h1>
        <p>
          Ко мне можно обратиться во время проверки, следствия, рассмотрения дела в суде или после
          вынесения решения. Расскажите, на каком этапе нужна моя помощь.
        </p>
      </section>
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

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
          Проверка, следствие, суд или обжалование решения — ниже описано, с какими вопросами можно
          обратиться на каждом из этих этапов.
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
        Какую работу адвокат сможет взять на себя, можно обсудить после знакомства с вашим делом.
      </div>
      <ContactBanner />
    </>
  )
}

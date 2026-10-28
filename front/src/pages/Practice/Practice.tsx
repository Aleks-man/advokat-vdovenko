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
          Работа по делу.
          <br />
          <em>От проверки до решения суда.</em>
        </h1>
        <p>
          На каждом этапе меняются материалы и вопросы к ним. Здесь — ориентиры для первого
          обращения: что уже произошло и какую работу предстоит обсудить.
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
        Возможность участия в конкретном деле и объём поручения обсуждаются с адвокатом лично.
      </div>
      <ContactBanner />
    </>
  )
}

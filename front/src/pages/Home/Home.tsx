import { Hero } from '../../components/Hero/Hero'
import { PracticeList } from '../../components/PracticeList/PracticeList'
import { Principles } from '../../components/Principles/Principles'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
export function Home() {
  return (
    <>
      <Hero />
      <section className="section container" id="practice">
        <div className="section-heading">
          <p className="eyebrow">01 / Направления защиты</p>
          <div>
            <h2>
              Уголовное дело.
              <br />
              Внимание к каждому этапу.
            </h2>
            <p className="section-intro">
              От первого вопроса до обсуждения дальнейших действий. Возможный объём участия
              определяется обстоятельствами дела.
            </p>
          </div>
        </div>
        <PracticeList />
      </section>
      <Principles />
      <ContactBanner />
    </>
  )
}

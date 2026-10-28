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
              На каком этапе
              <br />
              нужна защита.
            </h2>
            <p className="section-intro">
              Проверка ещё не завершена, идёт следствие или уже вынесено решение — для разговора с
              адвокатом важно обозначить, что происходит сейчас.
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

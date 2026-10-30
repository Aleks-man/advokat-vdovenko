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
          <p className="eyebrow">01 / Когда обращаться</p>
          <div>
            <h2>
              С чем можно
              <br />
              обратиться.
            </h2>
            <p className="section-intro">
              К адвокату можно обратиться, когда вас вызывают на допрос, дело передано в суд или вы
              хотите обсудить уже вынесенное решение.
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

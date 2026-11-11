import { Hero } from '../../components/Hero/Hero'
import { PracticeList } from '../../components/PracticeList/PracticeList'
import { Principles } from '../../components/Principles/Principles'
import { DeskBackground } from '../../components/DeskBackground/DeskBackground'
import { FirstConversation } from '../../components/FirstConversation/FirstConversation'
import { MaterialsPreview } from '../../components/MaterialsPreview/MaterialsPreview'
import './Home.css'

export function Home() {
  return (
    <>
      <Hero />
      <section className="section container home-practice" id="practice">
        <DeskBackground variant="section" />
        <div className="section-heading">
          <p className="eyebrow">01 / Когда обращаться</p>
          <div>
            <h2>
              С чем можно
              <br />
              обратиться
            </h2>
            <p className="section-intro">
              Обратитесь ко мне, если вас вызывают на допрос, дело передано в суд или вы хотите
              обсудить уже вынесенное решение.
            </p>
          </div>
        </div>
        <PracticeList />
      </section>
      <Principles />
      <FirstConversation />
      <MaterialsPreview />
    </>
  )
}

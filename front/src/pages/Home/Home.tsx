import { Hero } from './components/Hero/Hero'
import { PracticeList } from '../../components/PracticeList/PracticeList'
import { DocumentHelp } from './components/DocumentHelp/DocumentHelp'
import { FirstConversation } from './components/FirstConversation/FirstConversation'

import { ContactCallout } from '../../components/ContactCallout/ContactCallout'
import './Home.css'

export function Home() {
  return (
    <>
      <Hero />
      <section className="section container home-practice" id="practice">
        <div className="section-heading section-heading--simple">
          <div>
            <h2>С чем можно обратиться</h2>
            <p className="section-intro">
              Обратитесь ко мне, если вас вызывают на допрос, дело передано в суд или вы хотите
              обсудить уже вынесенное решение.
            </p>
          </div>
        </div>
        <PracticeList />
      </section>
      <DocumentHelp />
      <FirstConversation />

      <ContactCallout />
    </>
  )
}

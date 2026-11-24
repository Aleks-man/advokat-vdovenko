import { WorkSteps } from './components/WorkSteps/WorkSteps'
import { FaqSection } from './components/FaqSection/FaqSection'
import { ContactCallout } from '../../components/ContactCallout/ContactCallout'
import { AttorneyProfile } from './components/AttorneyProfile/AttorneyProfile'
import './About.css'

export function AboutPage() {
  return (
    <>
      <AttorneyProfile />
      <div className="about-atmosphere">
        <WorkSteps />
        <FaqSection />
      </div>
      <ContactCallout />
    </>
  )
}

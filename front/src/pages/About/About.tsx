import { WorkSteps } from './components/WorkSteps/WorkSteps'
import { FaqSection } from './components/FaqSection/FaqSection'
import { ContactCallout } from '../../components/ContactCallout/ContactCallout'
import { AttorneyProfile } from '../../components/AttorneyProfile/AttorneyProfile'
export function AboutPage() {
  return (
    <>
      <AttorneyProfile />
      <WorkSteps />
      <FaqSection />
      <ContactCallout />
    </>
  )
}

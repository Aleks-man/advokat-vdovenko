import { ContactDetails } from './components/ContactDetails/ContactDetails'
import { ContactAside } from './components/ContactAside/ContactAside'
import { SectionBackground } from '../../components/SectionBackground/SectionBackground'
import './Contacts.css'
import { PageIntro } from '../../components/PageIntro/PageIntro'
export function Contacts() {
  return (
    <>
      <PageIntro
        compact
        eyebrow="Контакты"
        title={
          <>
            Связаться <em>со мной</em>
          </>
        }
      >
        Свяжитесь со мной, чтобы задать вопрос или выбрать время консультации.
      </PageIntro>
      <section className="container section contacts-layout section-with-background">
        <SectionBackground variant="contacts" />
        <ContactDetails />
        <ContactAside />
      </section>
    </>
  )
}

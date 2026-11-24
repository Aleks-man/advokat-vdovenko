import { PracticeStageNav } from './components/PracticeStageNav/PracticeStageNav'
import { PracticeStage } from './components/PracticeStage/PracticeStage'
import { ContactCallout } from '../../components/ContactCallout/ContactCallout'
import { practiceAreas } from '../../data/practice'
import { UsefulMaterials } from './components/UsefulMaterials/UsefulMaterials'
import { PageIntro } from '../../components/PageIntro/PageIntro'
import { SectionBackground } from '../../components/SectionBackground/SectionBackground'
import './Practice.css'

const stageGroups = [practiceAreas.slice(0, 1), practiceAreas.slice(1, 3), practiceAreas.slice(3)]

export function Practice() {
  return (
    <>
      <div className="practice-opening">
        <PageIntro
          background="practice"
          eyebrow="Уголовная защита"
          title={
            <>
              Помощь по делу
              <br />
              <em>на разных этапах</em>
            </>
          }
        >
          Ко мне можно обратиться во время проверки, следствия, рассмотрения дела в суде или после
          вынесения решения. Расскажите, на каком этапе нужна моя помощь.
        </PageIntro>
        <PracticeStageNav />
      </div>
      <section className="container content-section practice-stages">
        {stageGroups.map((group) => (
          <div
            key={group.map((area) => area.id).join('-')}
            className={
              group.length === 2 ? 'practice-case-stages section-with-background' : undefined
            }
          >
            {group.length === 2 && <SectionBackground variant="courtroom" />}
            {group.map((area) => (
              <PracticeStage key={area.id} area={area} />
            ))}
          </div>
        ))}
      </section>
      <div className="container content-section content-disclaimer">
        Конкретные задачи, объём участия и стоимость согласуем после знакомства с вашим делом.
      </div>
      <UsefulMaterials />
      <ContactCallout />
    </>
  )
}

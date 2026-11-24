import { PracticeStageNav } from './components/PracticeStageNav/PracticeStageNav'
import { PracticeStage } from './components/PracticeStage/PracticeStage'
import { ContactCallout } from '../../components/ContactCallout/ContactCallout'
import { practiceAreas } from '../../data/practice'
import { UsefulMaterials } from './components/UsefulMaterials/UsefulMaterials'
import { PageIntro } from '../../components/PageIntro/PageIntro'
import './Practice.css'

export function Practice() {
  return (
    <>
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
      <section className="container content-section practice-stages">
        {practiceAreas.map((area) => (
          <PracticeStage key={area.id} area={area} />
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

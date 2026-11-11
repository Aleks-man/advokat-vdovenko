import { AccordionItem } from '../AccordionItem/AccordionItem'
import { usefulMaterials } from '../../data/usefulMaterials'
import './UsefulMaterials.css'

export function UsefulMaterials() {
  return (
    <section className="container useful-materials" aria-labelledby="useful-materials-heading">
      <div className="section-heading">
        <p className="eyebrow">Перед обращением</p>
        <div>
          <h2 id="useful-materials-heading">Полезные заметки</h2>
          <p className="section-intro">
            Несколько подсказок, чтобы подготовиться к разговору со мной.
          </p>
        </div>
      </div>
      <div className="useful-materials-list">
        {usefulMaterials.map((material) => (
          <div key={material.id} id={`material-${material.id}`}>
            <AccordionItem title={material.title}>
              <p>{material.intro}</p>
              <ul className="useful-materials-points">
                {material.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p>{material.closing}</p>
            </AccordionItem>
          </div>
        ))}
      </div>
    </section>
  )
}

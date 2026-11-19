import { SectionBackground } from '../../../../components/SectionBackground/SectionBackground'
import type { PracticeArea } from '../../../../data/practice'

import './PracticeStage.css'

export function PracticeStage({ area }: { area: PracticeArea }) {
  return (
    <article
      className={'practice-stage' + (area.number === '03' ? ' section-with-background' : '')}
      id={'stage-' + area.number}
    >
      {area.number === '03' && <SectionBackground variant="case-file" />}
      <div className="practice-stage-content">
        <div className="practice-stage-heading">
          <span className="practice-stage-number" aria-hidden="true">
            {Number(area.number)}
          </span>
          <h2>{area.title}</h2>
        </div>
        <div className="practice-stage-topic practice-stage-situation">
          <h3>Ваша ситуация</h3>
          <p>{area.situation}</p>
        </div>
        <div className="practice-stage-topic">
          <h3>Как я могу помочь</h3>
          <ul className="practice-services">
            {area.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

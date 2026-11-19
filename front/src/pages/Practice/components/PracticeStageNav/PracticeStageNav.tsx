import { Link } from 'react-router-dom'
import { practiceAreas } from '../../../../data/practice'

import './PracticeStageNav.css'

export function PracticeStageNav() {
  return (
    <nav
      className="container content-section practice-stage-nav"
      aria-label="Этапы уголовной защиты"
    >
      {practiceAreas.map((area) => (
        <Link key={area.id} to={`#${area.anchorId}`}>
          <span aria-hidden="true">{Number(area.number)}</span>
          {area.title}
        </Link>
      ))}
    </nav>
  )
}

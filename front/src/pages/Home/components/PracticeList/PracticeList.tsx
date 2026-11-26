import { routes } from '@/data/routes'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { practiceAreas } from '@/data/practice'
import './PracticeList.css'

export function PracticeList() {
  return (
    <div className="practice-list">
      {practiceAreas.map((area, index) => {
        return (
          <Link
            to={`${routes.practice.path}#${area.anchorId}`}
            className="practice-row"
            key={area.id}
          >
            <span className="practice-number" aria-hidden="true">
              {index + 1}
            </span>
            <h3>{area.title}</h3>
            <p>{area.description}</p>
            <span className="practice-arrow" aria-hidden="true">
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </span>
          </Link>
        )
      })}
    </div>
  )
}

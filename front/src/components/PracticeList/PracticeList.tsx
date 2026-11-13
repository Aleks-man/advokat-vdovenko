import { ArrowUpRight, FileSearch, MessagesSquare, Landmark, FileCheck2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { practiceAreas } from '../../data/practice'
import './PracticeList.css'

const stageIcons = [FileSearch, MessagesSquare, Landmark, FileCheck2]

export function PracticeList() {
  return (
    <div className="practice-list">
      {practiceAreas.map((area, index) => {
        const Icon = stageIcons[index] ?? FileSearch
        return (
          <Link to={`/practice#stage-${area.number}`} className="practice-row" key={area.number}>
            <span className="practice-icon" aria-hidden="true">
              <Icon size={24} strokeWidth={1.5} />
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

import {
  ArrowUpRight,
  FileSearch,
  MessagesSquare,
  Landmark,
  FileCheck2,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { practiceAreas, type PracticeArea } from '../../data/practice'
import './PracticeList.css'

const stageIcons = {
  'pre-investigation': FileSearch,
  investigation: MessagesSquare,
  trial: Landmark,
  appeal: FileCheck2,
} satisfies Record<PracticeArea['id'], LucideIcon>

export function PracticeList() {
  return (
    <div className="practice-list">
      {practiceAreas.map((area) => {
        const Icon = stageIcons[area.id]
        return (
          <Link to={`/practice#${area.anchorId}`} className="practice-row" key={area.id}>
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

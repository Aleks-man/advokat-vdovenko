import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { practiceAreas } from '../../data/site'
import './PracticeList.css'
export function PracticeList() {
  return <div className="practice-list">{practiceAreas.map(area => <Link to={`/practice#stage-${area.number}`} className="practice-row" key={area.number}><span className="practice-number">{area.number}</span><h3>{area.title}</h3><p>{area.description}</p><span className="practice-arrow"><ArrowUpRight size={20}/></span></Link>)}</div>
}

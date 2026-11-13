import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usefulMaterials } from '../../data/usefulMaterials'
import './MaterialsPreview.css'

export function MaterialsPreview() {
  return (
    <nav className="materials-preview" aria-label="Подготовка к обращению">
      <p className="materials-preview-label">Полезно перед разговором</p>
      <div className="materials-preview-list">
        {usefulMaterials.map((material) => (
          <Link
            key={material.id}
            to={`/practice#material-${material.id}`}
            className="materials-preview-link"
          >
            {material.previewTitle}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </nav>
  )
}

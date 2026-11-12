import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usefulMaterials } from '../../data/usefulMaterials'
import './MaterialsPreview.css'

export function MaterialsPreview() {
  return (
    <section className="container materials-preview" aria-labelledby="materials-preview-title">
      <div className="section-heading section-heading--simple">
        <h2 id="materials-preview-title">Перед первым обращением</h2>
      </div>
      <div className="materials-preview-list">
        {usefulMaterials.map((material) => (
          <Link
            key={material.id}
            to={`/practice#material-${material.id}`}
            className="materials-preview-link"
          >
            <h3>{material.previewTitle}</h3>
            <p>{material.previewText}</p>
            <ArrowUpRight className="materials-preview-arrow" size={20} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  )
}

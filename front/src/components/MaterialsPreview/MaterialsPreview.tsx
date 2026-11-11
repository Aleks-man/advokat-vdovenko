import { Link } from 'react-router-dom'
import { usefulMaterials } from '../../data/usefulMaterials'
import './MaterialsPreview.css'

export function MaterialsPreview() {
  return (
    <section className="container materials-preview" aria-labelledby="materials-preview-title">
      <div className="section-heading">
        <p className="eyebrow">Полезное</p>
        <div>
          <h2 id="materials-preview-title">Можно прочитать заранее</h2>
          <p className="section-intro">Короткие заметки о первом обращении и общении со мной.</p>
        </div>
      </div>
      <div className="materials-preview-list">
        {usefulMaterials.map((material) => (
          <Link
            key={material.id}
            to={`/practice#material-${material.id}`}
            className="materials-preview-link"
          >
            <h3>{material.title}</h3>
            <p>{material.intro}</p>
            <span className="materials-preview-action">Читать заметку</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

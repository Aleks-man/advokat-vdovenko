import { about } from '../../data/about'
import './AttorneyProfile.css'

export function AttorneyProfile() {
  return (
    <section className="about panel intro-surface" id="about" aria-labelledby="about-heading">
      <div className="container about-inner">
        <div className="about-heading">
          <p className="eyebrow">02 / Обо мне</p>
          <h1 id="about-heading">{about.name}</h1>
          <p className="about-profession">{about.profession}</p>
        </div>
        <div className="about-portrait">
          <img
            src={about.portrait.src}
            alt={about.portrait.alt}
            width="800"
            height="1000"
            decoding="async"
          />
        </div>
        <div className="about-content">
          <div className="about-biography">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="about-facts">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'
import './PageIntro.css'

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  children: ReactNode
  compact?: boolean
}

export function PageIntro({ eyebrow, title, children, compact = false }: PageIntroProps) {
  return (
    <section
      className={`container page-intro page-intro-panel${compact ? ' page-intro-panel--compact' : ''}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  )
}

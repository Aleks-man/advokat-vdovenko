import type { ReactNode } from 'react'
import './PageIntro.css'

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  children: ReactNode
}

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="container page-intro page-intro-panel">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  )
}

import type { ReactNode } from 'react'
import { SectionBackground } from '../SectionBackground/SectionBackground'
import './PageIntro.css'

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  children: ReactNode
  compact?: boolean
  background?: 'practice'
}

export function PageIntro({
  eyebrow,
  title,
  children,
  compact = false,
  background,
}: PageIntroProps) {
  return (
    <section
      className={`container page-intro page-intro-panel intro-surface${compact ? ' page-intro-panel--compact' : ''}${background ? ' section-with-background page-intro-panel--illustrated' : ''}`}
    >
      {background && <SectionBackground variant={background} />}
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  )
}

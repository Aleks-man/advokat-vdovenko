import type { ReactNode } from 'react'
import justice from '@/assets/justice-hero.webp'
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
      className={`container page-intro page-intro-panel intro-surface${compact ? ' page-intro-panel--compact' : ''}${background ? ' page-intro-panel--illustrated' : ''}`}
    >
      {background && (
        <div className="page-intro-art" aria-hidden="true">
          <img src={justice} alt="" width={1122} height={1402} fetchPriority="high" />
        </div>
      )}
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  )
}

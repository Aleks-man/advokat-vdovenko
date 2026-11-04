import './DeskBackground.css'

type DeskBackgroundProps = {
  variant?: 'page' | 'contacts' | 'section'
}

export function DeskBackground({ variant = 'page' }: DeskBackgroundProps) {
  return <div className={`desk-background desk-background--${variant}`} aria-hidden="true" />
}

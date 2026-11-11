import './DeskBackground.css'

type DeskBackgroundProps = {
  variant: 'practice' | 'contacts' | 'about'
}

export function DeskBackground({ variant }: DeskBackgroundProps) {
  return <div className={`desk-background desk-background--${variant}`} aria-hidden="true" />
}

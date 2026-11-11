import './SectionBackground.css'

type SectionBackgroundProps = {
  variant: 'practice' | 'contacts' | 'about'
}

export function SectionBackground({ variant }: SectionBackgroundProps) {
  return <div className={`section-background section-background--${variant}`} aria-hidden="true" />
}

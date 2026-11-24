import './SectionBackground.css'

type SectionBackgroundProps = {
  variant: 'contacts' | 'case-file'
}

export function SectionBackground({ variant }: SectionBackgroundProps) {
  return <div className={`section-background section-background--${variant}`} aria-hidden="true" />
}

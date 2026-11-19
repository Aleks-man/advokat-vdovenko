import './SectionBackground.css'

type SectionBackgroundProps = {
  variant: 'contacts' | 'about' | 'case-file'
}

export function SectionBackground({ variant }: SectionBackgroundProps) {
  return <div className={`section-background section-background--${variant}`} aria-hidden="true" />
}

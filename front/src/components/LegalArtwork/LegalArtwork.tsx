import { Landmark, Scale, ScrollText } from 'lucide-react'
import './LegalArtwork.css'

const symbols = { scales: Scale, court: Landmark, document: ScrollText }

export function LegalArtwork({ kind }: { kind: keyof typeof symbols }) {
  const Symbol = symbols[kind]
  return (
    <div className={`legal-artwork legal-artwork--${kind}`} aria-hidden="true">
      <span className="legal-artwork-ring" />
      <Symbol strokeWidth={0.65} />
      <span className="legal-artwork-rule" />
    </div>
  )
}

import { useId, useState, type ReactNode } from 'react'
import './AccordionItem.css'

type AccordionItemProps = {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const triggerId = `${id}-trigger`
  const panelId = `${id}-panel`

  return (
    <div className="accordion-item" data-open={open}>
      <h3 className="accordion-heading">
        <button
          id={triggerId}
          type="button"
          className="accordion-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="accordion-arrow" aria-hidden="true">
            ▶
          </span>
          {title}
        </button>
      </h3>
      <div
        id={panelId}
        className="accordion-panel"
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="accordion-content">
          <div className="accordion-copy">{children}</div>
        </div>
      </div>
    </div>
  )
}

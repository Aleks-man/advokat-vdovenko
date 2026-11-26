import { AccordionItem } from '@/components/AccordionItem/AccordionItem'
import { faqItems } from '@/data/faq'

import './FaqSection.css'

export function FaqSection() {
  return (
    <section className="container section content-section">
      <div className="section-heading">
        <p className="eyebrow">Перед обращением</p>
        <h2>Вопросы о начале работы</h2>
      </div>
      <div className="faq">
        {faqItems.map((item) => (
          <AccordionItem key={item.question} title={item.question}>
            <p>{item.answer}</p>
          </AccordionItem>
        ))}
      </div>
    </section>
  )
}

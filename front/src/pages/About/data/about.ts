import { attorney } from '@/data/attorney'

export const about = {
  paragraphs: [
    `Юридическое образование получил в ${attorney.educationYear} году. ${attorney.practiceSince} занимаюсь уголовными делами: участвую в защите на стадии следствия, работаю в суде и готовлю жалобы на судебные решения.`,
    `Веду частную практику в ${attorney.region.inText}. Беру на себя работу по делу лично — от изучения первых документов до участия в судебных заседаниях. Возможность выезда в другой регион обсуждаю отдельно.`,
  ],
  facts: [
    { label: 'Практика', value: attorney.practiceSince },
    { label: 'Регион работы', value: attorney.region.label },
    { label: 'Образование', value: 'Высшее юридическое' },
  ],
}

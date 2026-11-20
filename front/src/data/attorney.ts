import portrait from '../assets/about-portrait.webp'

const practiceStartYear = 2014

export const attorney = {
  name: 'Константин Вдовенко',
  profession: 'Адвокат по уголовным делам',
  educationYear: 2012,
  practiceSince: `С ${practiceStartYear} года`,
  region: {
    label: 'Симферополь, Крым',
    inText: 'Симферополе и Республике Крым',
  },
  portrait: { src: portrait, alt: 'Деловой портрет' },
}

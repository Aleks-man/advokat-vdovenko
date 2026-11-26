import { attorney } from '@/data/attorney'

export const routes = {
  home: { path: '/', label: 'Главная', title: attorney.profession },
  practice: { path: '/practice', label: 'Уголовная защита', title: 'Уголовная защита' },
  about: { path: '/about', label: 'Обо мне', title: 'Обо мне' },
  contacts: { path: '/contacts', label: 'Контакты', title: 'Контакты' },
} as const

export const navigation = Object.values(routes)

export const legacyRoutes = {
  approach: '/approach',
} as const

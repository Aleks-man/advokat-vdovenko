import { attorney } from '../data/attorney'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const titles: Record<string, string> = {
  '/': attorney.profession,
  '/practice': 'Уголовная защита',
  '/about': 'Обо мне',
  '/contacts': 'Контакты',
}
export function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = `${titles[pathname] ?? 'Страница не найдена'} · ${attorney.name}`
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])
  return null
}

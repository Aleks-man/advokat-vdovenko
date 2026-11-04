import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'
const titles: Record<string, string> = {
  '/': 'Адвокат по уголовным делам',
  '/practice': 'Уголовная защита',
  '/about': 'Обо мне',
  '/contacts': 'Контакты',
}
export function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = `${titles[pathname] ?? 'Страница не найдена'} · ${site.name}`
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])
  return null
}

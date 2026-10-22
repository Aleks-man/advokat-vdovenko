import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const titles: Record<string, string> = {
  '/': 'Адвокат по уголовным делам',
  '/practice': 'Уголовная защита',
  '/approach': 'Подход к работе',
  '/contacts': 'Контакты',
}
export function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = `${titles[pathname] ?? 'Страница не найдена'} · Константин Вдовенко`
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])
  return null
}

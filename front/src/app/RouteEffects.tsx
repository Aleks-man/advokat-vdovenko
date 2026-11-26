import { routes } from '@/data/routes'
import { attorney } from '@/data/attorney'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const route = Object.values(routes).find((route) => route.path === pathname)
    document.title = `${route?.title ?? 'Страница не найдена'} · ${attorney.name}`
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])
  return null
}

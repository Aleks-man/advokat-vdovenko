import { useLayoutEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation } from '../../data/site'
import './Header.css'
export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigationRef = useRef<HTMLElement>(null)
  const [indicator, setIndicator] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)

  useLayoutEffect(() => {
    const nav = navigationRef.current
    if (!nav) return
    let disposed = false
    const measure = () => {
      if (disposed) return
      const active = nav.querySelector<HTMLAnchorElement>('a[aria-current="page"]')
      if (!active || nav.getClientRects().length === 0) {
        setIndicator(null)
        return
      }
      const next = {
        x: active.offsetLeft,
        y: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
      }
      setIndicator((current) =>
        current &&
        Object.keys(next).every(
          (key) => current[key as keyof typeof next] === next[key as keyof typeof next],
        )
          ? current
          : next,
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    nav.querySelectorAll('a').forEach((link) => observer.observe(link))
    void document.fonts.ready.then(measure)
    return () => {
      disposed = true
      observer.disconnect()
    }
  }, [pathname, open])
  return (
    <header className="header container">
      <Link
        to="/"
        className="brand"
        aria-label="Константин Вдовенко — главная"
        onClick={() => setOpen(false)}
      >
        <img className="brand-mark" src="/brand/vdovenko.svg" alt="" width="68" height="68" />
        <span className="brand-name">
          <span>Константин</span>
          <strong>Вдовенко</strong>
          <small>АДВОКАТ · УГОЛОВНЫЕ ДЕЛА</small>
        </span>
      </Link>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        ref={navigationRef}
        id="main-navigation"
        className={`navigation ${open ? 'is-open' : ''}`}
        aria-label="Основная навигация"
      >
        {indicator && (
          <span
            className="navigation-indicator"
            aria-hidden="true"
            style={{
              transform: `translate(${indicator.x}px, ${indicator.y}px)`,
              width: indicator.width,
              height: indicator.height,
            }}
          />
        )}
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} end onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link className="header-contact" to="/contacts">
        Связаться <ArrowUpRight size={15} />
      </Link>
    </header>
  )
}

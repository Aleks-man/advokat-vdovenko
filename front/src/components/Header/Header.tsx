import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation } from '../../data/site'
import './Header.css'
export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  return (
    <header className="header container">
      <Link
        to="/"
        className="brand"
        aria-label="Константин Вдовенко — главная"
        onClick={() => setOpen(false)}
      >
        <span className="brand-mark">
          КВ<span>·</span>
        </span>
        <span className="brand-name">
          Константин Вдовенко<small>АДВОКАТ · УГОЛОВНЫЕ ДЕЛА</small>
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
        id="main-navigation"
        className={`navigation ${open ? 'is-open' : ''}`}
        aria-label="Основная навигация"
        key={pathname}
      >
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

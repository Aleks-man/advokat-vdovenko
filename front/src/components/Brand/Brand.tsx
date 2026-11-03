import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { site } from '../../data/site'
import './Brand.css'

type BrandProps = {
  className?: string
  onClick?: () => void
  children?: ReactNode
}

export function Brand({ className = '', onClick, children }: BrandProps) {
  const [firstName, ...lastName] = site.name.split(' ')
  return (
    <Link
      to="/"
      className={`brand ${className}`}
      aria-label={`${site.name} — главная`}
      onClick={onClick}
    >
      <img className="brand-mark" src="/brand/vdovenko.svg" alt="" width="68" height="68" />
      <span className="brand-name">
        <span>{firstName}</span>
        <strong>{lastName.join(' ')}</strong>
        <small>{site.brandTagline}</small>
      </span>
      {children}
    </Link>
  )
}

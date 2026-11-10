import { useEffect, useState } from 'react'

export function useCompactHeader() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const update = () => {
      setCompact((current) => (current ? window.scrollY > 24 : window.scrollY > 80))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return compact
}

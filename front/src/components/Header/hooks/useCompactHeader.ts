import { useEffect, useState } from 'react'

export function useCompactHeader() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const compactViewport = window.matchMedia('(max-width: 1024px)')
    const update = () => {
      setCompact(
        (current) =>
          compactViewport.matches && (current ? window.scrollY > 24 : window.scrollY > 80),
      )
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    compactViewport.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', update)
      compactViewport.removeEventListener('change', update)
    }
  }, [])
  return compact
}

import { useEffect, useRef, useState } from 'react'

export function useMobileMenu() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return
      if (
        navigationRef.current?.contains(event.target) ||
        buttonRef.current?.contains(event.target)
      )
        return
      setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
      buttonRef.current?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 720px)')
    const onChange = () => {
      if (!mobile.matches) setOpen(false)
    }
    mobile.addEventListener('change', onChange)
    return () => mobile.removeEventListener('change', onChange)
  }, [])

  return {
    open,
    buttonRef,
    navigationRef,
    close: () => setOpen(false),
    toggle: () => setOpen((current) => !current),
  }
}

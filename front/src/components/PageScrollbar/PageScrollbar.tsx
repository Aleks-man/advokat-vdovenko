import { useEffect, useRef } from 'react'
import './PageScrollbar.css'

export function PageScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const root = document.documentElement
    let timer = 0
    let frame = 0
    let dragging = false
    let dragOffset = 0
    let thumbHeight = 0
    let maxScroll = 0
    let travel = 0
    let trackTop = 0
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')

    const reveal = () => {
      track.dataset.visible = 'true'
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (!dragging) track.dataset.visible = 'false'
      }, 1100)
    }
    const update = () => {
      const height = window.innerHeight
      maxScroll = Math.max(0, root.scrollHeight - height)
      trackTop = Math.max(12, (header?.getBoundingClientRect().bottom ?? 0) + 12)
      const trackBottom = Math.min(
        height - 12,
        (footer?.getBoundingClientRect().top ?? height) - 12,
      )
      const trackHeight = Math.max(0, trackBottom - trackTop)
      thumbHeight = Math.min(
        trackHeight,
        Math.max(32, Math.min(104, (trackHeight * height) / root.scrollHeight)),
      )
      track.style.top = `${trackTop}px`
      track.style.height = `${trackHeight}px`
      travel = trackHeight - thumbHeight
      const progress = maxScroll ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0
      track.hidden = maxScroll === 0
      track.style.setProperty('--thumb-height', `${thumbHeight}px`)
      track.style.setProperty('--thumb-top', `${progress * travel}px`)
      track.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
      frame = 0
    }
    const onScroll = () => {
      reveal()
      if (!frame) frame = requestAnimationFrame(update)
    }
    const scrollToPointer = (clientY: number) => {
      if (travel > 0)
        window.scrollTo({
          top: ((clientY - trackTop - dragOffset) / travel) * maxScroll,
          behavior: 'instant',
        })
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      event.preventDefault()
      update()
      dragging = true
      reveal()
      const top = trackTop + (maxScroll ? (window.scrollY / maxScroll) * travel : 0)
      dragOffset =
        event.clientY >= top && event.clientY <= top + thumbHeight
          ? event.clientY - top
          : thumbHeight / 2
      track.setPointerCapture(event.pointerId)
      track.focus({ preventScroll: true })
      scrollToPointer(event.clientY)
    }
    const onPointerMove = (event: PointerEvent) => {
      if (dragging) scrollToPointer(event.clientY)
    }
    const onPointerUp = () => {
      dragging = false
      reveal()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const steps: Record<string, number> = {
        ArrowDown: 40,
        ArrowUp: -40,
        PageDown: window.innerHeight * 0.9,
        PageUp: -window.innerHeight * 0.9,
        Home: -root.scrollHeight,
        End: root.scrollHeight,
      }
      if (!(event.key in steps)) return
      event.preventDefault()
      window.scrollBy({ top: steps[event.key], behavior: 'instant' })
      reveal()
    }
    update()
    root.classList.add('overlay-scrollbar-enabled')
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    if (header) observer.observe(header)
    if (footer) observer.observe(footer)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('lostpointercapture', onPointerUp)
    track.addEventListener('keydown', onKeyDown)
    return () => {
      root.classList.remove('overlay-scrollbar-enabled')
      observer.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('lostpointercapture', onPointerUp)
      track.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div
      ref={trackRef}
      className="page-scrollbar"
      role="scrollbar"
      aria-label="Прокрутка страницы"
      aria-controls="main-content"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      tabIndex={0}
    >
      <div className="page-scrollbar-thumb" />
    </div>
  )
}

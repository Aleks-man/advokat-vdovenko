import { usePageScrollbar } from './hooks/usePageScrollbar'
import './PageScrollbar.css'

export function PageScrollbar() {
  const trackRef = usePageScrollbar()

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

type ScrollbarMeasurements = {
  viewportHeight: number
  pageHeight: number
  scrollY: number
  headerBottom: number
  footerTop: number
}

export function calculateScrollbarGeometry({
  viewportHeight,
  pageHeight,
  scrollY,
  headerBottom,
  footerTop,
}: ScrollbarMeasurements) {
  const maxScroll = Math.max(0, pageHeight - viewportHeight)
  const trackTop = Math.max(12, headerBottom + 12)
  const trackBottom = Math.min(viewportHeight - 12, footerTop - 12)
  const trackHeight = Math.max(0, trackBottom - trackTop)
  const thumbHeight = Math.min(
    trackHeight,
    Math.max(32, Math.min(104, (trackHeight * viewportHeight) / pageHeight)),
  )
  const travel = trackHeight - thumbHeight
  const progress = maxScroll ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0

  return { maxScroll, trackTop, trackHeight, thumbHeight, travel, progress }
}

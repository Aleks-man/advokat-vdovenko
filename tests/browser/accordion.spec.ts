import { test, expect, type Locator } from '@playwright/test'

// Observe and sample the transition in the same browser call as the toggle.
// This avoids missing a short animation between separate driver round trips.
async function toggleAndSampleTransition(panel: Locator) {
  return panel.evaluate((element) => {
    const trigger = document.getElementById(element.getAttribute('aria-labelledby')!)!
    // Commit the starting layout before React changes the expanded state.
    getComputedStyle(element).gridTemplateRows

    return new Promise<{ height: number; fullHeight: number }>((resolve, reject) => {
      const cleanup = () => {
        window.clearTimeout(timer)
        element.removeEventListener('transitionrun', onTransition)
      }
      const onTransition = (event: Event) => {
        const transition = event as TransitionEvent
        if (transition.target !== element || transition.propertyName !== 'grid-template-rows')
          return
        cleanup()
        const animations = element.getAnimations()
        for (const animation of animations) {
          animation.pause()
          animation.currentTime = Number(animation.effect!.getTiming().duration) * 0.25
        }
        const height = element.getBoundingClientRect().height
        const fullHeight = element.querySelector('.accordion-copy')!.getBoundingClientRect().height
        for (const animation of animations) animation.finish()
        resolve({ height, fullHeight })
      }
      const timer = window.setTimeout(() => {
        cleanup()
        reject(new Error('Expected an accordion height transition to start'))
      }, 5000)
      element.addEventListener('transitionrun', onTransition)
      trigger.click()
    })
  })
}

test('FAQ animates both directions and supports keyboard and rapid toggles', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/about')
    await page.evaluate(() => document.fonts.ready)
    const item = page.locator('.accordion-item').first()
    const trigger = item.getByRole('button')
    const panel = item.locator('.accordion-panel')
    await trigger.evaluate((element) =>
      element.scrollIntoView({ block: 'center', behavior: 'instant' }),
    )

    const opening = await toggleAndSampleTransition(panel)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(opening.height).toBeGreaterThan(0)
    expect(opening.height).toBeLessThan(opening.fullHeight)
    await expect(panel).toBeVisible()

    const closing = await toggleAndSampleTransition(panel)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(closing.height).toBeGreaterThan(0)
    expect(closing.height).toBeLessThan(closing.fullHeight)
    await expect(panel).toBeHidden()

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(panel).toBeVisible()
    await page.keyboard.press('Space')
    await expect(panel).toBeHidden()
    await expect(trigger).toBeFocused()

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await trigger.evaluate((element: HTMLButtonElement) => {
      element.click()
      element.click()
      element.click()
    })
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).toHaveCSS('opacity', '1')
    await trigger.click()
    await expect(panel).toBeHidden()
  }
})

test('FAQ opens the selected answer', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/about')
  await page.getByText('Можно ли заранее узнать стоимость?').click()
  await expect(
    page.getByRole('region', { name: 'Можно ли заранее узнать стоимость?' }),
  ).toContainText('мы обсудим до её начала')
})

import { test, expect } from '@playwright/test'

test('mobile biography follows the page heading', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/about')
  await page.evaluate(() => document.fonts.ready)
  const heading = await page.getByRole('heading', { level: 1 }).boundingBox()
  const biography = await page.locator('.about-biography').boundingBox()
  expect(heading!.y + heading!.height).toBeLessThan(biography!.y)
})

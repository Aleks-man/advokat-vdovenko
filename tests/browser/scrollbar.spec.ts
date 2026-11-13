import { test, expect } from '@playwright/test'

test('overlay scrollbar preserves width, fades and supports dragging and keyboard', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  const scrollbar = page.getByRole('scrollbar', { name: 'Прокрутка страницы' })
  await expect(scrollbar).toHaveCSS('position', 'fixed')
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(1280)
  const initialWidth = await page
    .locator('.header-inner')
    .evaluate((el) => el.getBoundingClientRect().width)
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }))
  await expect(scrollbar).toHaveCSS('opacity', '1')
  await expect.poll(() => scrollbar.getAttribute('aria-valuenow')).not.toBe('0')
  await expect(scrollbar).toHaveCSS('opacity', '0')
  expect(
    await page.locator('.header-inner').evaluate((el) => el.getBoundingClientRect().width),
  ).toBe(initialWidth)
  const thumb = await page.locator('.page-scrollbar-thumb').boundingBox()
  await page.mouse.move(1273, thumb!.y + 10)
  await page.mouse.down()
  await page.mouse.move(1273, 600, { steps: 6 })
  await page.mouse.up()
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(400)
  await scrollbar.press('End')
  await expect(scrollbar).toHaveAttribute('aria-valuenow', '100')
  const endThumb = await page.locator('.page-scrollbar-thumb').boundingBox()
  const footer = await page.locator('footer').boundingBox()
  const header = await page.locator('header').boundingBox()
  expect(endThumb!.height).toBeLessThanOrEqual(104)
  expect(endThumb!.y).toBeGreaterThanOrEqual(header!.y + header!.height)
  expect(endThumb!.y + endThumb!.height).toBeLessThanOrEqual(footer!.y)
  await expect(page.locator('.page-scrollbar-thumb')).toHaveCSS('box-shadow', 'none')
  await scrollbar.press('Home')
  await expect(scrollbar).toHaveAttribute('aria-valuenow', '0')
  for (const route of ['/practice', '/about', '/contacts']) {
    await page.goto(route)
    await expect(scrollbar).toHaveAttribute('aria-valuenow', '0')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1280)
  }
})

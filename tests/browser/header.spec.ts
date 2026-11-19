import { test, expect } from '@playwright/test'

test('header compacts on all screens without shifting page content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1280, 1024, 961, 960, 840, 768, 721, 720, 390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const header = page.locator('header')
    const mark = header.locator('.brand-mark')
    await expect(mark).toBeVisible()
    const originalHeroTop = await page
      .locator('.hero')
      .evaluate((element) => element.getBoundingClientRect().top + window.scrollY)
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
    await expect(mark).toBeHidden()
    const bounds = await header.boundingBox()
    expect(bounds!.y).toBe(0)
    expect(bounds!.height).toBeLessThanOrEqual(68)
    expect(
      await page
        .locator('.hero')
        .evaluate((element) => element.getBoundingClientRect().top + window.scrollY),
    ).toBeCloseTo(originalHeroTop, 0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(header.locator('.brand-name')).toContainText('Константин')
    await expect(header.locator('.header-contact')).toHaveAttribute('href', 'tel:+79999999999')
    if (width <= 720) {
      await page.getByRole('button', { name: 'Открыть меню' }).click()
      await page
        .getByRole('navigation', { name: 'Основная навигация' })
        .getByRole('link', { name: 'Контакты', exact: true })
        .click()
      await expect(page).toHaveURL('/contacts')
      await expect(mark).toBeVisible()
    } else {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await expect(mark).toBeVisible()
    }
  }
  await page.setViewportSize({ width: 1280, height: 844 })
  await page.goto('/')
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
  await expect(page.locator('header .brand-mark')).toBeHidden()
  await page.setViewportSize({ width: 768, height: 844 })
  await expect(page.locator('header .brand-mark')).toBeHidden()
  await page.setViewportSize({ width: 1280, height: 844 })
  await expect(page.locator('header .brand-mark')).toBeHidden()
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(page.locator('header .brand-mark')).toBeVisible()
})

test('header content and hero share exact horizontal edges while scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [320, 390, 789, 960, 961, 1024, 1280, 1365, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    for (const scroll of [0, 180]) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), scroll)
      const header = await page.locator('.header-inner').boundingBox()
      const hero = await page.locator('.hero').boundingBox()
      expect(Math.abs(header!.x - hero!.x)).toBeLessThan(0.1)
      expect(Math.abs(header!.x + header!.width - hero!.x - hero!.width)).toBeLessThan(0.1)
    }
  }
})

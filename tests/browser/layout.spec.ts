import { test, expect } from '@playwright/test'

test('wide screens keep sections on the same centered grid', async ({ page }) => {
  for (const width of [1920, 2560]) {
    await page.setViewportSize({ width, height: 1080 })
    for (const path of ['/', '/practice', '/about', '/contacts']) {
      await page.goto(path)
      const header = await page.locator('.header-inner').boundingBox()
      expect(header).not.toBeNull()
      expect(header!.width).toBeLessThanOrEqual(1320)
      const sections = page.locator('main > .container, main > .panel, footer > .container')
      for (const section of await sections.all()) {
        const bounds = await section.boundingBox()
        expect(bounds).not.toBeNull()
        expect(bounds!.x).toBeCloseTo(header!.x, 0)
        expect(bounds!.width).toBeCloseTo(header!.width, 0)
      }
      if (width === 1920 && path !== '/') {
        const intro = await page
          .locator(path === '/about' ? '.about' : '.page-intro-panel')
          .boundingBox()
        const heading = await page.getByRole('heading', { level: 1 }).boundingBox()
        expect(heading!.x - intro!.x).toBeGreaterThanOrEqual(18)
        await page.evaluate(() => document.fonts.ready)
        await page.screenshot({
          path: `artifacts/${path.slice(1)}-wide.png`,
          fullPage: true,
        })
      }
    }
    if (width === 1920) {
      await page.goto('/')
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({ path: 'artifacts/home-wide.png', fullPage: true })
    }
  }
})

test('decorative backgrounds leave no empty area below the footer', async ({ page }) => {
  for (const [width, height] of [
    [1920, 1080],
    [1280, 1440],
    [320, 844],
  ]) {
    await page.setViewportSize({ width, height })
    for (const path of ['/practice', '/about', '/contacts']) {
      await page.goto(path)
      await page.evaluate(() => document.fonts.ready)
      const layout = await page.evaluate(() => ({
        pageBottom: document.documentElement.scrollHeight,
        footerBottom: document.querySelector('footer')!.getBoundingClientRect().bottom + scrollY,
      }))
      expect(Math.abs(layout.pageBottom - layout.footerBottom), path + ' at ' + width).toBeLessThan(
        2,
      )
      expect(layout.footerBottom).toBeGreaterThanOrEqual(height - 1)
    }
  }
})

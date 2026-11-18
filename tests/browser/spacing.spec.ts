import { test, expect } from '@playwright/test'

const widths = [
  320, 360, 390, 430, 600, 601, 700, 701, 720, 721, 760, 761, 768, 850, 851, 900, 901, 960, 961,
  1100, 1101, 1440, 1920,
]

for (const width of widths) {
  test('page spacing and containment at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const route of ['/', '/practice', '/about', '/contacts']) {
      await page.goto(route)
      await page.evaluate(() => document.fonts.ready)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        route,
      ).toBe(true)
      const introGap = await page.evaluate(() => {
        const header = document.querySelector('.header')!.getBoundingClientRect()
        const label = document
          .querySelector(
            'main .hero-location, main .page-intro .eyebrow, main .about-heading .eyebrow',
          )!
          .getBoundingClientRect()
        return label.top - header.bottom
      })
      expect(introGap, route + ' first text clears the header').toBeGreaterThanOrEqual(20)
      expect(introGap, route + ' compact introduction').toBeLessThanOrEqual(42)
      const problems = await page
        .locator('main h1, main h2, main h3, main p, main .contact-value')
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              if (!element.checkVisibility()) return false
              const rect = element.getBoundingClientRect()
              return (
                rect.width > 0 &&
                (rect.left < -1 ||
                  rect.right > innerWidth + 1 ||
                  element.scrollWidth > element.clientWidth + 1)
              )
            })
            .map((element) => element.textContent?.trim()),
        )
      expect(problems, route + ' text fits its columns').toEqual([])
      const sections = await page
        .locator('main > .container, main > .panel')
        .evaluateAll((elements) =>
          elements.map((element) => {
            const rect = element.getBoundingClientRect()
            return { top: rect.top, bottom: rect.bottom }
          }),
        )
      for (let index = 1; index < sections.length; index++) {
        expect(sections[index].top, route + ' sections do not overlap').toBeGreaterThanOrEqual(
          sections[index - 1].bottom - 1,
        )
      }
      if (route === '/') {
        const edges = await page
          .locator(
            width <= 600
              ? '.home-practice h2, .principles h2, .first-conversation h2'
              : '.hero h1, .home-practice h2, .principles h2, .first-conversation h2',
          )
          .evaluateAll((elements) =>
            elements.map((element) => element.getBoundingClientRect().left),
          )
        expect(Math.max(...edges) - Math.min(...edges)).toBeLessThan(1)
      }
      if (route === '/about' || route === '/practice') {
        const offset = await page
          .locator(route === '/about' ? '.faq' : '.useful-materials-list')
          .evaluate((element) => {
            const heading = element.previousElementSibling!.querySelector('h2')!
            return Math.abs(
              element.getBoundingClientRect().left - heading.getBoundingClientRect().left,
            )
          })
        expect(offset, 'Question list aligns with its heading').toBeLessThan(1)
      }
      if (route === '/practice') {
        const heading = await page.locator('.page-intro h1').boundingBox()
        const stage = await page.locator('.practice-stage').first().boundingBox()
        expect(Math.abs(heading!.x - stage!.x)).toBeLessThan(1)
      }
      if ([320, 390, 768, 1440].includes(width)) {
        await page.screenshot({
          path: 'artifacts/spacing-' + (route.slice(1) || 'home') + '-' + width + '.png',
          fullPage: true,
        })
      }
    }
  })
}

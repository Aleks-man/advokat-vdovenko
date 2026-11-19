import { test, expect } from '@playwright/test'

test('home page loads the local body font', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const fontStatus = await page.evaluate(async () => {
    const families = ['Onest Variable']
    return Promise.all(
      families.map(async (family) => {
        const faces = await document.fonts.load(
          '500 32px "' + family + '"',
          '\u0417\u0430\u0449\u0438\u0442\u0430',
        )
        return faces.length > 0 && faces.every((face) => face.status === 'loaded')
      }),
    )
  })
  expect(fontStatus).toEqual([true])
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true })
})

test('hero balances portrait and text across screen sizes', async ({ page }) => {
  test.setTimeout(90000)
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const widths = [
    ...new Set([
      320,
      390,
      450,
      451,
      600,
      601,
      636,
      637,
      638,
      899,
      900,
      901,
      999,
      1000,
      1001,
      1440,
      1920,
      ...Array.from({ length: 42 }, (_, index) => 601 + index * 32),
    ]),
  ].sort((left, right) => left - right)
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 })
    const image = page.locator('.hero-image')
    await expect(image).toBeVisible()
    expect(await image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(
      true,
    )
    const portrait = (await page.locator('.hero-art').boundingBox())!
    const heading = (await page.locator('.hero-heading').boundingBox())!
    const content = (await page.locator('.hero-content').boundingBox())!
    const actions = (await page.locator('.hero-actions').boundingBox())!
    if (width > 600) {
      const copy = (await page.locator('.hero-copy').boundingBox())!
      expect(portrait.x + portrait.width, `${width}px: separate columns`).toBeLessThanOrEqual(
        copy.x,
      )
      expect(portrait.height, `${width}px: equal heights`).toBeCloseTo(copy.height, 0)
      expect(heading.y, `${width}px: aligned tops`).toBeCloseTo(portrait.y, 0)
      expect(actions.y + actions.height, `${width}px: aligned bottoms`).toBeCloseTo(
        portrait.y + portrait.height,
        0,
      )
      expect(actions.x, `${width}px: actions stay in text column`).toBeCloseTo(copy.x, 0)
      const gaps = [content.y - heading.y - heading.height, actions.y - content.y - content.height]
      for (const gap of gaps) {
        expect(gap, `${width}px: groups do not overlap`).toBeGreaterThanOrEqual(15)
        expect(gap, `${width}px: no stretched empty space`).toBeLessThanOrEqual(70)
      }
    } else {
      expect(heading.y + heading.height).toBeLessThanOrEqual(portrait.y)
      expect(content.y).toBeGreaterThanOrEqual(portrait.y + portrait.height)
      expect(portrait.height).toBeLessThanOrEqual(290)
      const hero = (await page.locator('.hero').boundingBox())!
      const imageBounds = (await image.boundingBox())!
      expect(imageBounds.x).toBeGreaterThanOrEqual(hero.x)
      expect(imageBounds.x + imageBounds.width).toBeLessThanOrEqual(hero.x + hero.width)
      expect(portrait.x + portrait.width / 2).toBeCloseTo(hero.x + hero.width / 2, 0)
    }
    const button = (await page.locator('.hero-actions .button').boundingBox())!
    const telegram = (await page.locator('.hero-actions .text-link').boundingBox())!
    if (width > 450) {
      expect(telegram.x, `${width}px: buttons in one row`).toBeGreaterThanOrEqual(
        button.x + button.width,
      )
    } else {
      expect(telegram.y).toBeGreaterThanOrEqual(button.y + button.height)
    }
    const imageBounds = (await image.boundingBox())!
    expect(
      imageBounds.width / imageBounds.height,
      `${width}px: retain full portrait height`,
    ).toBeLessThanOrEqual(0.81)
    const nameTops = await page
      .locator('.hero h1')
      .evaluate((element) =>
        [...element.children].map((child) => child.getBoundingClientRect().top),
      )
    expect(nameTops[0]).toBeCloseTo(nameTops[1], 0)
    const clippedText = await page
      .locator('.hero p, .hero h1, .hero dd, .hero a')
      .evaluateAll((elements) =>
        elements
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .map((element) => element.textContent),
      )
    expect(clippedText, `${width}px: text stays inside its column`).toEqual([])
  }
})

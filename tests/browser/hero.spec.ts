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
      360,
      374,
      375,
      390,
      500,
      450,
      451,
      600,
      601,
      699,
      700,
      701,
      760,
      761,
      768,
      636,
      637,
      638,
      899,
      900,
      901,
      999,
      1000,
      1001,
      1099,
      1100,
      1101,
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
      await expect(page.locator('.hero-summary-short')).toBeHidden()
      await expect(page.locator('.hero-mobile-practice')).toBeHidden()
      await expect(page.locator('.hero-summary-full')).toBeVisible()
      await expect(page.locator('.hero-facts')).toBeVisible()
    }
    if (width > 900) {
      const copy = (await page.locator('.hero-copy').boundingBox())!
      expect(portrait.x + portrait.width, `${width}px: separate columns`).toBeLessThanOrEqual(
        copy.x,
      )
      expect(portrait.height, `${width}px: equal photo and text heights`).toBeCloseTo(
        copy.height,
        0,
      )
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
    } else if (width > 600) {
      const profession = (await page.locator('.hero-profession').boundingBox())!
      const summary = (await page.locator('.hero-summary').boundingBox())!
      const facts = (await page.locator('.hero-facts').boundingBox())!
      expect(heading.y + heading.height).toBeLessThanOrEqual(profession.y)
      expect(profession.y).toBeCloseTo(portrait.y, 0)
      expect(profession.x).toBeGreaterThanOrEqual(portrait.x + portrait.width)
      expect(summary.x).toBeGreaterThanOrEqual(portrait.x + portrait.width)
      expect(summary.y).toBeGreaterThanOrEqual(profession.y + profession.height)
      expect(facts.y).toBeGreaterThanOrEqual(summary.y + summary.height)
      expect(facts.y - summary.y - summary.height).toBeCloseTo(18, 0)
      expect(actions.y).toBeGreaterThanOrEqual(portrait.y + portrait.height)
      expect(actions.x).toBeCloseTo(heading.x, 0)
    } else {
      expect(heading.y + heading.height).toBeLessThanOrEqual(portrait.y)
      const profession = (await page.locator('.hero-profession').boundingBox())!
      const summary = (await page.locator('.hero-summary').boundingBox())!
      expect(profession.y).toBeGreaterThanOrEqual(heading.y + heading.height)
      expect(profession.y + profession.height).toBeLessThanOrEqual(portrait.y)
      expect(summary.y).toBeGreaterThanOrEqual(portrait.y + portrait.height)
      expect(portrait.height).toBeLessThanOrEqual(350)
      await expect(page.locator('.hero-facts')).toBeHidden()
      await expect(page.locator('.hero-summary-full')).toBeHidden()
      await expect(page.locator('.hero-summary-short')).toBeVisible()
      await expect(page.locator('.hero-mobile-practice')).toBeVisible()
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
    expect(
      portrait.width / portrait.height,
      `${width}px: frame keeps portrait proportions`,
    ).toBeCloseTo(4 / 5, 2)
    const visible = await image.evaluate((img: HTMLImageElement) => {
      const bounds = img.getBoundingClientRect()
      const fit = getComputedStyle(img).objectFit
      const scale =
        fit === 'contain'
          ? Math.min(bounds.width / img.naturalWidth, bounds.height / img.naturalHeight)
          : Math.max(bounds.width / img.naturalWidth, bounds.height / img.naturalHeight)
      return {
        width: Math.min(1, bounds.width / (img.naturalWidth * scale)),
        height: Math.min(1, bounds.height / (img.naturalHeight * scale)),
      }
    })
    expect(visible.width, `${width}px: shoulders stay in the frame`).toBeCloseTo(1, 3)
    expect(visible.height, `${width}px: portrait stays fully visible`).toBeCloseTo(1, 3)
    const nameTops = await page
      .locator('.hero h1')
      .evaluate((element) =>
        [...element.children].map((child) => child.getBoundingClientRect().top),
      )
    if (width >= 1100) {
      expect(nameTops[1]).toBeGreaterThan(nameTops[0])
    } else {
      expect(nameTops[0]).toBeCloseTo(nameTops[1], 0)
    }
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

import { test, expect } from '@playwright/test'

test('menu highlight moves to the active link without remounting', async ({ page }) => {
  await page.goto('/')
  const indicator = page.locator('.navigation-indicator')
  await expect(indicator).toBeVisible()
  const original = await indicator.elementHandle()
  const nav = page.getByRole('navigation', { name: 'Основная навигация' })
  for (const label of ['Уголовная защита', 'Контакты', 'Главная']) {
    const link = nav.getByRole('link', { name: label, exact: true })
    await link.click()
    await expect(link).toHaveAttribute('aria-current', 'page')
    expect(await original!.evaluate((element) => element.isConnected)).toBe(true)
    await expect
      .poll(async () => {
        const highlight = await indicator.boundingBox()
        const active = await link.boundingBox()
        return highlight && active ? Math.abs(highlight.x - active.x) : Infinity
      })
      .toBeLessThan(1)
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(indicator).toHaveCSS('transition-duration', '0s')
})

test('wide screens keep sections on the same centered grid', async ({ page }) => {
  for (const width of [1920, 2560]) {
    await page.setViewportSize({ width, height: 1080 })
    for (const path of ['/', '/practice', '/approach', '/contacts']) {
      await page.goto(path)
      const header = await page.locator('header').boundingBox()
      expect(header).not.toBeNull()
      expect(header!.width).toBeLessThanOrEqual(1320)
      const sections = page.locator('main > .container, main > .panel, footer')
      for (const section of await sections.all()) {
        const bounds = await section.boundingBox()
        expect(bounds).not.toBeNull()
        expect(bounds!.x).toBeCloseTo(header!.x, 0)
        expect(bounds!.width).toBeCloseTo(header!.width, 0)
      }
      if (width === 1920 && path !== '/') {
        const intro = await page.locator('.legal-intro').boundingBox()
        const heading = await page.locator('.legal-intro h1').boundingBox()
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

test('desktop routes, stage links, FAQ and missing page', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  const fontStatus = await page.evaluate(async () => {
    const families = ['Manrope Variable', 'Onest Variable']
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
  expect(fontStatus).toEqual([true, true])
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Защита начинается')
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true })
  await page.locator('.practice-row').first().click()
  await expect(page).toHaveURL(/practice#stage-01/)
  await expect(page.locator('#stage-01')).toBeInViewport()
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Подход к работе' })
    .click()
  await page.getByText('Можно ли заранее узнать стоимость?').click()
  await expect(page.locator('details[open]')).toContainText('Условия оплаты уточняются у адвоката')
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Контакты' })
    .click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Обращение')
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0)
  await page.goto('/missing-page')
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await expect(page.getByText('404 / Страница не найдена')).toBeVisible()
  await page.getByRole('link', { name: 'На главную', exact: true }).click()
  await expect(page).toHaveURL('/')
  expect(errors).toEqual([])
})

test('mobile navigation and layouts have no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/', '/practice', '/approach', '/contacts']) {
    await page.goto(path)
    await page.evaluate(async () => {
      await document.fonts.ready
    })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
  }
  await page.goto('/')
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await page.getByRole('button', { name: 'Открыть меню' }).click()
  await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Контакты' })
    .click()
  await expect(page).toHaveURL('/contacts')
  await expect(page.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await page.goto('/')
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true })
})

test('narrow mobile and tablet layouts stay within viewport', async ({ page }) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/', '/practice', '/approach', '/contacts']) {
      await page.goto(path)
      await page.evaluate(async () => {
        await document.fonts.ready
      })
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${path} at ${width}px`,
      ).toBe(true)
    }
  }
})

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

test('mobile menu content keeps its size throughout opening and closing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  for (const open of [true, false]) {
    const heights = await page.evaluate(async (open) => {
      const nav = document.querySelector('#main-navigation')!
      const links = nav.querySelector('.navigation-links')!
      const button = document.querySelector<HTMLButtonElement>('.menu-toggle')!
      button.click()
      while (nav.classList.contains('is-open') !== open) {
        await new Promise(requestAnimationFrame)
      }
      const heights: number[] = []
      const start = performance.now()
      while (performance.now() - start < 450) {
        heights.push(links.getBoundingClientRect().height)
        await new Promise(requestAnimationFrame)
      }
      return heights
    }, open)
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1)
  }
})

test('mobile menu dismisses outside and with Escape, and resets after desktop resize', async ({
  page,
}) => {
  for (const width of [320, 390, 720]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const toggle = page.locator('.menu-toggle')
    const nav = page.locator('#main-navigation')
    const closedHeader = await page.locator('header').boundingBox()
    const mainTop = await page.locator('main').evaluate((el) => el.getBoundingClientRect().top)
    await toggle.click()
    await expect(nav).toBeVisible()
    await expect
      .poll(async () => (await page.locator('header').boundingBox())!.height)
      .toBeGreaterThan(closedHeader!.height + 150)
    await expect
      .poll(() =>
        page.evaluate(() => {
          const header = document.querySelector('header')!.getBoundingClientRect()
          const nav = document.querySelector('#main-navigation')!.getBoundingClientRect()
          return nav.bottom - header.bottom
        }),
      )
      .toBeLessThanOrEqual(1)
    expect(await page.locator('main').evaluate((el) => el.getBoundingClientRect().top)).toBe(
      mainTop,
    )
    await nav.locator('a').first().focus()
    await page.keyboard.press('Escape')
    await expect(nav).toBeHidden()
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()
    await page.locator('.home-practice h2').click()
    await expect(nav).toBeHidden()
    await toggle.click()
    await nav.locator('a[href="/contacts"]').click()
    await expect(page).toHaveURL('/contacts')
    await expect(nav).toBeHidden()

    await toggle.click()
    await page.setViewportSize({ width: 1280, height: 900 })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(nav).toBeVisible()
    await page.setViewportSize({ width, height: 900 })
    await expect(nav).toBeHidden()
  }
})

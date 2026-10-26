import { test, expect } from '@playwright/test'

test('desktop routes, stage links, FAQ and missing page', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('На вашей стороне.')
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true })
  await page.locator('.practice-row').first().click()
  await expect(page).toHaveURL(/practice#stage-01/)
  await expect(page.locator('#stage-01')).toBeInViewport()
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Подход к работе' })
    .click()
  await page.getByText('Можно ли заранее узнать стоимость?').click()
  await expect(page.getByText('Стоимость пока не указана.')).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Контакты' })
    .click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Начнём')
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0)
  await page.goto('/missing-page')
  await expect(page.getByText('404 / Страница не найдена')).toBeVisible()
  await page.getByRole('link', { name: 'На главную', exact: true }).click()
  await expect(page).toHaveURL('/')
  expect(errors).toEqual([])
})

test('mobile navigation and layouts have no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/', '/practice', '/approach', '/contacts']) {
    await page.goto(path)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
  }
  await page.goto('/')
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
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true })
})

test('narrow mobile and tablet layouts stay within viewport', async ({ page }) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/', '/practice', '/approach', '/contacts']) {
      await page.goto(path)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${path} at ${width}px`,
      ).toBe(true)
    }
  }
})

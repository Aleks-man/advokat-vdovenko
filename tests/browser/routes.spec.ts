import { test, expect } from '@playwright/test'

test('desktop navigation, stage links, legacy redirect and missing page', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Константин')
  await expect(page.locator('.about')).toHaveCount(0)
  await page.locator('.practice-row').first().click()
  await expect(page).toHaveURL(/practice#stage-01/)
  await expect(page.locator('#stage-01')).toBeInViewport()
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Обо мне' })
    .click()
  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Константин')
  await expect(page.locator('.about img')).toHaveCount(0)
  await expect(page.locator('.about-biography')).toBeVisible()
  await expect(page.locator('.about-facts > div')).toHaveCount(3)
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Контакты' })
    .click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Связаться')
  await page.goto('/approach')
  await expect(page).toHaveURL('/about')
  await page.goto('/missing-page')
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await expect(page.getByText('404 / Страница не найдена')).toBeVisible()
  await page.getByRole('link', { name: 'На главную', exact: true }).click()
  await expect(page).toHaveURL('/')
  expect(errors).toEqual([])
})

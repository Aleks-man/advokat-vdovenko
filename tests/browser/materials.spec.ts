import { test, expect } from '@playwright/test'

test('useful materials expand on practice page without adding navigation items', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1280, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/practice')
    const materials = page.locator('.useful-materials')
    await expect(materials.locator('.accordion-item')).toHaveCount(3)
    await expect(page.locator('#main-navigation .navigation-links > a')).toHaveCount(4)
    for (const item of await materials.locator('.accordion-item').all()) {
      const trigger = item.getByRole('button')
      await trigger.click()
      await expect(item.getByRole('region')).toBeVisible()
      await expect(item.locator('li')).toHaveCount(3)
      await trigger.click()
      await expect(item.locator('.accordion-panel')).toBeHidden()
    }
  }
})

test('material links open the selected note on navigation, reload and history changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1280, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const cards = page.locator('.materials-preview-link')
    const target = await cards.first().getAttribute('href')
    await cards.first().click()
    await expect(page).toHaveURL(target!)
    const note = page.locator('#material-first-conversation')
    await expect(note.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    await expect(note.getByRole('region')).toBeVisible()
    await expect(note.getByRole('button')).toBeInViewport()
    await note.getByRole('button').click()
    await expect(note.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    await page.reload()
    await expect(note.getByRole('region')).toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL('/')
    await page.goForward()
    await expect(note.getByRole('region')).toBeVisible()
    await page.goto('/practice#material-help-for-relative')
    await expect(page.locator('#material-help-for-relative').getByRole('region')).toBeVisible()
    await expect(note.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  }
})

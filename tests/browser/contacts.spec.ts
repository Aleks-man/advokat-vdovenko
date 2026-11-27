import { test, expect } from '@playwright/test'
import { site } from '../../front/src/data/site'

test('contact details and footer expose phone and messenger links', async ({ page }) => {
  const phoneDigits = site.phone.match(/\d/g)!.join('')
  const internationalPhone = `+${phoneDigits}`
  await page.goto('/contacts')
  await expect(page.locator('.contact-details a[href^="tel:"]')).toHaveAttribute(
    'href',
    `tel:${internationalPhone}`,
  )
  for (const section of ['.contact-details', 'footer']) {
    const contacts = page.locator(section)
    await expect(contacts.getByRole('link', { name: 'Написать в Viber' })).toHaveAttribute(
      'href',
      `viber://chat?number=${encodeURIComponent(internationalPhone)}`,
    )
    await expect(contacts.getByRole('link', { name: 'Написать в WhatsApp' })).toHaveAttribute(
      'href',
      `https://wa.me/${phoneDigits}`,
    )
    await expect(contacts.getByRole('link', { name: 'Написать в Telegram' })).toHaveAttribute(
      'href',
      `https://t.me/${internationalPhone}`,
    )
  }
})

test('mobile phone and messengers are visible before scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/contacts')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.contact-phone')).toBeInViewport()
  for (const link of await page.locator('.contact-details .messenger-link').all()) {
    await expect(link).toBeInViewport()
  }
  await page.screenshot({ path: 'artifacts/contacts-mobile.png', fullPage: true })
})

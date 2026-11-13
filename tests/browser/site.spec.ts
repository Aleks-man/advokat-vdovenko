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

test('desktop routes, stage links, FAQ and missing page', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.evaluate(async () => {
    await document.fonts.ready
  })
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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Константин')
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true })
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
  await expect(page.locator('.about-portrait img')).toBeVisible()
  await page.getByText('Можно ли заранее узнать стоимость?').click()
  await expect(
    page.getByRole('region', { name: 'Можно ли заранее узнать стоимость?' }),
  ).toContainText('мы обсудим до её начала')
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Контакты' })
    .click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Связаться')
  await expect(page.locator('.contact-details a[href^="tel:"]')).toHaveAttribute(
    'href',
    'tel:+79999999999',
  )
  for (const section of ['.contact-details', 'footer']) {
    const contacts = page.locator(section)
    await expect(contacts.getByRole('link', { name: 'Написать в Viber' })).toHaveAttribute(
      'href',
      'viber://chat?number=%2B79999999999',
    )
    await expect(contacts.getByRole('link', { name: 'Написать в WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/79999999999',
    )
    await expect(contacts.getByRole('link', { name: 'Написать в Telegram' })).toHaveAttribute(
      'href',
      'https://t.me/+79999999999',
    )
  }
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

test('mobile navigation and layouts have no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/', '/practice', '/about', '/contacts']) {
    await page.goto(path)
    await page.evaluate(async () => {
      await document.fonts.ready
    })
    if (path === '/about') {
      const heading = await page.getByRole('heading', { level: 1 }).boundingBox()
      const portrait = await page.locator('.about-portrait').boundingBox()
      expect(heading!.y + heading!.height).toBeLessThan(portrait!.y)
      expect(portrait!.height).toBeLessThanOrEqual(301)
    }
    if (path === '/contacts') {
      await expect(page.locator('.contact-phone')).toBeInViewport()
      for (const link of await page.locator('.contact-details .messenger-link').all()) {
        await expect(link).toBeInViewport()
      }
      await page.screenshot({ path: 'artifacts/contacts-mobile.png', fullPage: true })
    }
    if (path === '/') {
      await expect(page.locator('.hero-actions .button')).toBeInViewport()
      await expect(page.locator('.hero-art')).toHaveCSS('position', 'absolute')
      const hero = await page.locator('.hero').boundingBox()
      expect(hero!.height).toBeLessThanOrEqual(600)
    }
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
  for (const width of [320, 390, 430, 768]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/', '/practice', '/about', '/contacts']) {
      await page.goto(path)
      await page.evaluate(async () => {
        await document.fonts.ready
      })
      if (path === '/' && width <= 430) {
        const hero = await page.locator('.hero').boundingBox()
        const image = await page.locator('.hero-image').boundingBox()
        expect(image!.x).toBeGreaterThanOrEqual(hero!.x)
        expect(image!.x + image!.width).toBeLessThanOrEqual(hero!.x + hero!.width)
        await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true })
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${path} at ${width}px`,
      ).toBe(true)
    }
  }
})

test('header compacts on all screens without shifting page content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1280, 1024, 961, 960, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const header = page.locator('header')
    const mark = header.locator('.brand-mark')
    await expect(mark).toBeVisible()
    const originalHeroTop = await page
      .locator('.hero')
      .evaluate((element) => element.getBoundingClientRect().top + window.scrollY)
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
    await expect(mark).toBeHidden()
    const bounds = await header.boundingBox()
    expect(bounds!.y).toBe(0)
    expect(bounds!.height).toBeLessThanOrEqual(68)
    expect(
      await page
        .locator('.hero')
        .evaluate((element) => element.getBoundingClientRect().top + window.scrollY),
    ).toBeCloseTo(originalHeroTop, 0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(header.locator('.brand-name')).toContainText('Константин')
    await expect(header.locator('.header-contact')).toHaveAttribute('href', 'tel:+79999999999')
    if (width <= 960) {
      await page.getByRole('button', { name: 'Открыть меню' }).click()
      await page
        .getByRole('navigation', { name: 'Основная навигация' })
        .getByRole('link', { name: 'Контакты', exact: true })
        .click()
      await expect(page).toHaveURL('/contacts')
      await expect(mark).toBeVisible()
    } else {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await expect(mark).toBeVisible()
    }
  }
  await page.setViewportSize({ width: 1280, height: 844 })
  await page.goto('/')
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }))
  await expect(page.locator('header .brand-mark')).toBeHidden()
  await page.setViewportSize({ width: 768, height: 844 })
  await expect(page.locator('header .brand-mark')).toBeHidden()
  await page.setViewportSize({ width: 1280, height: 844 })
  await expect(page.locator('header .brand-mark')).toBeHidden()
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(page.locator('header .brand-mark')).toBeVisible()
})

test('FAQ animates both directions and supports keyboard and rapid toggles', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/about')
    await page.evaluate(() => document.fonts.ready)
    const item = page.locator('.accordion-item').first()
    const trigger = item.getByRole('button')
    const panel = item.locator('.accordion-panel')
    await trigger.evaluate((element) =>
      element.scrollIntoView({ block: 'center', behavior: 'instant' }),
    )

    const sampleTransition = () =>
      panel.evaluate((element) => {
        getComputedStyle(element).gridTemplateRows
        const transitions = element.getAnimations()
        const sizing = transitions.find(
          (animation) => (animation as CSSTransition).transitionProperty === 'grid-template-rows',
        )
        if (!sizing) throw new Error('Expected a running height transition')
        for (const animation of transitions) {
          animation.pause()
          animation.currentTime = Number(animation.effect!.getTiming().duration) * 0.25
        }
        const height = element.getBoundingClientRect().height
        const fullHeight = element.querySelector('.accordion-copy')!.getBoundingClientRect().height
        for (const animation of transitions) animation.finish()
        return { height, fullHeight }
      })

    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const opening = await sampleTransition()
    expect(opening.height).toBeGreaterThan(0)
    expect(opening.height).toBeLessThan(opening.fullHeight)
    await expect(panel).toBeVisible()

    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    const closing = await sampleTransition()
    expect(closing.height).toBeGreaterThan(0)
    expect(closing.height).toBeLessThan(closing.fullHeight)
    await expect(panel).toBeHidden()

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(panel).toBeVisible()
    await page.keyboard.press('Space')
    await expect(panel).toBeHidden()
    await expect(trigger).toBeFocused()

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await trigger.evaluate((element) => {
      element.click()
      element.click()
      element.click()
    })
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).toHaveCSS('opacity', '1')
    await trigger.click()
    await expect(panel).toBeHidden()
  }
})

test('Themis stays full size at 790px and becomes background below it', async ({ page }) => {
  for (const width of [1440, 1280, 1024, 800, 790, 789, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const art = page.locator('.hero-art')
    if (width >= 790) {
      await expect(art).toHaveCSS('position', 'relative')
      await expect(page.locator('.hero-image')).toHaveCSS('opacity', '1')
      const image = await page.locator('.hero-image').boundingBox()
      expect(image!.width).toBe(368)
      expect(image!.height).toBe(460)
      const bounds = await art.boundingBox()
      const hero = await page.locator('.hero').boundingBox()
      const padding = await page
        .locator('.hero')
        .evaluate((el) => parseFloat(getComputedStyle(el).paddingTop))
      expect(bounds!.y - hero!.y).toBeCloseTo(padding, 0)
    } else {
      await expect(art).toHaveCSS('position', 'absolute')
      await expect(page.locator('.hero-image')).toHaveCSS('opacity', '0.18')
    }
    if ([800, 790, 789].includes(width)) {
      await page.locator('.hero').screenshot({ path: `artifacts/hero-breakpoint-${width}.png` })
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})

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
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})

test('mobile menu dismisses outside and with Escape, and resets after desktop resize', async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
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
    await page.locator('.hero-bottom').click()
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

test('header content and hero share exact horizontal edges while scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [320, 390, 789, 960, 961, 1024, 1280, 1365, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    for (const scroll of [0, 180]) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), scroll)
      const header = await page.locator('.header-inner').boundingBox()
      const hero = await page.locator('.hero').boundingBox()
      expect(Math.abs(header!.x - hero!.x)).toBeLessThan(0.1)
      expect(Math.abs(header!.x + header!.width - hero!.x - hero!.width)).toBeLessThan(0.1)
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

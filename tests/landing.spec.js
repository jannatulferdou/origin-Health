import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [375, 768, 1024, 1440]) {
  test(`responsive layout and accessibility at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Care that',
    )
    await page.locator('#wellness').scrollIntoViewIfNeeded()
    for (const image of await page.locator('img').all()) {
      await expect(image).toHaveJSProperty('complete', true)
      expect(
        await image.evaluate((element) => element.naturalWidth),
      ).toBeGreaterThan(0)
    }
    const logos = page.locator('.brand-logo')
    await expect(logos).toHaveCount(2)
    for (const logo of await logos.all()) {
      await expect(logo).toHaveAttribute('src', '/brand/origin-health-logo.png')
      await expect(logo).toHaveAttribute('alt', 'Origin Health')
      const dimensions = await logo.evaluate((element) => {
        const rect = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        return {
          ratio: rect.width / rect.height,
          naturalWidth: element.naturalWidth,
          filter: style.filter,
          transform: style.transform,
        }
      })
      expect(dimensions.ratio).toBeCloseTo(1.5, 3)
      expect(dimensions.naturalWidth).toBe(1536)
      expect(dimensions.filter).toBe('none')
      expect(dimensions.transform).toBe('none')
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
    await expect(
      page.getByRole('button', { name: 'Open navigation' }),
    ).toBeVisible({ visible: width < 768 })
    await expect(page.locator('.hero-note')).toContainText(
      'Booking is not live',
    )
    await expect(
      page.getByRole('button', { name: 'Book appointment', exact: true }),
    ).toHaveCount(0)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
    expect(errors).toEqual([])
    await page.screenshot({
      path: testInfo.outputPath(`origin-health-${width}-hero.png`),
    })
    await page.screenshot({
      path: testInfo.outputPath(`origin-health-${width}.png`),
      fullPage: true,
    })
    for (const section of ['care', 'wellness']) {
      // Fixed elements are already captured in the viewport and full-page shots.
      await page.locator(`#${section}`).screenshot({
        style: '.site-header, .skip-link { visibility: hidden; }',
        path: testInfo.outputPath(`origin-health-${width}-${section}.png`),
      })
    }
  })
}

test('demo form validates, completes locally, clears values, and restores focus', async ({
  page,
}) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const requests = []
  page.on('request', (request) => {
    const isDataRequest =
      request.method() !== 'GET' ||
      ['fetch', 'xhr', 'ping'].includes(request.resourceType())
    const containsExampleDetails = /alex|morgan|example\.com/i.test(
      request.url(),
    )
    if (isDataRequest || containsExampleDetails) requests.push(request.url())
  })
  const trigger = page
    .locator('.hero-actions')
    .getByRole('button', { name: 'Try appointment demo' })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(
    'Let\u2019s make time for you.',
  )
  await expect(page.locator('#email-hint')).toHaveText(
    'Use an example address. We won\u2019t send an email.',
  )
  await expect(dialog).toContainText('Booking is not live')
  await page.getByRole('button', { name: 'Complete demo request' }).click()
  await expect(page.getByLabel('Your name')).toBeFocused()
  await expect(page.locator('#name-error')).toBeVisible()
  await page.getByLabel('Your name').fill('Alex Morgan')
  await page.getByLabel('Email address').fill('invalid')
  await page.getByRole('button', { name: 'Complete demo request' }).click()
  await expect(page.getByLabel('Email address')).toBeFocused()
  await page.getByLabel('Email address').fill('alex@example.com')
  await page.getByLabel('Preferred day').fill('2000-01-01')
  await page.getByRole('button', { name: 'Complete demo request' }).click()
  await expect(page.locator('#day-error')).toBeVisible()
  await page.getByLabel('Preferred day').fill('2099-01-01')
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(accessibility.violations).toEqual([])
  await page.getByRole('button', { name: 'Complete demo request' }).click()
  await expect(page.getByRole('status')).toContainText(
    'No appointment has been booked',
  )
  await expect(page.getByRole('status')).toBeFocused()
  expect(requests).toEqual([])
  expect(
    await page.evaluate(() => [localStorage.length, sessionStorage.length]),
  ).toEqual([0, 0])
  await page.getByRole('button', { name: 'Back to Origin Health' }).click()
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await expect(page.getByLabel('Your name')).toHaveValue('')
  await expect(page.getByLabel('Email address')).toHaveValue('')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('keyboard skip link, dialog containment, and mobile navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeAttached()
  await page.bringToFront()
  await page.evaluate(() => {
    document.body.setAttribute('tabindex', '-1')
    document.body.focus()
    document.body.removeAttribute('tabindex')
  })
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused()
  const menu = page.getByRole('button', { name: 'Open navigation' })
  await menu.click()
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('button', { name: 'Try appointment demo' })
    .click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Wellness', exact: true })
    .click()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await page.locator('.hero-actions .button').click()
  const close = page.getByRole('button', { name: 'Close dialog' })
  await expect(close).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(
    page.getByRole('button', { name: 'Complete demo request' }),
  ).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  const dialog = page.getByRole('dialog')
  expect(
    await dialog.evaluate((element) => element.getBoundingClientRect().width),
  ).toBeLessThan(375)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('all service details, wellness, and privacy controls work', async ({
  page,
}) => {
  await page.goto('/')
  for (const button of await page.locator('.service-link').all()) {
    await button.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('dialog')).toContainText(
      'Illustrative services',
    )
    await page.keyboard.press('Escape')
  }
  await page.getByRole('button', { name: 'Explore wellness' }).click()
  await expect(page.getByRole('dialog')).toContainText('Whole-person wellness')
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Try appointment demo' })
    .click()
  await expect(page.getByRole('dialog')).toContainText('Booking is not live')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Privacy & your data' }).click()
  await expect(page.getByRole('dialog')).toContainText(
    'not transmitted, logged, or saved',
  )
  await page.keyboard.press('Escape')
  for (const selector of [
    '.header-book',
    '.appointment-action .button',
    '.footer-links button:first-of-type',
  ]) {
    const trigger = page.locator(selector)
    await trigger.click()
    await expect(page.getByRole('dialog')).toContainText('Booking is not live')
    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
  }
  await page.locator('.services-note button').click()
  await expect(page.getByRole('dialog')).toContainText('Everyday primary care')
  await page.keyboard.press('Escape')
  for (const nav of ['.desktop-nav', '.footer-links']) {
    for (const link of await page.locator(`${nav} a`).all()) {
      const target = await link.getAttribute('href')
      await link.click()
      await expect(page).toHaveURL(new RegExp(`${target}$`))
      await expect(page.locator(target)).toBeAttached()
    }
  }
})

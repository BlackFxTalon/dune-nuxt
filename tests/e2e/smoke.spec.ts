import { expect, test } from '@playwright/test'

test('core routes load', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Cards' })).toBeVisible()

  await page.goto('/cards')
  await expect(page.getByText('Filters')).toBeVisible()

  await page.goto('/ratings')
  await expect(page.getByRole('heading', { name: 'Ratings' })).toBeVisible()
})

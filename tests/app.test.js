// @ts-check
const { test, expect } = require('@playwright/test')

test('Frontpage has title', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.getByText('Phonebook')).toBeVisible()
  await expect(page.getByText('All Numbers')).toBeVisible()
})


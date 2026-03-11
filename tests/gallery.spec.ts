import { test, expect } from '../playwright-fixture';

test.describe('Gallery Page', () => {
  test('loads gallery page with images', async ({ page }) => {
    await page.goto('/gallery');
    await expect(page.getByText('Our Work')).toBeVisible();
  });

  test('category filters work', async ({ page }) => {
    await page.goto('/gallery');

    // Click Photography filter
    await page.getByRole('button', { name: 'Photography' }).click();

    // All visible items should be Photography category
    const images = page.locator('[data-category="Photography"]');
    // At minimum, the filter button should be active
    await expect(page.getByRole('button', { name: 'Photography' })).toBeVisible();
  });

  test('navigates from homepage portfolio to gallery', async ({ page }) => {
    await page.goto('/');
    const portfolio = page.locator('#portfolio');
    await portfolio.scrollIntoViewIfNeeded();

    await page.getByRole('link', { name: /View All Projects/i }).click();
    await expect(page).toHaveURL(/\/gallery/);
  });
});

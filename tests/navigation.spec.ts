import { test, expect } from '../playwright-fixture';

test.describe('Navigation E2E', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Turn Attention Into Appointments');
    await expect(page.locator('#services')).toBeVisible();
  });

  test('gallery page loads correctly', async ({ page }) => {
    await page.goto('/gallery');
    await expect(page.getByText('Our Work')).toBeVisible();
    await expect(page.getByText('Video Tours & Drone Footage')).toBeVisible();
  });

  test('learn more page loads correctly', async ({ page }) => {
    await page.goto('/learn-more');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('privacy policy page loads correctly', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page.getByText(/privacy/i).first()).toBeVisible();
  });

  test('terms of service page loads correctly', async ({ page }) => {
    await page.goto('/terms-of-service');
    await expect(page.getByText(/terms/i).first()).toBeVisible();
  });
});

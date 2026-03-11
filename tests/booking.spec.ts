import { test, expect } from '../playwright-fixture';

test.describe('Booking Form', () => {
  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.goto('/');
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();

    // Select a package first (click on Professional)
    await page.getByRole('button', { name: /Professional/i }).first().click();

    // Try to click Pay Now without filling the form
    await page.getByRole('button', { name: /Pay Now/i }).click();

    // Should see validation errors
    await expect(page.getByText(/session date is required/i)).toBeVisible();
  });

  test('package selection updates the total price', async ({ page }) => {
    await page.goto('/');
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();

    // Click Standard package
    await page.getByRole('button', { name: /Standard/i }).first().click();
    await expect(page.getByText('Total: $200')).toBeVisible();

    // Click Professional package
    await page.getByRole('button', { name: /Professional/i }).first().click();
    await expect(page.getByText('Total: $450')).toBeVisible();
  });
});

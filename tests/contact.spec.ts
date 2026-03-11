import { test, expect } from '../playwright-fixture';

test.describe('Contact Form', () => {
  test('shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();

    // Submit empty form
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should show required field errors
    await expect(page.getByText(/first name/i).first()).toBeVisible();
  });

  test('accepts valid input without errors', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();

    // Fill valid data
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#message', 'I need photos for a listing');

    // Validation errors should not be visible
    await expect(page.locator('#contact .text-destructive')).toHaveCount(0);
  });
});
